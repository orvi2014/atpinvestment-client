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
    <div className="footer-info bg-background border-t shadow-none">
      <div className="footer-content container py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <div className="footer-left space-y-4 ">
          <div className="logo flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="ATP Investment logo" width={32} height={32} />
            <span className="font-semibold text-lg">ATP Investment</span>
          </div>
          <div className="contact-info space-y-2">
            <p className="text-muted-foreground">{t("contact.title")}</p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>
                {t("contact.address.title")}: {t("contact.address.value")}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-right space-y-4">
          <div className="footer-column">
            <h3 className="font-semibold">{t("socials.title")}</h3>
            <div className="social-links space-y-2">
              <a
                href="tel:01670407666"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> {t("contact.phone.value")}
              </a>
              <a
                href="mailto:investmentatp@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> {t("contact.email.value")}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-center container py-4 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ATP Investment. All rights reserved
        </p>
      </div>
    </div>
  )
}

export default FooterBelow

