import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"



function InvestmentCard({ _id, defaultImage, title, location, price, description, targetAchieved }) {
  const { t } = useTranslation()

  // Fallback image URL
  const placeholderImage = "/placeholder.svg"

  // Ensure valid default image
  const imageSrc = defaultImage && defaultImage.trim().startsWith("http") ? defaultImage : placeholderImage

  return (
    <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-xl text-gray-900">{title}</h3>
            {location && <p className="text-sm text-gray-500 mt-1">{location}</p>}
          </div>
          <p className="text-xl font-bold text-gray-900">
            {price} <span className="text-sm font-normal text-gray-500">BDT/Unit</span>
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">{t("targetAchieved")}:</span>
              <span className="text-sm font-medium text-gray-600">{targetAchieved}%</span>
            </div>
            <Link to={`/investments/details/${_id}`}>
              <Button variant="outline" size="lg" className="text-blue-600 hover:bg-blue-500 border-blue-500 hover:border-blue-600 hover:text-white rounded-full">
                {t("seeDetails")}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InvestmentCard

