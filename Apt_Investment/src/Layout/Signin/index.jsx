import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import i18next hook
import logo from "../../assets/Image/logo-blue.png";
import PromoSection from "../../components/promotionalSection.jsx";
import "./index.css";

export default function SignIn() {
  const { t, i18n } = useTranslation(); // Initialize translation
  const [username, setUsername] = useState("");
  const [membershipId, setMembershipId] = useState("");

  // Read language from localStorage and update i18n
  useEffect(() => {
    const storedLanguage = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(storedLanguage); // Set language based on stored value
  }, [i18n]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Main Content Section */}
      <main className="flex-1 p-6 lg:p-12">
        <header className="space-y-6">
          {/* Back Arrow Redirects to Home */}
          <Link to="/" className="back-button">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-2">
            <img src={logo} alt={t("companyName")} />
            <h1 className="text-blue-500 text-2xl font-semibold">{t("companyName")}</h1>
          </div>
        </header>

        <section className="mt-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">{t("signInTitle")}</h2>
            <p className="text-sm text-gray-500">{t("signInDescription")}</p>
          </div>

          <form className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{t("usernameLabel")}</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("usernamePlaceholder")}
                className="h-12"
              />
            </div>

            {/* Membership ID Input */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{t("membershipIdLabel")}</label>
              <Input
                type="text"
                value={membershipId}
                onChange={(e) => setMembershipId(e.target.value)}
                placeholder={t("membershipIdPlaceholder")}
                className="h-12"
              />
            </div>

            {/* Need Help Button */}
            <div className="text-right">
              <Button
                variant="ghost"
                className="text-sm text-gray-600 bg-transparent hover:text-blue-400 hover:bg-transparent"
              >
                {t("needHelp")}
              </Button>
            </div>

            {/* Sign In Button */}
            <Button className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600">
              {t("signInButton")}
            </Button>
          </form>

          <div className="text-sm text-center text-gray-500">
            {t("noAccount")}{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              {t("signUpLink")}
            </Link>
          </div>
        </section>
      </main>

      {/* Promotional Section */}
      <aside className="hidden lg:block lg:w-1/2 promotional-section">
        <PromoSection />
      </aside>
    </div>
  );
}
