import { Toaster } from "react-hot-toast"

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0066ff",
          color: "#fff",
          borderRadius: "4px",
          padding: "16px 24px",
          maxWidth: "400px",
          width: "auto",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        success: {
          style: { background: "#0066ff" },
          iconTheme: { primary: "#fff", secondary: "#0066ff" },
        },
        error: {
          style: { background: "#ef4444" },
          iconTheme: { primary: "#fff", secondary: "#ef4444" },
        },
      }}
      gutter={8}
      containerStyle={{
        bottom: 40,
        left: 20,
      }}
    />
  )
}

export default ToastProvider

