"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import logo from "../../assets/image/logo.png"
import PromotionalSection from "../../components/promotionalSection.jsx"
import { useTranslation } from "react-i18next"
import "./index.css"

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en")
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    i18n.changeLanguage(language)
    // Get the email from the location state
    const emailFromState = location.state?.email
    if (emailFromState) {
      setEmail(emailFromState)
    } else {
      // If email is not in state, redirect back to signup or handle appropriately
      console.error("Email not provided")
      navigate("/signup")
    }
  }, [language, i18n, location.state, navigate])

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < code.length - 1) {
        const nextInput = document.querySelector(`input[name="code-${index + 1}"]`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = async () => {
    const verificationCode = code.join("")
    if (verificationCode.length === code.length) {
      try {
        const response = await fetch("https://atpinvestment.onrender.com/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            otp: verificationCode,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          console.log("OTP verified successfully")
          navigate("/") // Redirect to dashboard or appropriate page after successful verification
        } else {
          setError(data.message || "Invalid OTP. Please try again.")
        }
      } catch (error) {
        console.error("Error verifying OTP:", error)
        setError("An error occurred. Please try again.")
      }
    } else {
      setError("Please enter a complete 6-digit code.")
    }
  }

  const handleResend = () => {
    // Add your logic to resend the verification code here
    console.log("Resending code...")
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-white relative">
        {/* Back Button */}
        <Link to="/signup" className="back-button">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        {/* Logo and Headline */}
        <div className="absolute top-8 left-8 logo-headline-container flex items-center gap-2 mt-10">
          <img src={logo || "/placeholder.svg"} alt="ATP Investment Logo" />
          <h1>Aim To Prosperity</h1>
        </div>

        {/* Verification Code Section */}
        <h1 className="text-2xl font-semibold mb-2">{t("Enter Verification Code")}</h1>
        <p className="text-sm text-muted-foreground mb-6 text-center">
          {t("A verification code has been sent to your email")}
          <br />
          {email}
        </p>
        <div className="flex gap-2 mb-6">
          {code.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              name={`code-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg verification-input"
              maxLength={1}
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}
        <Button className="w-full mb-4 verify-button rounded-[20px]" onClick={handleVerify}>
          {t("Verify")}
        </Button>
        <div className="text-sm text-center">
          {t("Didn't receive a code?")}{" "}
          <Button variant="link" className="resend" onClick={handleResend}>
            {t("Resend")}
          </Button>
        </div>
        <div className="mt-6 text-sm text-center">
          {t("Already have an account?")}{" "}
          <Link to="/signin" className="signin">
            {t("Sign In")}
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-gray-100">
        <PromotionalSection />
      </div>
    </div>
  )
}

export default VerificationCode

