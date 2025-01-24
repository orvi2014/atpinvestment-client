import React from 'react';
import { useTranslation } from 'react-i18next';
import { Steps } from '../../components/steps';
import InvestmentCarousel from '../../components/investmentCarousel';
import Hero from '../../components/Hero';
import Status from '../../components/Status';
import { Button } from "@/components/ui/button";
import GroupImage from '@/assets/Image/Group.png'; // Import the image properly
import "./index.css";



export default function HomeInfo() {
    const { t } = useTranslation()
  
    return (
      <div className="w-full">
        <section className="home-section ">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Hero />
              <Status />
            </div>
            <div className="relative aspect-[4/3]">
              <img
                src={GroupImage} 
                alt="Investment Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>
  
        <section className=" mx-auto px-4 py-16 bg-white mb-12 mt-20">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">{t("howToInvest")}</h2>
            <p className="text-gray-600">{t("investmentStepsDescription")}</p>
          </div>
          <Steps />
        </section>
  
        <section className="ongoing-project">
          <h2 className="text-3xl font-bold text-center mb-8">{t("ongoingInvestments")}</h2>
          <InvestmentCarousel />
        </section>
      </div>
    )
  }
  
  
