import React, { useState, useEffect } from "react"
import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Layout from "../layout/AdminDashboard"
import DataTable from "../components/DataTable"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${activeTab}.json`)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const jsonData = await response.json()
        setData(jsonData)
        if (jsonData.length > 0) {
          setColumns(Object.keys(jsonData[0]))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setData([])
        setColumns([])
      }
    }

    fetchData()
  }, [activeTab])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full pl-8" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add {activeTab.slice(0, -1)}
          </Button>
        </div>
      </div>
      <div className="rounded-lg border">
        <DataTable data={data} columns={columns} />
      </div>
    </Layout>
  )
}

