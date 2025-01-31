import "./index.css";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mb-10">
      <div className="bg-white p-8 px-40 text-gray-600"> 
        <h1 className="title">About Us</h1>

        <div className="space-y-8">
          <section>
            <h2 className="Cardtitle">Who We Are</h2>
            <p className="text-muted-foreground ext-gray-600">
              ATP Investment is a Shariah-compliant investment firm committed to ethical wealth-building by adhering to
              Islamic financial principles. We focus on halal investments that avoid interest (riba) and unethical
              businesses.
            </p>
          </section>

          <section>
            <h2 className="Cardtitle">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide secure, interest-free investment opportunities that align with Islamic financial ethics while
              delivering sustainable growth.
            </p>
          </section>

          <section>
            <h2 className="Cardtitle">Our Vision</h2>
            <p className="text-muted-foreground">
              To be the most trusted Sunnah-based investment firm in Bangladesh, empowering investors with
              Shariah-compliant financial solutions.
            </p>
          </section>

          <section>
            <h2 className="Cardtitle">Core Values</h2>
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
          </section>
        </div>
      </div>
    </div>
  );
}
