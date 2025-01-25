import React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "../../assets/image/logo-blue.png"
import Sidebar from "../../components/Sidebar"
import "./index.css"

export default function Layout({ children, activeTab, onTabChange, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col items-center border-b px-4 py-2 relative">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="logo" className="h-10 w-10 mt-4" />
            <span className="company">ATP INVESTMENT</span>
          </div>
        </div>
        <h1 className="header">Admin Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onTabChange={onTabChange} activeTab={activeTab} />
        <main className="flex-1 p-6 mt-4 md:mt-0 md:ml-64">{children}</main>
      </div>
    </div>
  )
}

