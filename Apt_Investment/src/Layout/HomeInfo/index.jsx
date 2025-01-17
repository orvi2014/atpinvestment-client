import React from 'react';
import { useTranslation } from 'react-i18next';
import { Steps } from '../../components/steps';
import InvestmentCarousel from '../../components/InvestmentCarousel';
import Hero from '../../components/Hero';
import Status from '../../components/Status';
import { Button } from "@/components/ui/button";
import GroupImage from '@/assets/Image/Group.png'; // Import the image properly

export default function Homeinfo() {
    const { t } = useTranslation();

    return (
        <div className="py-8 container mx-auto px-4">
            <section className="mb-16 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-8">
                    <Hero />
                    <Status />
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0">
                    {/* Use img tag to display the image */}
                    <img
                        src={GroupImage}
                        alt="Investment Illustration"
                        className="w-full" // You can style it if necessary
                    />
                </div>
            </section>

            <section className="mb-16 mt-24">
                <h2 className="text-3xl font-bold text-center mb-4">
                    {t('howToInvest')}
                </h2>
                <p className="text-center text-gray-600 mb-8 mt-10">
                    {t('investmentStepsDescription')}
                </p>
                <Steps />
            </section>

            <section className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                    {t('ongoingInvestments')}
                </h2>
                <InvestmentCarousel />
            </section>
        </div>
    );
}
