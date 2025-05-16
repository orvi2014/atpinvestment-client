"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { showToast } from "@/components/utility/showToaster"; // Import showToast function

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    resetToken: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract email from query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Replace window.alert with showToast
        showToast(t("passwordResetSuccess"), "success");
        navigate("/"); // Redirect to sign-in page after reset
      } else {
        setError(data.error || t("passwordResetFailed"));
        showToast(data.error || t("passwordResetFailed"), "error"); // Show error toast
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(t("networkError"));
      showToast(t("networkError"), "error"); // Show error toast
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">{t("resetPassword")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{t("emailLabel")}</Label>
            <Input id="email" name="email" type="email" value={formData.email} readOnly />
          </div>
          <div>
            <Label htmlFor="resetToken">{t("resetTokenLabel")}</Label>
            <Input id="resetToken" name="resetToken" type="text" placeholder={t("resetTokenPlaceholder")} value={formData.resetToken} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="newPassword">{t("newPasswordLabel")}</Label>
            <Input id="newPassword" name="newPassword" type="password" placeholder={t("newPasswordPlaceholder")} value={formData.newPassword} onChange={handleChange} required />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600" disabled={loading}>
            {loading ? t("resettingPassword") : t("resetPassword")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
