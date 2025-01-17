import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "../Layout/Footer/index.css"

export default function NewsletterForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="newsletter-container">
      <div className="blue-accent left"></div>
      <div className="content">
        <h1>Join us to learn more about investments</h1>
        <h1>and grow with us</h1>
        <p>Stay up to date with latest projects we are bringing and invest to earn</p>
        <form onSubmit={handleSubmit} className="form-group">
          <Input 
            type="email" 
            placeholder="Enter your email"
            className="email-input"
          />
          <Button 
            type="submit"
            className="sign-up-btn"
          >
            Sign Up
          </Button>
        </form>
      </div>
      <div className="blue-accent right"></div>
    </div>
  )
}

