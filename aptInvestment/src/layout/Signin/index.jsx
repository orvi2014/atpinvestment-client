"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import {Link} from "react-router-dom"
import "./index.css"
import { useTranslation } from "react-i18next"
import logo from "../../assets/image/logo-blue.png"
import PromotionalSection from "@/components/promotionalSection.jsx"



export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!emailError) {
      const requestBody = { email, password }

      try {
        const response = await fetch("https://atpinvestment.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        })

        const data = await response.json()

        if (response.ok) {
          localStorage.setItem("token", data.token)
          alert("Login successful!")
          window.location.href = "/"
        } else {
          setError(data.message || "Login failed")
        }
      } catch (err) {
        console.error("Login error:", err)
        setError("Network error occurred")
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 lg:p-12">
        <header className="space-y-6 ">
          <Link to="/investment/all" className="inline-flex items-center text-sm">
            <ChevronLeft className="back-button" />
           
          </Link>
          <div className="flex items-center gap-2 ml-16 ">
            <img
              src={logo || "/placeholder.svg"}
              alt="ATP Investment"
              className="h-10 w-10 "
            />
            <h1 className="text-blue-500 text-3xl font-bold">ATP Investment</h1>
          </div>
        </header>

        <section className="login-section">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Sign in to your account</h2>
            <p className="text-sm text-gray-500">Enter your details to access your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className={`h-12 ${emailError ? "border-red-500" : ""}`}
                required
              />
              {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-sm text-center text-gray-500">
                 Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline focus:underline"
            >
             Sign up
            </Link>
          </div>


        </section>
      </main>

      <aside className=" hidden lg:block lg:w-1/2 ">
        <div className=" h-full flex flex-col ">
          <PromotionalSection />
        </div>
      </aside>
    </div>
  )
}

