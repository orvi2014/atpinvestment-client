import "./index.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
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
    <div className="container mx-auto px-4 py-8 max-w-4xl mb-10">

      <div className="bg-white p-8 px-10 md:px-40 text-gray-600"> 
        <h1 className="title">{t("about.title")}</h1>

        <div className="space-y-8">
          <section>
            <h2 className="Cardtitle">{t("about.who_we_are.title")}</h2>
            <p className="text-muted-foreground">{t("about.who_we_are.description")}</p>
            <p className="text-muted-foreground">{t("about.who_we_are.des")}</p>
          </section>

          <section>
            <h2 className="Cardtitle">{t("about.mission.title")}</h2>
            <p className="text-muted-foreground">{t("about.mission.description")}</p>
           
          </section>

         

          <section>
            <h2 className="Cardtitle">{t("about.core_values.title")}</h2>
            <ul className="list-none space-y-2">
              {t("about.core_values.values", { returnObjects: true }).map((value, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
