import React, { useState, useEffect } from 'react'
import FAQ from '../../components/faq'
import Joinus from '../../components/joinUs'
import './index.css'
import { useTranslation } from 'react-i18next';

function Footer() {
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
    <footer className="bg-gray-100 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {t('faq.title')}
      </h1>
      <div className="faq-section">
        <FAQ />
      </div>

      {/* Join Us section */}
      <div className='joinus mt-4'>
        <Joinus />
      </div>

      
    </footer>
  )
}

export default Footer
