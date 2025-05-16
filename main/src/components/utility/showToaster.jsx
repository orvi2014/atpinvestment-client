import toast from "react-hot-toast"

const slideInKeyframes = {
  "0%": { transform: "translateX(100%)", opacity: 0 },
  "100%": { transform: "translateX(0)", opacity: 1 },
}

const slideOutKeyframes = {
  "0%": { transform: "translateX(0)", opacity: 1 },
  "100%": { transform: "translateX(100%)", opacity: 0 },
}

export const showToast = (message, type = "success", options = {}) => {
  const defaultStyle = {
    background: type === "success" ? "#0066ff" : "#ef4444",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    maxWidth: "400px",
    animation: `${Object.entries(slideInKeyframes)
      .map(
        ([key, value]) =>
          `${key} { ${Object.entries(value)
            .map(([prop, val]) => `${prop}: ${val}`)
            .join("; ")} }`,
      )
      .join(" ")} 0.3s ease-out forwards`,
  }

  return toast.custom(
    (t) => (
      <div
        className={`toast flex items-center`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          ...defaultStyle,
          ...options.style,
          animation: t.visible
            ? defaultStyle.animation
            : `${Object.entries(slideOutKeyframes)
                .map(
                  ([key, value]) =>
                    `${key} { ${Object.entries(value)
                      .map(([prop, val]) => `${prop}: ${val}`)
                      .join("; ")} }`,
                )
                .join(" ")} 0.3s ease-in forwards`,
        }}
      >
        <div className="flex-1">{message}</div>
        <button onClick={() => toast.dismiss(t.id)} className="ml-4 text-white focus:outline-none" aria-label="Close">
          ✖
        </button>
      </div>
    ),
    {
      duration: 4000,
      position: "bottom-right", // Changed from bottom-left to bottom-right
      ...options,
    },
  )
}

