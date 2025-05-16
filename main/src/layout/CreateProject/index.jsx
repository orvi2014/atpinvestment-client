"use client"

import { useState } from "react"
import "./index.css"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { showToast } from "@/components/utility/showToaster"

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    targetAchieved: "",
    location: "",
    profitRatio: "", // This will be mapped to "roi" in the API request
    raisedAmount: "",
    investmentOptions: "",
    defaultImage: "",
    galleryImages: "",
  })

  const [errors, setErrors] = useState({})
  const [apiErrors, setApiErrors] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        return !value.trim() ? "Title is required" : ""
      case "price":
        return !value.trim() ? "Price is required" : ""
      case "description":
        return value.trim().length < 100 ? "Description must be at least 100 characters long" : ""
      case "targetAchieved":
        return isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100
          ? "Please enter a valid target percentage between 0 and 100"
          : ""
      case "location":
        return !value.trim() ? "Location is required" : ""
      case "profitRatio": // Validating profit ratio as ROI
        return isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100
          ? "Please enter a valid ROI percentage between 0 and 100"
          : ""
      case "raisedAmount":
        return isNaN(Number(value)) ? "Please enter a valid amount" : ""
      case "investmentOptions":
        return !value.split(",").every(opt => !isNaN(Number(opt.trim())))
          ? "Please enter valid numbers separated by commas"
          : ""
      case "defaultImage":
      case "galleryImages":
        const urls = value.split(",").map(url => url.trim())
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/ 
        return !urls.every(url => urlRegex.test(url))
          ? "Please enter valid URLs separated by commas"
          : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiErrors({})

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key])
      if (error) acc[key] = error
      return acc
    }, {})

    console.log("Validation Errors:", newErrors)  // Added logging for validation errors

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      ...formData,
      targetAchieved: Number(formData.targetAchieved),
      roi: Number(formData.profitRatio), // Mapping profitRatio to ROI
      raisedAmount: Number(formData.raisedAmount),
      investmentOptions: formData.investmentOptions.split(",").map(Number),
      galleryImages: formData.galleryImages.split(","),
    }

    try {
      const response = await fetch("https://api.atpinvestment.com.bd/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        showToast("Project created successfully", "success")
        setFormData({
          title: "",
          price: "",
          description: "",
          targetAchieved: "",
          location: "",
          profitRatio: "",
          raisedAmount: "",
          investmentOptions: "",
          defaultImage: "",
          galleryImages: "",
        })
        setErrors({})
        setApiErrors({})

           // Redirect to the admin dashboard after successful project creation
           router.push("/admin/dashboard")
      } else {
        showToast(data.message || "Something went wrong", "error")
        setApiErrors(data.errors || { general: "Something went wrong" })
      }
    } catch (error) {
      showToast("Failed to create project. Please try again.", "error")
      setApiErrors({ general: "Failed to create project. Please try again." })
    }
  }

  return (
    <div className="w-full min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="header">
            <h2>Create Project</h2>
          </div>
          {apiErrors.general && <p className="text-red-500 text-sm mb-4">{apiErrors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="capitalize block mb-1">
                  {key === "profitRatio" ? "Profit Ratio" : key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {key === "description" ? (
                  <Textarea id={key} name={key} value={formData[key]} onChange={handleChange} />
                ) : (
                  <Input id={key} name={key} value={formData[key]} onChange={handleChange} />
                )}
                {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
              </div>
            ))}
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
