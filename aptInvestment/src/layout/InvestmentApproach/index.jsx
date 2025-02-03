import "./index.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function InvestApproach() {
  const { t, i18n } = useTranslation();
  
    const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  
    useEffect(() => {
      i18n.changeLanguage(language);
    }, [language, i18n]);
  
    const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
      setLanguage(lang);
      localStorage.setItem("lang", lang);
    };

  return (
    <div className="body-container  mx-auto px-4 py-8">
      <div className="p-8 px-10 md:px-40 text-gray-600">
        <h1 className="title">{t("investApproach.title")}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="Cardtitle">{t("investApproach.subtitle")}</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t("investApproach.noRiba.title")}:</strong> {t("investApproach.noRiba.description")}
              </li>
              <li>
                <strong>{t("investApproach.riskSharing.title")}:</strong> {t("investApproach.riskSharing.description")}
              </li>
              <li>
                <strong>{t("investApproach.halalInvestment.title")}:</strong> {t("investApproach.halalInvestment.description")}
              </li>
              <li>
                <strong>{t("investApproach.assetBacked.title")}:</strong> {t("investApproach.assetBacked.description")}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
