"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save, PlusCircle, RefreshCw } from "lucide-react"
import { showToast } from "@/components/utility/showtoaster" // Import showToast function

export default function BankDetails() {
  const [bankInfo, setBankInfo] = useState(null)
  const [instruction, setInstruction] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBankDetails()
  }, [])

  const fetchBankDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/bank")
      const data = await response.json()
      if (response.ok) {
        setBankInfo(data.bankInfo)
        setInstruction(data.bankInfo.instruction)
      } else {
        throw new Error(data.message || "Failed to fetch bank details")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (action) => {
    setLoading(true)
    try {
      const url =
        action === "add"
          ? "https://atpinvestment.onrender.com/api/bank"
          : `https://atpinvestment.onrender.com/api/bank/${bankInfo._id}`
      const method = action === "add" ? "POST" : "PUT"
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instruction }),
      })
      const data = await response.json()
      if (response.ok) {
        showToast(data.message, "Success") // Show success toast
        fetchBankDetails() // Refresh bank details
      } else {
        throw new Error(data.message || `Failed to ${action} bank details`)
      }
    } catch (err) {
      setError(err.message)
      showToast(err.message, "error") // Show error toast
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="text-center text-red-500 p-4">
          <p>Error: {error}</p>
          <Button onClick={fetchBankDetails} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-600">Bank Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {bankInfo && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Current Bank Information:</h3>
            <p className="text-gray-700">{bankInfo.instruction}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: {new Date(bankInfo.updatedAt).toLocaleString()}</p>
          </div>
        )}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instruction" className="text-sm font-medium text-gray-700">
              {bankInfo ? "Update" : "Add"} Bank Instruction
            </Label>
            <Input
              id="instruction"
              type="text"
              placeholder="Enter bank instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => handleSubmit("add")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center space-x-2"
          disabled={loading}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add</span>
        </Button>
        <Button
          onClick={() => handleSubmit("update")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center space-x-2"
          disabled={loading || !bankInfo}
        >
          <Save className="h-4 w-4" />
          <span>Update</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
