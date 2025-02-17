import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, TrendingUp } from "lucide-react"

const PromotionalSection = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-16 flex flex-col justify-center items-start text-left overflow-hidden">
      <div className="max-w-4xl">
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6 animate-fade-in-down w-full whitespace-nowrap">
  {t("promotional.headline")}
</h2>

        <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 font-semibold mb-4 animate-fade-in-left">
          {t("promotional.lines.line1")}
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 font-semibold mb-4  animate-fade-in-left delay-150">
          {t("promotional.lines.line2")}
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl text-blue-100 font-semibold mb-8  animate-fade-in-left delay-300">
          {t("promotional.lines.line3")}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <div className="animate-fade-in-up delay-450">
            <Button
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-5 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              variant="outline"
            >
              {t("promotional.buttons.explore")}
              
            </Button>
          </div>
          <div className="animate-fade-in-up delay-600">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              variant="default"
            >
              {t("promotional.buttons.invest")}
           
            </Button>
          </div>
          <div className="animate-fade-in-up delay-750">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              variant="default"
            >
              {t("promotional.buttons.profit")}
             
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromotionalSection

