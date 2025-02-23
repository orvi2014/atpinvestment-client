import { MapPin } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function InvestmentDetails({ title, location, totalPayment, roi, raisedAmount, raisedPercentage }) {
  // Ensure price is numeric
  const formattedPrice = Number.parseInt(totalPayment.replace(/[^0-9]/g, "")) || 0

  return (
    <div className="space-y-6 px-4 md:px-8">
      {/* Title and Location */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center text-gray-500 mt-8">
          <MapPin className="h-5 w-6 mr-1 text-blue-500" />
          <span className="text-sm">{location}</span>
        </div>
      </div>

      {/* Total Payment and ROI */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mt-10">
          <div className="text-l font-semibold text-gray-500">Total Payment:</div>
          <div className="text-2xl font-semibold">${formattedPrice.toLocaleString()}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-l font-semibold text-gray-500">ROI:</div>
          <div className="text-xl font-semibold">{roi}%</div>
        </div>
      </div>

      {/* Raised Amount and Progress Bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-l text-gray-500">Raised Amount</span>
          <span className="text-l font-medium">
            ${raisedAmount.toLocaleString()} ({raisedPercentage}%)
          </span>
        </div>
        <Progress value={raisedPercentage} className="h-2 bg-blue-200" indicatorClassName="bg-blue-500" />
      </div>
    </div>
  )
}

