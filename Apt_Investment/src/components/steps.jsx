import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import "../Layout/HomeInfo/index.css";

export function Steps() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      title: t("step1Title", "Lorem Community"),
      description: t("step1Description", "Unprecedented access to investment projects in the real economy globally"),
    },
    {
      number: 2,
      title: t("step2Title", "Lorem Community"),
      description: t("step2Description", "Unprecedented access to investment projects in the real economy globally"),
    },
    {
      number: 3,
      title: t("step3Title", "Lorem Community"),
      description: t("step3Description", "Unprecedented access to investment projects in the real economy globally"),
    },
    {
      number: 4,
      title: t("step4Title", "Lorem Community"),
      description: t("step4Description", "Unprecedented access to investment projects in the real economy globally"),
    },
  ];

  return (
    <div className="steps-container mx-auto px-4 py-12 mt-24 bg-white w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <Card
            key={step.number}
            className={`relative bg-gray-100 border-0 ${index % 2 === 0 ? "lg:-translate-y-4" : "lg:translate-y-4"} h-[320px] w-full transition-transform hover:-translate-y-1`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-start mt-10 mb-4">
                <span className="text-xl font-semibold text-gray-900 mb-3">{step.number}</span>
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
