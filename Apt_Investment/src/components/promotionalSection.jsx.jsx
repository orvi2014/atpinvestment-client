import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function PromotionalSection() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 p-8 md:p-16">
      <div className="w-full mx-auto space-y-24">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
          {t("promotional.headline")}
        </h1>

        {/* Card Section */}
        <Card className="w-full bg-white shadow-lg ml-20">
          <CardContent className="p-6 space-y-4">
            {/* Icon */}
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-yellow-400 " />
            </div>

            {/* Subheadline */}
            <h2 className="text-xl font-semibold text-gray-900">{t("promotional.subheadline")}</h2>

            {/* Description */}
            <p className="text-gray-500">{t("promotional.description")}</p>

            {/* Highlighted Text */}
            <p className="font-medium text-gray-900">{t("promotional.highlight")}</p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-blue-500 hover:bg-blue-600">{t("promotional.buttons.explore")}</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">{t("promotional.buttons.invest")}</Button>
              <Button className="bg-green-500 hover:bg-green-600">{t("promotional.buttons.profit")}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
