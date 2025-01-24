import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Image/logo-blue.png";
import PromoSection from "../../components/promotionalSection.jsx.jsx";
import "./index.css";

export default function PhoneVerification() {
  const { t } = useTranslation(); // i18next hook
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  // Fetch countries from JSON
  useEffect(() => {
    fetch("/data/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);

        // Set Bangladesh as the default country (code is "BD")
        const bangladesh = data.find((country) => country.code === "bd");
        setSelectedCountry(bangladesh || data[0]); // Fallback to the first country if Bangladesh isn't found
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (value) => {
    const country = countries.find((c) => c.code === value);
    setSelectedCountry(country);
  };

  const handleContinue = () => {
    navigate("/signup/verify/otp"); // Navigate to OTP verification page
  };

  return (
    <div className="container flex flex-col lg:flex-row-reverse min-h-screen ">
  {/* Promotional Section */}
  <aside className="hidden lg:block lg:w-1/2">
    <PromoSection />
  </aside>

  {/* Main Content */}
  <main className="flex-1 lg:w-1/2 p-6 mt-20 mx-20">
    <header className="space-y-6">
      <Link to="/" className="back-button mt-5">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <div className="brand-logo flex items-center gap-2 ">
        <img src={logo} alt="ATP Investment Logo" />
        <h1 className="text-blue-500 text-3xl font-bold">{t("companyName")}</h1>
      </div>
    </header>

    <section className="mt-12 space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{t("verifyPhoneNumber")}</h2>
        <p className="text-sm text-gray-500">{t("confirmCountry")}</p>
      </div>

      <form className="space-y-4">
  {/* Country Dropdown */}
  <Select value={selectedCountry?.code} onValueChange={handleCountryChange}>
    <SelectTrigger className="h-12">
      <div className="flex items-center gap-2">
        {selectedCountry && (
          <>
            <img
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              className="w-7 h-5 object-cover rounded-sm"
            />
            <SelectValue placeholder={t("selectCountry")}>
              {selectedCountry.name}
            </SelectValue>
          </>
        )}
      </div>
    </SelectTrigger>
    <SelectContent>
      {countries.map((country) => (
        <SelectItem key={country.code} value={country.code}>
          <div className="flex items-center gap-2">
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="w-7 h-5 object-cover rounded-sm"
            />
            {country.name}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {/* Phone Number Input */}
  <div className="phone-input-container">
    <span className="phone-input-prefix">
      {selectedCountry?.phonePrefix || "+000"}
    </span>
    <Input
      type="tel"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      placeholder="0 00 00 00 00"
      className="phone-input"
    />
  </div>

  {/* Continue Button */}
  <Button onClick={handleContinue} className="continue-button">
    {t("continue")}
  </Button>
</form>


      <div className="text-sm text-center text-gray-500 bg-transparent">
        {t("alreadyHaveAccount")}{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">
          {t("signIn")}
        </Link>
      </div>
    </section>
  </main>
</div>
  );
}
