import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '@/components/imageGallery';
import InvestmentDetails from '@/components/investmentDetails';
import { ProjectDescription } from '@/components/projectDescription';
import "./index.css";

export default function InvestmentPage() {
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchInvestment() {
      if (!id) {
        console.error('Investment ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://atpinvestment.onrender.com/api/project/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch investment data');
        }
        const data = await response.json();
        
        if (data.project) {
          setInvestment(data.project);
        } else {
          console.error('Investment not found for ID:', id);
        }
      } catch (error) {
        console.error('Error fetching investment:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInvestment();
  }, [id]);

  if (loading) {
    return <div className="px-4 py-8">Loading...</div>;
  }

  if (!investment) {
    return <div className="px-4 py-8">Investment not found</div>;
  }

  return (
    <div className="investment-page">
      <div className="investment-grid">
        {/* Image Gallery Section */}
        <div className="gallery-section mt-10">
          <ImageGallery investment={investment} />
        </div>

        {/* Investment Details Section */}
        <div className="details-section mt-20 ml-[-50px]">
          <InvestmentDetails
            title={investment.title}
            location={investment.location || "Location not provided"}
            totalPayment={investment.price}
            roi={investment.roi || 10}
            raisedAmount={investment.raisedAmount}
            raisedPercentage={investment.targetAchieved}
            investmentOptions={investment.investmentOptions}
          />
        </div>
      </div>

      {/* Project Description Section */}
      <div className="project-details-section">
        <ProjectDescription description={investment.description || "No description available."} />
      </div>
    </div>
  );
}
