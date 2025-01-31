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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to create project");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardContent>
        <h2 className="header">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label>Price</Label>
            <Input name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Label>Target Achieved (%)</Label>
            <Input name="targetAchieved" value={formData.targetAchieved} onChange={handleChange} required />
          </div>
          <div>
            <Label>Location</Label>
            <Input name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div>
            <Label>ROI (%)</Label>
            <Input name="roi" value={formData.roi} onChange={handleChange} required />
          </div>
          <div>
            <Label>Raised Amount</Label>
            <Input name="raisedAmount" value={formData.raisedAmount} onChange={handleChange} required />
          </div>
          <div>
            <Label>Investment Options (comma-separated)</Label>
            <Input name="investmentOptions" value={formData.investmentOptions} onChange={handleChange} required />
          </div>
          <div>
            <Label>Default Image URL</Label>
            <Input name="defaultImage" value={formData.defaultImage} onChange={handleChange} required />
          </div>
          <div>
            <Label>Gallery Images (comma-separated URLs)</Label>
            <Input name="galleryImages" value={formData.galleryImages} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full">Create Project</Button>
        </form>
      </CardContent>
    </Card>
  );
}
