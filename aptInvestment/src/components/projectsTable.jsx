import React, { useState, useEffect } from "react";

export default function ProjectsTable({ fetchTrigger }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchTrigger) {
      fetchProjects();
    }
  }, [fetchTrigger]);

  const fetchProjects = () => {
    setLoading(true);
    setError(null);

    fetch("https://atpinvestment.onrender.com/api/project/list")
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

  const handleEdit = (projectId) => {
    alert(`Edit project: ${projectId}`);
  };

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://atpinvestment.onrender.com/api/project/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Remove project from state
      setProjects(projects.filter((project) => project._id !== projectId));
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
                <th className="border px-2 py-2 md:px-4">Edit</th>
                <th className="border px-2 py-2 md:px-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } text-xs md:text-base`}
                >
                  <td className="border px-2 py-2 md:px-4">{project.title}</td>
                  <td className="border px-2 py-2 md:px-4">{project.price}</td>
                  <td className="border px-2 py-2 md:px-4">{project.roi}</td>
                  <td className="border px-2 py-2 md:px-4">{project.raisedAmount}</td>
                  <td className="border px-2 py-2 md:px-4">{project.targetAchieved}%</td>
                  <td className="border px-2 py-2 md:px-4">{project.location}</td>
                  <td className="border px-2 py-2 md:px-4 text-center">
                    <button
                      onClick={() => handleEdit(project._id)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-2 py-2 md:px-4 text-center">
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-center">No projects found.</p>
      )}
    </div>
  );
}
