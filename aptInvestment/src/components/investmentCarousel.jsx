'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InvestmentCard from './investmentCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function InvestmentCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [investments, setInvestments] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchInvestments() {
      try {
        const response = await fetch(`/data/investments.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
  
        const data = await response.json();
        setInvestments(data.investments);
      } catch (error) {
        console.error('Error fetching investments:', error);
        setInvestments([]); // Optionally set an empty array or show a message
      }
    }
  
    fetchInvestments();
  }, [i18n.language]);
  

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === investments.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? investments.length - 1 : prev - 1
    );
  };

  if (investments.length === 0) {
    return <div>{t('loadingInvestments')}</div>;
  }

  const visibleInvestments = [
    investments[currentSlide],
    investments[(currentSlide + 1) % investments.length],
    investments[(currentSlide + 2) % investments.length],
  ];

  return (
    <div className="relative mb-16">
      <div className="flex flex-col items-center">
        <div className="w-full">
          {/* Mobile view (single card) */}
          <div className="md:hidden">
            <InvestmentCard {...investments[currentSlide]} />
          </div>
          
          {/* Tablet and desktop view (multiple cards) */}
          <div className="hidden md:flex gap-6 overflow-hidden">
            {visibleInvestments.map((investment, index) => (
              <div key={investment.id} className="w-1/3 flex-shrink-0">
                <InvestmentCard {...investment} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {investments.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg"
        onClick={prevSlide}
        disabled={investments.length <= 1} // Disable if there's only one investment
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg"
        onClick={nextSlide}
        disabled={investments.length <= 1} // Disable if there's only one investment
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex justify-center mt-6">
        <Link to="/investments">
          <Button 
            variant="link" 
            className="text-black-600 hover:text-blue-600 bg-white px-4 py-2 rounded-full shadow-md"
          >
            {t('viewAllProjects')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
