"use client";

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import "./index.css";

export default function DepositPage() {
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // File Validation and Upload Progress Simulation
  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return setErrorMessage("No file selected. Please choose a file.");

    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!validTypes.includes(selectedFile.type)) 
      return setErrorMessage("Invalid file type. Only PNG and JPG are allowed.");

    if (selectedFile.size > 5 * 1024 * 1024) 
      return setErrorMessage("File size exceeds 5MB. Please select a smaller file.");

    setFile(selectedFile);
    setErrorMessage("");

    // Simulate Upload Progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  }, []);

  // Handle Deposit Submission
  const handleConfirmDeposit = useCallback(async () => {
    if (!amount) return setErrorMessage("Please select an amount to deposit.");
    if (!file) return setErrorMessage("Please upload a screenshot of your deposit.");

    try {
      // Upload Screenshot to Image Hosting
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("https://api.imgbb.com/1/upload?key=YOUR_API_KEY", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadData.error.message || "File upload failed.");

      // Send Deposit Request
      const response = await fetch("https://atpinvestment.onrender.com/api/deposit?file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount), url: uploadData.data.url }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Deposit request failed.");

      alert(`Deposit of $${data.deposit.amount} confirmed!`);
      navigate("/admin");

    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [amount, file, navigate]);

  return (
    <div className="deposit-page">
      <div className="deposit-container">
        <h1 className="page-title">Deposit Now</h1>

        <div className="content">
          {/* Bank Details Section */}
          <div className="bank-details">
            <h4 className="section-title">Bank Details</h4>
            <div className="bank-grid">
              <div className="label">Bank Name</div>
              <div className="value">Jemena Bank LTD</div>
              <div className="label">Account Number</div>
              <div className="value" title="Feb 495803948t935t76042023">Feb 495803948t935t76042023</div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="amount-section">
            <Label htmlFor="amount-select" className="amount-label">
              How much do you want to deposit (USD)? <span className="required">*</span>
            </Label>
            <Select value={amount} onValueChange={setAmount}>
              <SelectTrigger id="amount-select" className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30000">30,000</SelectItem>
                <SelectItem value="32000">32,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload Section */}
          <div className="upload-section">
            <Label>Attach a Screenshot</Label>
            <div className="upload-area">
              <Input
                type="file"
                className="file-input"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/png, image/jpg, image/jpeg"
              />
              <Label htmlFor="file-upload" className="upload-label">
                <Upload className="upload-icon" />
                <span className="upload-text">Click to upload</span>
                <span className="upload-subtext">or drag and drop</span>
                <span className="upload-subtext">PNG, JPG (Max: 5MB)</span>
              </Label>
            </div>

            {file && (
              <div className="file-preview">
                <div className="file-info">
                  <span>{file.name}</span>
                  <Button variant="ghost" size="icon" className="remove-file" onClick={() => setFile(null)}>
                    <X className="icon-small" />
                  </Button>
                </div>
                <Progress value={uploadProgress} className="upload-progress" />
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button variant="outline" onClick={() => navigate("/admin")}>Cancel</Button>
            <Button onClick={handleConfirmDeposit}>Confirm Deposit</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
