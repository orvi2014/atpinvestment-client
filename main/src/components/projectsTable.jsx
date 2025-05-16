import React, { useState, useEffect } from "react";

export default function ProjectsTable({ fetchTrigger }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    if (fetchTrigger) {
      fetchProjects();
    }
  }, [fetchTrigger]);

  const fetchProjects = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.atpinvestment.com.bd/api/project/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleDeleteClick = (projectId) => {
    setSelectedProjectId(projectId);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProjectId) return;
    try {
      const response = await fetch(`https://api.atpinvestment.com.bd/api/project/${selectedProjectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      setProjects(projects.filter((project) => project._id !== selectedProjectId));
      setModalOpen(false);
      setSelectedProjectId(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      {loading && <p className="text-center">Loading projects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && projects.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-lg p-4">
          <table className="w-full border-collapse border border-gray-300 text-xs md:text-base">
            <thead>
              <tr className="bg-blue-500 text-white text-xs md:text-sm">
                <th className="border px-2 py-2 md:px-4">Title</th>
                <th className="border px-2 py-2 md:px-4">Price</th>
                <th className="border px-2 py-2 md:px-4">ROI (%)</th>
                <th className="border px-2 py-2 md:px-4">Raised</th>
                <th className="border px-2 py-2 md:px-4">Target (%)</th>
                <th className="border px-2 py-2 md:px-4">Location</th>
                <th className="border px-2 py-2 md:px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} text-xs md:text-base`}>
                  <td className="border px-2 py-2 md:px-4">{project.title}</td>
                  <td className="border px-2 py-2 md:px-4">{project.price}</td>
                  <td className="border px-2 py-2 md:px-4">{project.roi}</td>
                  <td className="border px-2 py-2 md:px-4">{project.raisedAmount}</td>
                  <td className="border px-2 py-2 md:px-4">{project.targetAchieved}%</td>
                  <td className="border px-2 py-2 md:px-4">{project.location}</td>
                  <td className="border px-2 py-2 md:px-4 text-center">
                    <button onClick={() => handleDeleteClick(project._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && projects.length === 0 && <p className="text-center">No projects found.</p>}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this project?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}