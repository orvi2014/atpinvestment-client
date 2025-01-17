import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '@/components/imageGallery';
import InvestmentDetails from '@/components/investmentDetails';
import { ProjectDescription } from '@/components/projectDescription';

export default function InvestmentPage() {
  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  // Get the id from the URL

  useEffect(() => {
    async function fetchInvestment() {
      if (!id) {
        console.error('Investment ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/data/investments.json');
        if (!response.ok) {
          throw new Error('Failed to fetch investment data');
        }
        const data = await response.json();

        const foundInvestment = data.investments?.find(
          (inv) => inv.id === parseInt(id)
        );

        if (foundInvestment) {
          setInvestment(foundInvestment);
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
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!investment) {
    return <div className="container mx-auto px-4 py-8">Investment not found</div>;
  }

  return (
    <div className="investment-details-container">
      <div className="investment-grid">
        <div className="gallery-section">
          <ImageGallery
            investment={investment}
          />
        </div>
        <div className="details-section">
          <InvestmentDetails
            title={investment.title}
            location={investment.location || "Location not provided"}
            totalPayment={investment.price}
            roi={investment.roi || 10}
            raisedAmount={investment.targetAchieved * investment.price / 100}
            raisedPercentage={investment.targetAchieved}
            investmentOptions={[10000, 20000, 30000, 40000]}
          />
        </div>
      </div>
      <ProjectDescription description={investment.description || 'No description available.'} />
    </div>
  );
}

