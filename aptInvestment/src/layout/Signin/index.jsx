import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/image/logo-blue.png";
import PromoSection from "../../components/promotionalSection.jsx.jsx";
import "./index.css";

export default function SignIn() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(t("invalidEmail"));
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!emailError) {
      const requestBody = { email, password };

      try {
        const response = await fetch("https://atpinvestment.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert(t("loginSuccess"));
          navigate("/");
        } else {
          setError(data.message || t("loginFailed"));
        }
      } catch (err) {
        console.error("Login error:", err);
        setError(t("networkError"));
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <main className="flex-1 p-6 lg:p-12">
        <header className="space-y-6">
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

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{t("emailLabel")}</label>
              <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t("emailPlaceholder")}
                  className={`custom-input h-12 ${emailError ? "invalid-input" : ""}`}
                  required
               />

              {emailError && <p className="error-text">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{t("passwordLabel")}</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                className="custom-input h-12"
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <Button
              type="submit"
              className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? t("loading") : t("signInButton")}
            </Button>
          </form>

          <div className="text-sm text-center text-gray-500">
            {t("noAccount")} <Link to="/signup" className="text-blue-500 hover:underline">{t("signUpLink")}</Link>
          </div>
        </section>
      </main>

      <aside className="hidden lg:block lg:w-1/2 promotional-section">
        <PromoSection />
      </aside>
    </div>
  );
}
