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

  return (
    <div className="min-h-screen bg-background">
      <header className="relative flex flex-col items-center border-b px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="logo" className="h-10 w-10" />
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
        <h1 className="header ">Admin Dashboard</h1>
      </header>

      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onTabChange={setActiveTab}
          activeTab={activeTab}
          setFetchTrigger={setFetchTrigger}
        />

        <main className="flex-1 p-6 mt-4 md:mt-0 md:ml-64">
          {activeTab === "users" && <UsersTable />}
          {activeTab === "projects" && <ProjectsTable fetchTrigger={fetchTrigger} />}
        </main>
      </div>
    </div>
  );
}
