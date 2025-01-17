import { MapPin } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function InvestmentDetails({
  title,
  location,
  totalPayment,
  roi,
  raisedAmount,
  raisedPercentage,
  investmentOptions
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{location}</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Total Payment:</div>
              <div className="text-2xl font-bold">${totalPayment}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">ROI:</div>
              <div className="text-2xl font-bold">{roi}%</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Raised Amount</span>
              <span className="text-sm font-medium">${raisedAmount} ({raisedPercentage}%)</span>
            </div>
            <Progress value={raisedPercentage} className="h-2" />
          </div>

          <div>
            <div className="text-sm text-gray-500 mb-3">Let's Start Investing:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {investmentOptions.map((amount, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Invest Now
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

