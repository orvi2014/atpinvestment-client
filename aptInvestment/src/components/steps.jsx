import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ClockAlert, ChartNoAxesCombined } from "lucide-react"; // Import icons

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-yellow-500" />, 
      title: t("shariahFirstTitle"),
      description: t("shariahFirstDescription"),
    },
    {
      icon: <ClockAlert className="h-8 w-8 text-green-500" />,
      title: t("hassleFreeTitle"),
      description: t("hassleFreeDescription"),
    },
    {
      icon: <ChartNoAxesCombined className="h-8 w-8 text-blue-500" />,
      title: t("beatsInflationTitle"),
      description: t("beatsInflationDescription"),
    },
  ];

  return (
    <div className="mx-auto px-4 py-12 mt-[5px] bg-white w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 bg-transparent shadow-none">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="mb-6 flex items-center space-x-3">
                {feature.icon} {/* Render SVG icon */}
                
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
