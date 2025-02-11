import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PromoSection from "../../components/promotionalSection.jsx";
import logo from "../../assets/image/logo-blue.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email
    if ( !email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Perform login logic here (e.g., API call)
    setTimeout(() => {
      // Simulating API call
      if (email === "user@example.com" && password === "password") {
        alert("Login successful!");
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="flex-1 p-6 lg:p-12 justify-center">
        <div className="mb-8">
          <Link to="/admin" className="inline-flex items-center text-sm">
            <ChevronLeft className="back-button" />
          </Link>
        </div>

        <div className="mb-8 ml-24">
          <div className="flex items-center gap-2 text-3xl font-semibold text-blue-500">
            <img
              src={logo || "/placeholder.svg"}
              alt="ATP Investment"
              className="h-10 w-10"
            />
            ATP Investment
          </div>
        </div>

        <div className="space-y-2 mx-16 mb-12 mt-20">
         <h2 className="text-2xl font-semibold text-gray-900">Admin Log In</h2>
 
        </div>


        <form className="space-y-4 mx-16 " onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={ `h-12 ${emailError ? "border-red-500" : ""}`}
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="text-sm text-left text-blue-500 hover:underline focus:underline">
              <Link>
              Forget Password?
              </Link>
            </div>

          <Button
            type="submit"
            className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600 "
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline focus:underline"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-1/2">
        <PromoSection />
      </div>
    </div>
  );
}
