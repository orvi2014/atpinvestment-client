import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import './index.css';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    targetAchieved: "",
    location: "",
    roi: "",
    raisedAmount: "",
    investmentOptions: "",
    defaultImage: "",
    galleryImages: ""
  });

  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        return !value.trim() ? "Title is required" : "";
      
      case 'price':
        return !value || isNaN(value) ? "Please enter a valid price" : "";
      
      case 'description':
        return !value.trim() ? "Description is required and must be greater than 100 characters" : "";
      
      case 'targetAchieved':
        return !value || isNaN(value) ? "Please enter a valid target percentage and it should be between 0 and 100" : "";
      
      case 'location':
        return !value.trim() ? "Location is required" : "";
      
      case 'roi':
        return !value || isNaN(value) ? "Please enter a valid ROI percentage, ROI should be between 0 and 100" : "";
      
      case 'raisedAmount':
        return !value || isNaN(value) ? "Please enter a valid amount" : "";
      
      case 'investmentOptions':
        if (!value) return "Investment options are required";
        const options = value.split(",");
        return !options.every(opt => !isNaN(opt.trim())) 
          ? "Please enter valid numbers separated by commas" 
          : "";
      
      case 'defaultImage':
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return !urlRegex.test(value) ? "Please enter a valid URL" : "";
      
      case 'galleryImages':
        if (!value) return "";
        const urls = value.split(",");
        const urlRegexGallery = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        return !urls.every(url => urlRegexGallery.test(url.trim())) 
          ? "Please enter valid URLs separated by commas" 
          : "";
      
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field immediately
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset any previous API errors
    setApiErrors({});
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      ...formData,
      targetAchieved: Number(formData.targetAchieved),
      roi: Number(formData.roi),
      raisedAmount: Number(formData.raisedAmount),
      investmentOptions: formData.investmentOptions.split(",").map(Number),
      galleryImages: formData.galleryImages.split(",")
    };

    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Project created successfully");
        setFormData({
          title: "",
          price: "",
          description: "",
          targetAchieved: "",
          location: "",
          roi: "",
          raisedAmount: "",
          investmentOptions: "",
          defaultImage: "",
          galleryImages: ""
        });
        setErrors({});
        setApiErrors({});
      } else {
        // Handle specific API errors
        if (data.errors) {
          // If the API returns field-specific errors
          setApiErrors(data.errors);
        } else if (data.message) {
          // If the API returns a general error message
          setApiErrors({ general: data.message });
        } else {
          setApiErrors({ general: "Something went wrong" });
        }
      }
    } catch (error) {
      setApiErrors({ general: "Failed to create project. Please try again." });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardContent>
        <h2 className="header">Create Project</h2>
        {apiErrors.general && (
          <p className="text-red-500 text-sm mb-4">{apiErrors.general}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className={errors.title || apiErrors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            {apiErrors.title && <p className="text-red-500 text-sm mt-1">{apiErrors.title}</p>}
          </div>

          <div>
            <Label>Price</Label>
            <Input 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              className={errors.price || apiErrors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            {apiErrors.price && <p className="text-red-500 text-sm mt-1">{apiErrors.price}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className={errors.description || apiErrors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            {apiErrors.description && <p className="text-red-500 text-sm mt-1">{apiErrors.description}</p>}
          </div>

          <div>
            <Label>Target Achieved (%)</Label>
            <Input 
              name="targetAchieved" 
              value={formData.targetAchieved} 
              onChange={handleChange} 
              className={errors.targetAchieved || apiErrors.targetAchieved ? "border-red-500" : ""}
            />
            {errors.targetAchieved && <p className="text-red-500 text-sm mt-1">{errors.targetAchieved}</p>}
            {apiErrors.targetAchieved && <p className="text-red-500 text-sm mt-1">{apiErrors.targetAchieved}</p>}
          </div>

          <div>
            <Label>Location</Label>
            <Input 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className={errors.location || apiErrors.location ? "border-red-500" : ""}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            {apiErrors.location && <p className="text-red-500 text-sm mt-1">{apiErrors.location}</p>}
          </div>

          <div>
            <Label>ROI (%)</Label>
            <Input 
              name="roi" 
              value={formData.roi} 
              onChange={handleChange} 
              className={errors.roi || apiErrors.roi ? "border-red-500" : ""}
            />
            {errors.roi && <p className="text-red-500 text-sm mt-1">{errors.roi}</p>}
            {apiErrors.roi && <p className="text-red-500 text-sm mt-1">{apiErrors.roi}</p>}
          </div>

          <div>
            <Label>Raised Amount</Label>
            <Input 
              name="raisedAmount" 
              value={formData.raisedAmount} 
              onChange={handleChange} 
              className={errors.raisedAmount || apiErrors.raisedAmount ? "border-red-500" : ""}
            />
            {errors.raisedAmount && <p className="text-red-500 text-sm mt-1">{errors.raisedAmount}</p>}
            {apiErrors.raisedAmount && <p className="text-red-500 text-sm mt-1">{apiErrors.raisedAmount}</p>}
          </div>

          <div>
            <Label>Investment Options (comma-separated)</Label>
            <Input 
              name="investmentOptions" 
              value={formData.investmentOptions} 
              onChange={handleChange} 
              className={errors.investmentOptions || apiErrors.investmentOptions ? "border-red-500" : ""}
            />
            {errors.investmentOptions && <p className="text-red-500 text-sm mt-1">{errors.investmentOptions}</p>}
            {apiErrors.investmentOptions && <p className="text-red-500 text-sm mt-1">{apiErrors.investmentOptions}</p>}
          </div>

          <div>
            <Label>Default Image URL</Label>
            <Input 
              name="defaultImage" 
              value={formData.defaultImage} 
              onChange={handleChange} 
              className={errors.defaultImage || apiErrors.defaultImage ? "border-red-500" : ""}
            />
            {errors.defaultImage && <p className="text-red-500 text-sm mt-1">{errors.defaultImage}</p>}
            {apiErrors.defaultImage && <p className="text-red-500 text-sm mt-1">{apiErrors.defaultImage}</p>}
          </div>

          <div>
            <Label>Gallery Images (comma-separated URLs)</Label>
            <Input 
              name="galleryImages" 
              value={formData.galleryImages} 
              onChange={handleChange} 
              className={errors.galleryImages || apiErrors.galleryImages ? "border-red-500" : ""}
            />
            {errors.galleryImages && <p className="text-red-500 text-sm mt-1">{errors.galleryImages}</p>}
            {apiErrors.galleryImages && <p className="text-red-500 text-sm mt-1">{apiErrors.galleryImages}</p>}
          </div>

          <Button type="submit" className="w-full">Create Project</Button>
        </form>
      </CardContent>
    </Card>
  );
}
