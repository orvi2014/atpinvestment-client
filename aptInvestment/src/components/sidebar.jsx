import React from "react"
import { Users, FolderKanban, Gift, CreditCard, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Sidebar({ open, setOpen, onTabChange, activeTab }) {
  const tabs = [
    { name: "Users", icon: Users },
    { name: "Projects", icon: FolderKanban },
    { name: "Promotions", icon: Gift },
    { name: "Payments", icon: CreditCard },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-semibold">Menu</h2>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="md:hidden">
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="flex flex-col gap-2 p-4">
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            variant={activeTab === tab.name.toLowerCase() ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              onTabChange(tab.name.toLowerCase())
            }}
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.name}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

