// components/Toaster.jsx
import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
          padding: "10px",
        },
        success: {
          style: { background: "#22c55e" },
          iconTheme: { primary: "#fff", secondary: "#22c55e" },
        },
        error: {
          style: { background: "#ef4444" },
          iconTheme: { primary: "#fff", secondary: "#ef4444" },
        },
      }}
    />
  );
};

export default ToastProvider;
