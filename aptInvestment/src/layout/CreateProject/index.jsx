"use client"

import { useState } from "react"
import "./index.css"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"




export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    targetAchieved: "",
    location: "",
    profitRatio: "",
    raisedAmount: "",
    investmentOptions: "",
    duration: "",
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
        return !value || isNaN(Number(value)) ? "Please enter a valid price" : ""
      case "description":
        return value.trim().length < 100 ? "Description must be at least 100 characters long" : ""
      case "targetAchieved":
        const target = Number(value)
        return !value || isNaN(target) || target < 0 || target > 100
          ? "Please enter a valid target percentage between 0 and 100"
          : ""
      case "location":
        return !value.trim() ? "Location is required" : ""
      case "profitRatio":
        const profitRatio = Number(value)
        return !value || isNaN(profitRatio) || profitRatio < 0 || profitRatio > 100
          ? "Please enter a valid Profit Ratio/Year percentage between 0 and 100"
          : ""
      case "raisedAmount":
        return !value || isNaN(Number(value)) ? "Please enter a valid amount" : ""
      case "investmentOptions":
        if (!value) return "Investment options are required"
        const options = value.split(",")
        return !options.every((opt) => !isNaN(Number(opt.trim())))
          ? "Please enter valid numbers separated by commas"
          : ""
      case "duration":
        return !value || isNaN(Number(value)) ? "Please enter a valid duration" : ""
      case "defaultImage":
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
        return !urlRegex.test(value) ? "Please enter a valid URL" : ""
      case "galleryImages":
        if (!value) return ""
        const urls = value.split(",")
        const urlRegexGallery = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
        return !urls.every((url) => urlRegexGallery.test(url.trim()))
          ? "Please enter valid URLs separated by commas"
          : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setApiErrors({})

    const newErrors = {}
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value)
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const payload = {
      ...formData,
      targetAchieved: Number(formData.targetAchieved),
      profitRatio: Number(formData.profitRatio),
      raisedAmount: Number(formData.raisedAmount),
      investmentOptions: formData.investmentOptions.split(",").map(Number),
      duration: Number(formData.duration),
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
        alert("Project created successfully")
        setFormData({
          title: "",
          price: "",
          description: "",
          targetAchieved: "",
          location: "",
          profitRatio: "",
          raisedAmount: "",
          investmentOptions: "",
          duration: "",
          defaultImage: "",
          galleryImages: "",
        })
        setErrors({})
        setApiErrors({})
      } else {
        if (data.errors) {
          setApiErrors(data.errors)
        } else if (data.message) {
          setApiErrors({ general: data.message })
        } else {
          setApiErrors({ general: "Something went wrong" })
        }
      }
    } catch (error) {
      setApiErrors({ general: "Failed to create project. Please try again." })
    }
  }

  const formFields = [
    "title",
    "price",
    "description",
    "targetAchieved",
    "location",
    "profitRatio/Year",
    "raisedAmount",
    "investmentOptions",
    "duration",
    "defaultImage",
    "galleryImages",
  ]

  return (
    <div className="w-full min-h-screen bg-background p-4">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="header">
            <h2>Create Project</h2>
          </div>
          {apiErrors.general && <p className="text-red-500 text-sm mb-4">{apiErrors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="capitalize block mb-1">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {key === "description" ? (
                  <Textarea id={key} name={key} value={formData[key]} onChange={handleChange} />
                ) : (
                  <Input id={key} name={key} value={formData[key]} onChange={handleChange} />
                )}
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
