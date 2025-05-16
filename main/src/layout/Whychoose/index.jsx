import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function WhyChoose() {
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
    <div className="whychoose-container mx-auto px-4 py-8">

      <div className="p-8 px-10 md:px-40 text-gray-600">
        <h1 className="title">{t("whyChoose.title")}</h1>

        <div className="space-y-8">
          <section>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t("whyChoose.compliant.title")}:</strong> {t("whyChoose.compliant.description")}
              </li>
              <li>
                <strong>{t("whyChoose.experts.title")}:</strong> {t("whyChoose.experts.description")}
              </li>
              <li>
                <strong>{t("whyChoose.transparent.title")}:</strong> {t("whyChoose.transparent.description")}
              </li>
              <li>
                <strong>{t("whyChoose.trusted.title")}:</strong> {t("whyChoose.trusted.description")}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
