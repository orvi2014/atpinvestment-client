import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PromotionalSection from "../../components/promotionalSection.jsx.jsx";
import logo from "../../assets/image/logo-blue.png";
import { useTranslation } from "react-i18next";
import "./index.css";

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "", // This will be generated automatically
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // General error state
  const [success, setSuccess] = useState("");
  const [emailValid, setEmailValid] = useState(true); // Track email validity

  useEffect(() => {
    // Generate a unique customerId (example implementation)
    const customerId = `iv${Math.floor(Math.random() * 100000)}`; // Randomly generate customer ID
    setFormData((prev) => ({
      ...prev,
      customerId,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailValid(false); // Mark email as invalid
      setError(t("invalidEmail")); // Set error message
      return; // Prevent form submission if email is invalid
    }

    setEmailValid(true); // If email is valid, proceed with form submission

    const payload = {
      customId: formData.customerId, // Match the backend's expected field name
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
    };

    console.log("Request Payload:", payload); // Debugging

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response Data:", data); // Debugging

      if (response.ok) {
        setSuccess(data.message); // e.g., "User created successfully"

        // Show alert and navigate to homepage on confirmation
        window.alert(data.message);
        navigate("/"); // Redirect to homepage
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
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
      <div className="flex-1 p-8">
        <div className="max-w-md mx-auto">
          <div className="header mb-8 mt-20">
            <div className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="ATP Investment" width={40} height={40} className="logo" />
              <span className="text-2xl font-bold text-blue-500">ATP INVESTMENT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-20">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("signupTitle")}</h2>

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
                  className="w-full custom-input"
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
    className={`custom-input h-12 ${!emailValid ? "invalid-input" : ""}`}
    required
  />
  {/* Show email validation error message */}
  {!emailValid && <p className="error-text mt-1">{t("invalidEmail")}</p>}
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
                  className="w-full custom-input"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              {t("finishSignUp")}
            </Button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
          </form>
        </div>
      </div>

      <div className="flex-1">
        <PromotionalSection />
      </div>
    </div>
  );
};

export default SignUpForm;
