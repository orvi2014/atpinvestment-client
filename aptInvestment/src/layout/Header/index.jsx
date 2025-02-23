import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../../assets/image/logo.png";
import "./index.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo || "/placeholder.svg"} alt={t("companyName")} className="h-8 w-8" />
              <span className="font-bold">{t("companyName")}</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t("toggleMenu")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/investment/all">{t("projects")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/promotions">{t("promotions")}</Link>
              </DropdownMenuItem>

              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/signin">{t("signIn")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">{t("signUp")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/download">{t("downloadApp")}</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                 <DropdownMenuItem className="text-blue-500" asChild>
                  <Link to="/deposite">{t('deposite')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-blue-500" asChild>
                  <Link to="/profile">{t("profile")}</Link>
                </DropdownMenuItem>
                </>
              )}

              {/* Language Switcher */}
              <DropdownMenuItem onSelect={() => changeLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/investment/all" className="nav-link">
              {t("projects")}
            </Link>
            <Link to="/promotions" className="nav-link">
              {t("promotions")}
            </Link>

            {!isAuthenticated ? (
              <>
                <Button variant="ghost" className="ghost-button" asChild>
                  <Link to="/signin">{t("signIn")}</Link>
                </Button>
                <Button variant="ghost" className="signup-button" asChild>
                  <Link to="/signup">{t("signUp")}</Link>
                </Button>
                <Button variant="outline" className="download-button" asChild>
                  <Link to="/download">{t("downloadApp")}</Link>
                </Button>
              </>
            ) : (
              <>
              <Button variant="outline" className="deposite-button" asChild>
                  <Link to="/deposite">{t('deposite')}</Link>
                </Button>
                <Button variant="outline" className="profile-button" asChild>
                  <Link to="/profile">{t("profile")}</Link>
                </Button>
              </>
            )}

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="language-button">
                  {i18n.language === "en" ? "English" : "বাংলা"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => changeLanguage("bn")}>বাংলা</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
