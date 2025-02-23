import React, { useEffect, useState } from "react";
import "./index.css";
import InvestmentCard from "@/components/investmentCard";
import { useTranslation } from "react-i18next";

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function fetchInvestments() {
      try {
        const response = await fetch("https://api.atpinvestment.com.bd/api/project/list");
        const data = await response.json();
        
        if (data.projects) {
          setInvestments(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInvestments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="titleIN container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold mb-2">{t("investment_opportunities")}</h1>
        <p className="text-gray-600 mb-6">{t("discover_investments")}</p>
      </div>
      <div className="investment container mx-auto px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <InvestmentCard
            key={investment._id}
            _id={investment._id}
            defaultImage={investment.defaultImage}
            title={investment.title}
            location={investment.location}
            price={investment.price}
            description={investment.description}
            targetAchieved={investment.targetAchieved}
          />
        ))}
      </div>
    </div>
  );
}
