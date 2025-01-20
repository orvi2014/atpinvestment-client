import { useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { ChevronLeft } from "lucide-react"; 
import { Link } from "react-router-dom"; 
import logo from "../../assets/Image/logo-blue.png"; 
import PromoSection from "../../components/promotionalSection.jsx"; 
import "./index.css";  

export default function SignIn() { 
  const [username, setUsername] = useState(""); 
  const [membershipId, setMembershipId] = useState(""); 

  return ( 
    <div className="flex flex-col lg:flex-row min-h-screen"> 
      {/* Main Content Section */}
      <main className="flex-1 p-6 lg:p-12"> 
        <header className="space-y-6"> 
          <Button variant="ghost" size="icon" className="w-8 h-8 -ml-2"> 
            <ChevronLeft className="h-5 w-5" /> 
          </Button> 
          <div className="flex items-center gap-2"> 
            <img src={logo} alt="ATP Investment Logo" /> 
            <h1 className="text-blue-500 text-2xl font-semibold">ATP Investment</h1> 
          </div> 
        </header> 

        <section className="mt-12 space-y-8"> 
          <div className="space-y-2"> 
            <h2 className="text-xl font-semibold text-gray-900">Sign In</h2> 
            <p className="text-sm text-gray-500">Please enter your credentials</p> 
          </div> 

          <form className="space-y-4"> 
            {/* Username Input */}
            <div className="space-y-2"> 
              <label className="text-sm text-muted-foreground">Username</label> 
              <Input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Your email" 
                className="h-12" 
              /> 
            </div> 

            {/* Membership ID Input */}
            <div className="space-y-2"> 
              <label className="text-sm text-muted-foreground">Membership ID</label> 
              <Input 
                type="text" 
                value={membershipId} 
                onChange={(e) => setMembershipId(e.target.value)} 
                placeholder="Your Membership ID" 
                className="h-12" 
              /> 
            </div> 

            {/* Need Help Button */}
            <div className="text-right"> 
              <Button 
                variant="ghost" 
                className="text-sm text-gray-600 bg-transparent hover:text-blue-400 hover:bg-transparent" 
              > 
                Need Help? 
              </Button> 
            </div> 

            {/* Sign In Button */}
            <Button className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600"> 
              Sign In 
            </Button> 
          </form> 

          <footer className="text-sm text-center text-gray-500"> 
            Don't have an account?{" "} 
            <Link to="/signup" className="text-blue-500 hover:underline"> 
              Sign Up 
            </Link> 
          </footer> 
        </section> 
      </main> 

      {/* Promotional Section (Now on the Right) */}
      <aside className="hidden lg:block lg:w-1/2 promotional-section"> 
        <PromoSection /> 
      </aside> 
    </div> 
  ); 
}
