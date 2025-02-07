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
        const response = await fetch('https://atpinvestment.onrender.com/api/project/list');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        const data = await response.json();
        if (Array.isArray(data.projects)) {
          const uniqueProjects = Array.from(new Map(data.projects.map(p => [p._id, p])).values());
          setInvestments(uniqueProjects);
        } else {
          setInvestments([]);
        }
      } catch (error) {
        console.error('Error fetching investments:', error);
        setInvestments([]);
      }
    }
    fetchInvestments();
  }, [i18n.language]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % investments.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + investments.length) % investments.length);
  };

  if (!investments.length) return <div>{t('loadingInvestments')}</div>;

  const visibleInvestments = investments.length > 2 ? [
    investments[currentSlide],
    investments[(currentSlide + 1) % investments.length],
    investments[(currentSlide + 2) % investments.length],
  ] : investments;

  return (
    <div className="relative mb-16">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="md:hidden">
            <InvestmentCard key={investments[currentSlide]._id} {...investments[currentSlide]} />
          </div>
          <div className="hidden md:flex gap-6 overflow-hidden">
            {visibleInvestments.map((investment, index) => (
              <div key={investment._id} className="w-1/3 flex-shrink-0">
                <InvestmentCard {...investment} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {investments.map((_, index) => (
            <button
              key={`dot-${index}`}
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
        disabled={investments.length <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg"
        onClick={nextSlide}
        disabled={investments.length <= 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="flex justify-center mt-6">
        <Link to="/investment/all">
          <Button variant="link" className="text-black-600 hover:text-blue-600 bg-white px-4 py-2 rounded-full shadow-md">
            {t('viewAllProjects')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
