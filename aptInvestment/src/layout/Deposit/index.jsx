"use client"

import { useState, useCallback, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload,ArrowLeft} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DepositPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [investmentOptions, setInvestmentOptions] = useState([])
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [amount, setAmount] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch("https://atpinvestment.onrender.com/api/project/6793a709831479e739e62c94")
        if (!response.ok) {
          throw new Error("Failed to fetch project details")
        }
        const data = await response.json()
        console.log("API response:", data)

        if (data.project && data.project.investmentOptions && Array.isArray(data.project.investmentOptions)) {
          setInvestmentOptions(data.project.investmentOptions)
          console.log("Investment options set:", data.project.investmentOptions)

          const amountFromState = location.state?.amount?.toString()
          if (amountFromState && data.project.investmentOptions.includes(Number(amountFromState))) {
            setAmount(amountFromState)
          } else if (data.project.investmentOptions.length > 0) {
            setAmount(data.project.investmentOptions[0].toString())
          }
        } else {
          throw new Error("Invalid investment options data")
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching project details:", error)
        setErrorMessage("Failed to load investment options")
        setIsLoading(false)
      }
    }

    fetchProjectDetails()
  }, [location.state])

  useEffect(() => {
    console.log("Current amount:", amount)
  }, [amount])

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) return setErrorMessage("No file selected. Please choose a file.")

    const validTypes = ["image/png", "image/jpg", "image/jpeg"]
    if (!validTypes.includes(selectedFile.type))
      return setErrorMessage("Invalid file type. Only PNG and JPG are allowed.")

    if (selectedFile.size > 5 * 1024 * 1024)
      return setErrorMessage("File size exceeds 5MB. Please select a smaller file.")

    setFile(selectedFile)
    setErrorMessage("")

    let progress = 0
    const interval = setInterval(() => {
      progress += 20
      setUploadProgress(progress)
      if (progress >= 100) clearInterval(interval)
    }, 200)
  }, [])

  const handleConfirmDeposit = useCallback(async () => {
    if (!amount) return setErrorMessage("Please select an amount to deposit.")
    if (!file) return setErrorMessage("Please upload a screenshot of your deposit.")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const uploadResponse = await fetch("https://api.imgbb.com/1/upload?key=YOUR_API_KEY", {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadResponse.json()
      if (!uploadResponse.ok) throw new Error(uploadData.error.message || "File upload failed.")

      const response = await fetch("https://atpinvestment.onrender.com/api/deposit?file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number.parseFloat(amount), url: uploadData.data.url }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Deposit request failed.")

      alert(`Deposit of $${data.deposit.amount} confirmed!`)
      navigate("/admin")
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [amount, file, navigate])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
     
        <Card className="shadow-lg">
        
            <CardTitle className="text-3xl font-semibold text-left ml-12 mt-12 text-black">Deposit Now</CardTitle>
          <CardContent>
            <div className="space-y-8">
              
                
                  <CardTitle className="text-xl font-semibold flex ml-6 mt-4 items-center">
                  
                    Bank Details
                  </CardTitle>
                
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm font-medium text-muted-foreground">Bank Name</div>
                    <div className="text-sm">Jemena Bank LTD</div>
                    <div className="text-sm font-medium text-muted-foreground">Account Number</div>
                    <div className="text-sm font-mono" title="Feb 495803948t935t76042023">
                      Feb 495803948t935t76042023
                    </div>
                  </div>
                </CardContent>
              

              <div className="space-y-4 ml-6">
                <Label htmlFor="amount-select" className="text-lg font-semibold flex items-center">
                 
                  Deposit Amount (USD) <span className="text-red-500 ml-1">*</span>
                </Label>
                {isLoading ? (
                  <div className="text-muted-foreground">Loading investment options...</div>
                ) : investmentOptions.length > 0 ? (
                  <Select
                    value={amount}
                    onValueChange={(value) => {
                      console.log("Selected value:", value)
                      setAmount(value)
                    }}
                    defaultValue={investmentOptions[0]?.toString()}
                  >
                    <SelectTrigger id="amount-select" className="w-full">
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>
                          ${option.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-muted-foreground">No investment options available</div>
                )}
              </div>

              <div className="space-y-4 ml-6">
                <Label className="text-lg font-semibold flex items-center ">
                  
                  Attach a Screenshot
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <Input
                    type="file"
                    className="file-input hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept="image/png, image/jpg, image/jpeg"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer text-center block">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">Click to upload</span>
                    <span className="mt-1 block text-sm text-gray-500">or drag and drop</span>
                    <span className="mt-1 block text-xs text-gray-500">PNG, JPG (Max: 5MB)</span>
                  </Label>
                </div>

                {file && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{file.name}</span>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setFile(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}
              </div>

              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => navigate("/investments/details/:id")}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmDeposit}>Confirm Deposit</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

