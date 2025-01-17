import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from 'lucide-react';

export function Steps() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      title: t('step1Title'),
      description: t('step1Description')
    },
    {
      number: 2,
      title: t('step2Title'),
      description: t('step2Description')
    },
    {
      number: 3,
      title: t('step3Title'),
      description: t('step3Description')
    },
    {
      number: 4,
      title: t('step4Title'),
      description: t('step4Description')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step, index) => (
        <Card key={step.number} className="relative">
          <CardContent className="p-6">
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </CardContent>
          {index < steps.length - 1 && (
            <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden lg:block">
              <ChevronRight className="text-gray-400" size={24} />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

