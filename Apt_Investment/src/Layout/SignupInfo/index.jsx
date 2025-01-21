"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PromotionalSection from "../../components/promotionalSection.jsx"
import logo from "../../assets/Image/logo-blue.png"
import { useTranslation } from "react-i18next"
import "./index.css"

const SignUpForm = () => {
  const { t, i18n } = useTranslation()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Function to change language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex min-h-screen signup">
      
      {/* Left side: Form container */}
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          <div className="header mb-8 mt-20">
            <div className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="ATP Investment" width={40} height={40} className="logo" />
              <span className="text-2xl font-bold text-blue-500">ATP INVESTMENT</span>
            </div>
          </div>

          {/* Sign up form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t('signupTitle')}</h2>

              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-blue-500">
                  {t('usernameLabel')} <span className="text-red-500">{t('required')}</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder={t('usernameLabel')}
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full custom-input"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-blue-500">
                    {t('emailLabel')}
                  </Label>
                  <span className="text-sm text-gray-500">{t('optional')}</span>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('emailLabel')}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full custom-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              {t('finishSignUp')}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side: Promotional Section */}
      <div className="flex-1">
        <PromotionalSection />
      </div>
    </div>
  )
}

export default SignUpForm
