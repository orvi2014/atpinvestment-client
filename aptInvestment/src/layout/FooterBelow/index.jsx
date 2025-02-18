"use client"

import { useState, useEffect } from "react"
import logo from "/logo.png"
import { MapPin, Phone, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import "./index.css"

const FooterBelow = () => {
  const { t, i18n } = useTranslation()

  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en")

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  return (
    <div className="footer-info bg-white shadow-none">
      <div className="footer-content w-full p-4 grid gap-4 sm:grid-cols-2">
        <div className="footer-left flex flex-col gap-4 sm:ml-40 sm:mt-5 items-center sm:items-start">
          <div className="logo flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="ATP Investment logo" className="h-8 w-auto" />
            <span className="font-semibold text-lg">ATP Investment</span>
          </div>
          <div className="contact-info flex flex-col gap-2">
            <p className="text-muted-foreground">{t("contact.title")}</p>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
              <span className="text-sm">
                {t("contact.address.title")}: {t("contact.address.value")}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-right flex flex-col gap-4 sm:ml-64 sm:mt-5 items-center sm:items-start">
          <div className="footer-column">
            <h3 className="font-semibold mb-2">{t("socials.title")}</h3>
            <div className="social-links flex flex-col gap-2">
              <a
                href="tel:01670407666"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{t("contact.phone.value")}</span>
              </a>
              <a
                href="mailto:investmentatp@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{t("contact.email.value")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-center w-full py-4 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © {new Date().getFullYear()} ATP Investment. All rights reserved
        </p>
      </div>
    </div>
  )
}

export default FooterBelow

