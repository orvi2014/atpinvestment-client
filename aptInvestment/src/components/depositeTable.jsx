"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function DepositTable() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedDepositId, setSelectedDepositId] = useState(null);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const response = await fetch("https://atpinvestment.onrender.com/api/deposit");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch deposits");
      }

      setDeposits(data.deposits);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (depositId, status, adminRemarks = null) => {
    try {
      const body = adminRemarks ? { status, adminRemarks } : { status };

      const response = await fetch(`https://atpinvestment.onrender.com/api/deposit/${depositId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update deposit status");
      }

      // Update state to reflect the new status
      setDeposits((prevDeposits) =>
        prevDeposits.map((deposit) =>
          deposit._id === depositId ? { ...deposit, status, adminRemarks } : deposit
        )
      );

      alert(`Deposit status updated to ${status}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRejectClick = (depositId) => {
    setSelectedDepositId(depositId);
    setShowRejectModal(true);
  };

  const confirmRejection = () => {
    if (!rejectReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    handleStatusUpdate(selectedDepositId, "rejected", rejectReason);
    setShowRejectModal(false);
    setRejectReason("");
  };

  if (loading) return <p className="text-center text-gray-500">Loading deposits...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Screenshot</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Admin Remarks</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit, index) => (
            <tr key={deposit._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
              <td className="px-6 py-4 whitespace-nowrap">{deposit.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">${deposit.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    deposit.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : deposit.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {deposit.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={deposit.screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-900"
                >
                  View Screenshot
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(deposit.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {deposit.adminRemarks ? deposit.adminRemarks : "--"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {deposit.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleStatusUpdate(deposit._id, "approved")}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRejectClick(deposit._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rejection Popup */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Reject Deposit</h2>
            <label className="block text-gray-700 mb-2">Enter reason for rejection:</label>
            <textarea
              className="w-full border rounded p-2"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason for rejection..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setShowRejectModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                Cancel
              </Button>
              <Button onClick={confirmRejection} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
