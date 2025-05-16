"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PromotionalSection from "../../components/promotionalSection.jsx";
import { useTranslation } from "react-i18next";
import logo from "../../assets/image/logo.png";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { showToast } from "@/components/utility/showToaster.jsx";
import "./index.css";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Button loading state

  useEffect(() => {
    const customerId = `iv${Math.floor(Math.random() * 100000)}`;
    setFormData((prev) => ({
      ...prev,
      customerId,
    }));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.atpinvestment.com.bd/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customId: formData.customerId,
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);

      if (response.ok) {
        showToast(data.message, "Success");
        navigate("/signup/verify/OTP", { state: { email: formData.email } });
      } else {
        showToast(data.message || "Signup Failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Network Error:", error);
      showToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-md w-full">
          <Link to="/" className="inline-flex items-center text-sm mb-8">
            <ChevronLeft className="back-button" />
          </Link>
          <div className="mb-6 sm:mb-8 mt-4 sm:mt-8">
            <div className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="ATP Investment" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-bold text-blue-500">{t("companyName")}</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">{t("signupTitle")}</h2>

              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-blue-500">
                  {t("fullnameLabel")}
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder={t("fullnamePlaceholder")}
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-500">
                  {t("emailLabel")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-500">
                  {t("passwordLabel")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-11 sm:h-12"
                />
              </div>
            </div>

            {/* Finish Sign Up Button */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? t("signingUp") : t("finishSignUp")}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block lg:flex-1">
        <PromotionalSection />
      </div>
    </div>
  );
};

export default SignUpForm;
