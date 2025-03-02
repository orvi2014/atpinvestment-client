// utils/toast.js
import toast from "react-hot-toast";

export const showToast = (message, type = "success") => {
  toast.custom(
    (t) => (
      <div
        className={`toast flex items-center text-white px-4 py-3 rounded shadow-md ${type === "success" ? "bg-blue-500" : "bg-red-500"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="flex-1">{message}</div>
        <button onClick={() => toast.dismiss(t.id)} className="ml-4 text-white focus:outline-none" aria-label="Close">
          ✖
        </button>
      </div>
    ),
    { duration: 3000 }
  );
};
