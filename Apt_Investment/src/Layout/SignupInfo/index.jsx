"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PromotionalSection from "../../components/promotionalSection.jsx";
import logo from "../../assets/Image/logo-blue.png";
import { useTranslation } from "react-i18next";
import "./index.css";

const SignUpForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState({
    customId: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success message

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message); // "user created"
        setTimeout(() => {
          navigate("/"); // Redirect to homepage
        }, 2000); // Delay for showing the success message
      } else {
        setError(data.error); // "User already exists" or other errors
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
    <div className="flex min-h-screen signup">
      {/* Left side: Form container */}
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          <div className="header mb-8 mt-20">
            <div className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="ATP Investment" width={40} height={40} className="logo" />
              <span className="text-2xl font-bold text-blue-500">ATP INVESTMENT</span>
            </div>
          </div>

          {/* Sign up form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("signupTitle")}</h2>

              {/* Custom ID Input */}
              <div className="space-y-2">
                <Label htmlFor="customId" className="text-blue-500">
                  {t("customIdLabel")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Input
                  id="customId"
                  name="customId"
                  placeholder={t("customIdPlaceholder")}
                  value={formData.customId}
                  onChange={handleChange}
                  required
                  className="w-full custom-input"
                />
              </div>

              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-blue-500">
                  {t("fullnameLabel")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  placeholder={t("fullnamePlaceholder")}
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                  className="w-full custom-input"
                />
              </div>

              {/* Email Input */}
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
                  className="w-full custom-input"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-500">
                  {t("passwordLabel")} <span className="text-red-500">{t("required")}</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full custom-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              {t("finishSignUp")}
            </Button>

            {/* Display success or error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>
        </div>
      </div>

      {/* Right side: Promotional Section */}
      <div className="flex-1">
        <PromotionalSection />
      </div>
    </div>
  );
};

export default SignUpForm;
