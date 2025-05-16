import React from 'react';
import { useTranslation } from 'react-i18next';
import  Steps  from '../../components/steps';
import InvestmentCarousel from '../../components/investmentCarousel';
import Hero from '../../components/hero';
import Status from '../../components/status';
import { Button } from "@/components/ui/button";
import GroupImage from '../../assets/image/group.png'; 
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
            <div className="relative aspect-[4/3] hidden lg:block">
              <img
                src={GroupImage} 
                alt="Investment Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>
  
        <section className=" mx-auto px-4 py-16 bg-white mb-12 mt-20">
          <Steps />
        </section>
  
        <section className="ongoing-project">
          <h2 className="text-3xl font-bold text-center mb-8">{t("ongoingInvestments")}</h2>
          <InvestmentCarousel />
        </section>
      </div>
    )
  }