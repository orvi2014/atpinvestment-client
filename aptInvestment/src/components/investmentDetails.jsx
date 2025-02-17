import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export default function InvestmentDetails({
  title,
  location,
  totalPayment,
  roi,
  raisedAmount,
  raisedPercentage,
  investmentOptions,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Ensure price is numeric
  const formattedPrice = Number.parseInt(totalPayment.replace(/[^0-9]/g, "")) || 0;

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

      {/* Investment Options */}
      <div>
        <div className="text-l text-gray-500 mb-3">Let's Start Investing:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {investmentOptions.map((amount, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setSelectedOption(selectedOption === index ? null : index)}
              className={`w-full text-sm font-normal ${
                selectedOption === index ? "bg-blue-500 text-white border-blue-500" : "hover:bg-blue-50 hover:border-blue-500"
              }`}
            >
              ${amount.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>

      {/* Deposit Button */}
      <Button 
        className="w-full sm:w-40 bg-blue-500 hover:bg-blue-600 text-white mx-auto text-sm py-2 rounded-[20px]"
        disabled={selectedOption === null}
      >
        <Link 
          to="/deposite" 
          state={{ amount: selectedOption !== null ? investmentOptions[selectedOption] : null }}
        >
          Deposit Now
        </Link>
      </Button>
    </div>
  );
}
