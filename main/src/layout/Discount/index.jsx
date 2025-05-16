"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Form validation schema
const formSchema = z.object({
  discountName: z.string().min(2, {
    message: "Discount name must be at least 2 characters.",
  }),
  redirectionUrl: z.string().url({
    message: "Please enter a valid URL.",
  }),
  photo: z.any().optional(),
})

export default function DiscountForm() {
  const [photo, setPhoto] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discountName: "",
      redirectionUrl: "",
      photo: undefined,
    },
  })

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  // Handle file upload
  const handleFileUpload = (file) => {
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setPhoto(file)
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 100)
    }
  }

  // Remove uploaded file
  const handleRemoveFile = () => {
    setPhoto(null)
    setUploadProgress(0)
    form.setValue("photo", undefined)
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Form submission
  const onSubmit = (values) => {
    const formData = new FormData()
    formData.append("discountName", values.discountName)
    formData.append("redirectionUrl", values.redirectionUrl)
    if (photo) {
      formData.append("photo", photo)
    }
    console.log("Form submitted:", values)
  }

  return (
    <div className="dis container mx-auto px-4 py-8">

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Discount</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="discountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer Sale 2023" {...field} />
                    </FormControl>
                    <FormDescription>Enter a name for your discount campaign.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Photo</FormLabel>
                    <FormControl>
                      <div
                        className={`relative border-2 border-dashed rounded-lg ${
                          isDragging ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Input
                          type="file"
                          accept="image/png,image/jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(file)
                            field.onChange(e)
                          }}
                          className="hidden"
                          id="photo-upload"
                        />

                        {!photo ? (
                          <label
                            htmlFor="photo-upload"
                            className="flex flex-col items-center justify-center py-8 cursor-pointer"
                          >
                            <Upload className="h-8 w-8 mb-3 text-gray-500" />
                            <div className="text-sm text-center">
                              <span className="text-primary">Click to upload</span>
                              {" or drag and drop"}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">png, jpg</p>
                          </label>
                        ) : (
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="text-sm">
                                  <p className="font-medium">{photo.name}</p>
                                  <p className="text-gray-500 text-xs">
                                    {formatFileSize(photo.size)} · {formatDate(photo.lastModified)}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <Progress value={uploadProgress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>Upload an image for your discount (PNG, JPG).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="redirectionUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Redirection URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/sale" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the URL where customers will be redirected after clicking the discount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Discount
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

