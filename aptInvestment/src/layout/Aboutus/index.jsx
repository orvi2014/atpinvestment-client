import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import "./index.css"


export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-white ">
      <h1 className="title">About Us</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="Cardtitle">Who We Are</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              ATP Investment is a Shariah-compliant investment firm committed to ethical wealth-building by adhering to
              Islamic financial principles. We focus on halal investments that avoid interest (riba) and unethical
              businesses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="Cardtitle">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide secure, interest-free investment opportunities that align with Islamic financial ethics while
              delivering sustainable growth.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="Cardtitle">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the most trusted Sunnah-based investment firm in Bangladesh, empowering investors with
              Shariah-compliant financial solutions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="Cardtitle">Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none space-y-2">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                <span>Integrity</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                <span>Ethical Finance</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                <span>Transparency</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                <span>Risk Sharing</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                <span>Long-Term Prosperity</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

