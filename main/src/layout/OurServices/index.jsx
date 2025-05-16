import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function Service() {
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
    <div className="service-container mx-auto px-4 py-8">
    

      <div className="p-8 px-10 md:px-40 text-gray-600">
        <h1 className="title">{t("services.title")}</h1>

        <div className="space-y-8">
          <section>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t("services.halalInvestment.title")}:</strong> {t("services.halalInvestment.description")}
              </li>
              <li>
                <strong>{t("services.realEstate.title")}:</strong> {t("services.realEstate.description")}
              </li>
              <li>
                <strong>{t("services.startupFunding.title")}:</strong> {t("services.startupFunding.description")}
              </li>
              <li>
                <strong>{t("services.wealthManagement.title")}:</strong> {t("services.wealthManagement.description")}
              </li>
              <li>
                <strong>{t("services.stockMarket.title")}:</strong> {t("services.stockMarket.description")}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
