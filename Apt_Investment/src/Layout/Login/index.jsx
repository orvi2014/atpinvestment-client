import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/Image/logo-blue.png";
import PromoSection from "../../components/promotionalSection.jsx";
import "./index.css";

export default function LoginForm() {
  return (
    <div className="login-section flex">
      <div className="flex-1 lg:w-1/2"> {/* Left side for login on large screens */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="ATP Investment Logo"
              className="h-8 w-8"
            />
            <span className="company ">ATP Investment</span>
          </div>
        </div>

        <div className="space-y-6 max-w-sm mx-auto w-full mt-20">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
          </div>

          <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Username</label>
                <Input type="text" placeholder="Your email" className="custom-input" />
          </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Membership ID</label>
              <Input type="text"  className="custom-input"/>
            </div>
            <div className="text-right">
                <Button variant="ghost" className="text-sm text-gray-600 bg-transparent hover:text-blue-400 hover:bg-transparent">
                   Need Help?
                </Button>
            </div>

            <Button className="login" size="lg">
              Log In
            </Button>
          </div>

          <div className="text-center text-sm">
              {"Don't have an account? "}
            <Link to="/signup" className="text-blue-600 hover:underline">
               Sign Up
            </Link>
          </div>

        </div>
      </div>

      {/* Promotional Section on the Right Side for large screens */}
      <div className="promotional-section hidden lg:block lg:w-1/2"> {/* Visible on large screens */}
        <PromoSection />
      </div>
    </div>
  );
}
