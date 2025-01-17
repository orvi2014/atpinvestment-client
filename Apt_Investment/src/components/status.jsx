import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { value: '12K+', label: t('stats.investments') },
    { value: '10K+', label: t('stats.international') },
    { value: '12K+', label: t('stats.financial') },
  ];

  return (
    <div className="mt-12 grid grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-2">
          <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
      <div className="col-span-3 mt-4">
        <p className="text-sm text-muted-foreground">{t('stats.investmentStart')}</p>
      </div>
    </div>
  );
}

