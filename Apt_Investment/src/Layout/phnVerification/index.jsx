import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/Image/logo-blue.png";
import PromoSection from "../../components/promotionalSection.jsx";
import "./index.css";

export default function PhoneVerification() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Fetch countries from JSON
  useEffect(() => {
    fetch("/data/countries.json")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setSelectedCountry(data[0]); // Default to the first country
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Handle country selection
  const handleCountryChange = (value) => {
    const country = countries.find((c) => c.code === value);
    setSelectedCountry(country);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse min-h-screen">
      {/* Promotional Section (Visible on Large Screens) */}
      <aside className="hidden lg:block lg:w-1/2">
        <PromoSection />
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 lg:w-1/2 p-6">
        <header className="space-y-6">
          <Button variant="ghost" size="icon" className="w-8 h-8 -ml-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="APT_Investment Logo" />
            <h1 className="text-blue-500 text-2xl font-semibold">ATP Investment</h1>
          </div>
        </header>

        <section className="mt-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Verify Phone Number</h2>
            <p className="text-sm text-gray-500">Please confirm country code and enter your phone number</p>
          </div>

          <form className="space-y-4">
            {/* Country Dropdown */}
            <Select
              value={selectedCountry?.code}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="h-12">
                <div className="flex items-center gap-2">
                  {selectedCountry && (
                    <>
                      <img
                        src={selectedCountry.flag}
                        alt={`${selectedCountry.name} flag`}
                        className="w-7 h-5 object-cover rounded-sm"
                      />
                      <SelectValue placeholder="Select country">{selectedCountry.name}</SelectValue>
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
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {selectedCountry?.phonePrefix || "+000"}
              </span>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0 00 00 00 00"
                className="pl-14 h-12 text-base"
              />
            </div>

            {/* Continue Button */}
            <Button className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600">Continue</Button>
          </form>

          <footer className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
}
