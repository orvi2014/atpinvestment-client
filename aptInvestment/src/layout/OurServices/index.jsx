import React from "react";
import "./index.css"

export default function Service() {
  return (
    <div className="service-container mx-auto px-4 py-8 ">
        <div className="p-8 px-40 text-gray-600">
            <h1 className="title">Our Services</h1>

      <div className="space-y-8">
        <section>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Halal Investment Advisory:</strong> Personalized Shariah-compliant investment strategies.
            </li>
            <li>
              <strong>Shariah-Compliant Real Estate Investments: </strong>Property investments with ethical and transparent financing.
            </li>
            <li>
              <strong>Halal Business & Startup Funding:</strong> Supporting businesses that align with Islamic finance.
            </li>
            <li>
              <strong>Wealth Management (Without Interest):</strong> Ethical asset growth without relying on riba-based financial products.
            </li>
            <li>
                <strong>Islamic Stock Market & Trading:</strong> Investments in halal stock exchanges and businesses.
            </li>
          </ul>
        </section>
      </div>
      </div>
      
    </div>
  );
}
