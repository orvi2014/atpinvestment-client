import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export default function InvestmentCard({ id, image, title, price, description, targetAchieved }) {
  const { t } = useTranslation();

  return (
    <Card className="bg-gray-50 border-0 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="aspect-video mb-4 overflow-hidden rounded-lg">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <p className="text-blue-600 font-bold mb-2">{price}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-sm text-gray-500">{t('targetAchieved')}: {targetAchieved}%</span>
          <Link to={`/investments/details/${id}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 whitespace-nowrap rounded-full w-full sm:w-auto"
            >
              {t('seeDetails')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

