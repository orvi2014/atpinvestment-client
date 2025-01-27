'use client'

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PromotionalSection from "../../components/promotionalSection.jsx"
import { useTranslation } from "react-i18next"
import logo from "../../assets/image/logo-blue.png"

const SignUpForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customerId: "",
    fullname: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [emailValid, setEmailValid] = useState(true)

  useEffect(() => {
    const customerId = `iv${Math.floor(Math.random() * 100000)}`
    setFormData((prev) => ({
      ...prev,
      customerId,
    }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailValid(false)
      setError(t("invalidEmail"))
      return
    }

    setEmailValid(true)

    const payload = {
      customId: formData.customerId,
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    }

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(data.message)
        window.alert(data.message)
        navigate("/")
      } else {
        setError(data.error || "An error occurred. Please try again.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-md w-full">
          <div className="mb-6 sm:mb-8 mt-4 sm:mt-8">
            <div className="flex items-center gap-2">
              <img
                src={logo || "/placeholder.svg"}
                alt="ATP Investment"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-xl sm:text-2xl font-bold text-blue-500">ATP INVESTMENT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">{t("signupTitle")}</h2>

              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-blue-500">
                  {t("fullnameLabel")}
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder={t("fullnamePlaceholder")}
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-500">
                  {t("emailLabel")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-11 sm:h-12 ${!emailValid ? "border-red-500 focus:border-red-500" : ""}`}
                  required
                />
                {!emailValid && <p className="text-red-500 text-sm mt-1">{t("invalidEmail")}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-500">
                  {t("passwordLabel")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 sm:h-12 bg-blue-500 hover:bg-blue-600 text-white">
              {t("finishSignUp")}
            </Button>

            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <PromotionalSection />
      </div>
    </div>
  )
}

export default SignUpForm
