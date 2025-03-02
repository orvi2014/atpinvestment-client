"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function DepositTable() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState("");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update deposit status");
      }

      setDeposits((prevDeposits) =>
        prevDeposits.map((deposit) =>
          deposit._id === depositId ? { ...deposit, status, adminRemarks } : deposit
        )
      );
      setShowConfirmModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApproveClick = (depositId) => {
    setSelectedDepositId(depositId);
    setModalType("approve");
    setShowConfirmModal(true);
  };

  const handleRejectClick = (depositId) => {
    setSelectedDepositId(depositId);
    setModalType("reject");
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    if (modalType === "approve") {
      handleStatusUpdate(selectedDepositId, "approved");
    } else if (modalType === "reject" && rejectReason.trim()) {
      handleStatusUpdate(selectedDepositId, "rejected", rejectReason);
      setRejectReason("");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading deposits...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left">User ID</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Screenshot</th>
            <th className="px-6 py-3 text-left">Created At</th>
            <th className="px-6 py-3 text-left">Admin Remarks</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit._id}>
              <td className="px-6 py-4">{deposit.userId}</td>
              <td className="px-6 py-4">${deposit.amount}</td>
              <td className="px-6 py-4">{deposit.status}</td>
              <td className="px-6 py-4">
                <a href={deposit.screenshotUrl} target="_blank" className="text-blue-600">View Screenshot</a>
              </td>
              <td className="px-6 py-4">{new Date(deposit.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4">{deposit.adminRemarks || "--"}</td>
              <td className="px-6 py-4">
                {deposit.status === "pending" && (
                  <div className="flex space-x-2">
                    <Button onClick={() => handleApproveClick(deposit._id)} className="bg-green-500">Approve</Button>
                    <Button onClick={() => handleRejectClick(deposit._id)} className="bg-red-500">Reject</Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalType === "approve" ? "Approve Deposit?" : "Reject Deposit?"}
            </h2>
            {modalType === "reject" && (
              <textarea
                className="w-full border rounded p-2 mb-4"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
              />
            )}
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowConfirmModal(false)} className="bg-gray-400">Cancel</Button>
              <Button onClick={confirmAction} className={modalType === "approve" ? "bg-green-500" : "bg-red-500"}>OK</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
