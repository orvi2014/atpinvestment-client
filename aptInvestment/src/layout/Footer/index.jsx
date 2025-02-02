import React, { useState, useEffect } from 'react'
import FAQ from '../../components/faq'
import Joinus from '../../components/joinUs'
import './index.css'
import logo from "../../assets/image/logo.png"
import { MapPin, Phone, Mail } from "lucide-react";
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

      {/* Other info */}
      <div className="footer-info bg-background border-t">
        <div className="footer-content container py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="footer-left space-y-0 ml-32">
            <div className="logo flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="ATP Investment logo" width={32} height={32} />
              <span className="font-semibold text-lg">ATP Investment</span>
            </div>
            <div className="contact-info space-y-4">
              <p className="text-muted-foreground">{t('contact.title')}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{t('contact.address.title')}: {t('contact.address.value')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-right grid grid-cols-1 gap-2">
            <div className="footer-column space-y-0 mr-40">
              <h3 className="font-semibold">{t('socials.title')}</h3>
              <div className="social-links flex flex-col space-y-2">
                <a href="tel:01670407666" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 text-muted-foreground inline" /> {t('contact.phone.value')}
                </a>
                <a href="mailto:investmentatp@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 text-muted-foreground inline" /> {t('contact.email.value')}
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
    </footer>
  )
}

export default Footer
