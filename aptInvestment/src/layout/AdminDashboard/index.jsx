import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo-blue.png";
import Sidebar from "../../components/sidebar";
import UsersTable from "../../components/userTable";
import ProjectsTable from "../../components/projectsTable";
import "./index.css";

export default function Layout() {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="relative flex items-center justify-between border-b px-4 py-2 w-full md:flex-row flex-col text-center">
  {/* Logo and Company Name */}
  <div className="flex items-center gap-2 md:flex-row flex-col">
    <img src={logo || "/placeholder.svg"} alt="logo" className="h-10 w-10" />
    <span className="font-semibold text-xl text-blue-500 ">ATP INVESTMENT</span>
  </div>

  {/* Admin Dashboard Title */}
  <h1 className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-3xl font-semibold mt-1 md:mt-0 text-blue-500">
    Admin Dashboard
  </h1>

  {/* Sidebar Toggle Button (Moves to the right on small screens) */}
  <Button
    variant="ghost"
    size="icon"
    className="md:hidden self-end"
    onClick={() => setSidebarOpen(!sidebarOpen)}
    aria-label="Toggle sidebar"
  >
    <Menu className="h-6 w-6" />
  </Button>
</header>


      {/* Search Box and Add Project Button */}
      <div className="flex items-center justify-end px-4 py-2 gap-4">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            className="w-full p-2 border rounded-md pr-24"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => console.log("Search Clicked")}
          >
            Search
          </Button>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => navigate("/admin/project/create")}
        >
          + Add Project
        </Button>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onTabChange={setActiveTab}
          activeTab={activeTab}
          setFetchTrigger={setFetchTrigger}
        />
        <main className={`flex-1 p-6 ${sidebarOpen ? "md:ml-64" : ""}`}>
          {activeTab === "users" && <UsersTable />}
          {activeTab === "projects" && <ProjectsTable fetchTrigger={fetchTrigger} />}
        </main>
      </div>
    </div>
  );
}
