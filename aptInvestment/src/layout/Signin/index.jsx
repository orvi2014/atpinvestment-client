"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PromotionalSection from "@/components/promotionalSection.jsx";
import { useTranslation } from "react-i18next";
import logo from "../../assets/image/logo.png";
import { ChevronLeft } from "lucide-react";
import {showToast} from "@/components/utility/showToaster";


const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailValid(false);
      showToast(t("invalidEmail"), "error"); // Using showToast for error
      setLoading(false);
      return;
    }

    setEmailValid(true);

    try {
      const response = await fetch("https://api.atpinvestment.com.bd/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        showToast(t("loginSuccessful"), "success"); // Using showToast for success
        navigate("/investment/all");
      } else {
        showToast(data.message || t("loginFailed"), "error");
      }
    } catch (err) {
      showToast(t("networkError"), "error");
    }
    setLoading(false);
  };
;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setTimeout(() => {
          navigate(`/password/reset?email=${encodeURIComponent(resetEmail)}`);
        }, 2000);
      } else {
        toast.error(data.message || t("resetFailed"));
      }
    } catch (err) {
      toast.error(t("networkError"));
    }
    setResetLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-md w-full">
          <Link to="/" className="inline-flex items-center text-sm mb-8">
            <ChevronLeft className="back-button" />
          </Link>
          <div className="mb-6 sm:mb-8 mt-4 sm:mt-8 flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="ATP Investment" className="w-10 h-10" />
            <span className="text-2xl font-bold text-blue-500">{t("companyName")}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("signInTitle")}</h2>
              <div>
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={!emailValid ? "border-red-500" : ""}
                  required
                />
                {!emailValid && <p className="text-red-500 text-sm">{t("invalidEmail")}</p>}
              </div>
              <div>
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="text-sm text-right">
              <button type="button" onClick={() => setShowResetModal(true)} className="text-blue-500 hover:underline">
                {t("forgotPassword")}
              </button>
            </div>

            <Button type="submit" className="w-full bg-blue-500 text-white" disabled={loading}>
              {loading ? t("signingIn") : t("signIn")}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <PromotionalSection />
      </div>

      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-lg font-semibold">{t("forgotPassword")}</h2>
            <form onSubmit={handleForgotPassword} className="mt-4 space-y-4">
              <Input
                type="email"
                name="resetEmail"
                placeholder={t("emailPlaceholder")}
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-blue-500 text-white" disabled={resetLoading}>
                {resetLoading ? t("sending") : t("sendResetLink")}
              </Button>
            </form>
            <button onClick={() => setShowResetModal(false)} className="text-sm text-blue-500 mt-4">{t("close")}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
