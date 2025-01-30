import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../assets/image/logo-blue.png";
import Sidebar from "../../components/sidebar";
import UsersTable from "../../components/userTable";
import ProjectsTable from "../../components/projectsTable";
import "./index.css";

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <header className="relative flex flex-col items-center border-b px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src={logo || "/placeholder.svg"}
              alt="logo"
              className="h-10 w-10"
            />
            <span className="company font-bold text-lg">ATP INVESTMENT</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <h1 className="header mt-4">Admin Dashboard</h1>

        {/* Search Box and Add Project Button */}
        <div className="flex w-full items-center justify-end mt-4 gap-4">
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
            onClick={() => console.log("Add Project Clicked")}
          >
           + Add Project
          </Button>
        </div>
      </header>

      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onTabChange={setActiveTab}
          activeTab={activeTab}
          setFetchTrigger={setFetchTrigger}
        />

        <main
          className={`flex-1 p-6 mt-4 md:mt-0 ${sidebarOpen ? "md:ml-64" : ""}`}
        >
          {activeTab === "users" && <UsersTable />}
          {activeTab === "projects" && <ProjectsTable fetchTrigger={fetchTrigger} />}
        </main>
      </div>
    </div>
  );
}
