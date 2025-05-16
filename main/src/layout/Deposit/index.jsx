"use client"

import { useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload, ChevronLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export default function DepositPage() {
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [amount, setAmount] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const investmentOptions = [50, 100, 500, 1000] // Mock investment options

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

  const handleDeposit = async () => {
    if (!amount || !file) {
      setErrorMessage("Please select an amount and upload a screenshot.");
      return;
    }
  
    setLoading(true);
    const fileUrl = "https://example.com/assets/image/Frame2085667178.png"; // Replace with actual upload logic
    const token = localStorage.getItem("token"); // Get the stored token
  
    try {
      const response = await fetch("https://api.atpinvestment.com.bd/api/deposit?file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Use the stored token
        },
        body: JSON.stringify({
          amount: parseInt(amount),
          url: fileUrl,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Deposit successful!");
        navigate("/");
      } else {
        setErrorMessage(data.message || "Deposit failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center text-sm mb-8">
        <ChevronLeft className="back-button" />
      </Link>
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardTitle className="text-3xl font-semibold text-left ml-12 mt-12 text-black">Deposit Now</CardTitle>
          <CardContent>
            <div className="space-y-8">
              <CardTitle className="text-xl font-semibold flex ml-6 mt-4 items-center">Bank Details</CardTitle>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium text-muted-foreground">Bank Name</div>
                  <div className="text-sm">Jemena Bank LTD</div>
                  <div className="text-sm font-medium text-muted-foreground">Account Number</div>
                  <div className="text-sm font-mono">Feb 495803948t935t76042023</div>
                </div>
              </CardContent>

              <div className="space-y-4 ml-6">
                <Label htmlFor="amount-select" className="text-lg font-semibold">Deposit Amount (USD)</Label>
                <Select value={amount} onValueChange={setAmount}>
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
              </div>

              <div className="space-y-4 ml-6">
                <Label className="text-lg font-semibold">Attach a Screenshot</Label>
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
                <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
                <Button onClick={handleDeposit} disabled={loading}>{loading ? "Processing..." : "Confirm Deposit"}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
