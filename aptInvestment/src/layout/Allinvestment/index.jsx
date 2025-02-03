import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./index.css"; // Import your CSS file

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]); // State to store the fetched investments
  const [loading, setLoading] = useState(true); // State to manage loading state

  // Fetch data from the API
  useEffect(() => {
    async function fetchInvestments() {
      try {
        const response = await fetch("https://atpinvestment.onrender.com/api/project/list");
        const data = await response.json();

        if (data.projects) {
          setInvestments(data.projects); // Set fetched projects
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    }

    fetchInvestments();
  }, []);

  // If the data is still loading, show a loading message
  if (loading) {
    return <div>Loading investments...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="titleIN container mx-auto px-4">
        <h1>Investment Opportunities</h1>
        <p>Discover and invest in promising projects</p>
      </div>

      {/* Main Content */}
      <div className="investment container mx-auto px-8 py-8">
        {investments.map((investment) => (
          <Card key={investment._id} className="investment-card card-hover-effect">
            <div className="image-container">
              <img
                src={investment.defaultImage || "/placeholder.svg"}
                alt={investment.title}
                className="object-cover"
              />
            </div>
            <CardHeader className="bg-white">
              <CardTitle className="text-responsive">{investment.title}</CardTitle>
            </CardHeader>
            <CardContent className="bg-white pt-4">
              <div className="stats-container">
                <div>
                  <p className="stat-label">Amount Raised</p>
                  <p className="stat-value raised-amount">৳ {investment.raisedAmount}</p>
                </div>
                <div>
                  <p className="stat-label">Projected ROI</p>
                  <p className="stat-value">{investment.roi}%</p>
                </div>
                <button className="custom-button view-details-btn">View Details</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
