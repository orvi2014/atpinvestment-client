import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="contactus-container mx-auto px-4 py-8">

      <div className="p-8 px-10 md:px-40 text-gray-600">
        <h1 className="title">{t("contact.title")}</h1>
        <ul className="list-[square] pl-5 space-y-2">
          <li>
            <strong>{t("contact.address.title")}:</strong> {t("contact.address.value")}
          </li>
          <li>
            <strong>{t("contact.phone.title")}:</strong> {t("contact.phone.value")}
          </li>
          <li>
            <strong>{t("contact.email.title")}:</strong> {t("contact.email.value")}
          </li>
        </ul>
      </div>
    </div>
  );
}
