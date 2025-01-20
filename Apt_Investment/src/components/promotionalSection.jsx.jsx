import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PromotionalSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 p-8 md:p-16">
      <div className="w-full mx-auto space-y-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
          This is your very own headline to describe your product
        </h1>

        <Card className="w-full bg-white shadow-lg ml-20">
          <CardContent className="p-6 space-y-4">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-yellow-400 " />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">This is a headline</h2>

            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisc sed do eiusmod tempor incididunt ut labore et do
            </p>

            <p className="font-medium text-gray-900">Lorem esum</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-blue-500 hover:bg-blue-600">Explore</Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Invest</Button>
              <Button className="bg-green-500 hover:bg-green-600">Get Profit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

