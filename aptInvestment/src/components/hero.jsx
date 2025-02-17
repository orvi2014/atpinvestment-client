import React, { useState, useEffect } from 'react'; // Added useState and useEffect imports
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    console.log('Current language:', i18n.language);
    console.log('Available languages:', i18n.languages);
    console.log('Loaded namespaces:', i18n.loadedNamespaces);
    console.log('Loaded languages:', i18n.loadedLanguages);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4 mt-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
          {t('hero.title')}
        </h1>
        <h4 className="text-xl font-semibold">
          {t('hero.subtitle')}  
        </h4>
        <p className="text-lg text-muted-foreground">
          {t('hero.description')}
        </p>
        <Button
          className="bg-[#456FE8] hover:bg-[#3655C4] text-white rounded-[20px] py-3 px-6 transition-all duration-300 hover:scale-105"
          size="lg"
        >
          {t('hero.cta')}
        </Button>
      </div>
    </div>
  );
}
