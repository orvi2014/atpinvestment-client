import React from "react";
import { Users, FolderKanban, Gift, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { name: "Users", icon: Users },
  { name: "Projects", icon: FolderKanban },
  { name: "Promotions", icon: Gift },
  { name: "Payments", icon: CreditCard },
];

export default function Sidebar({ open, setOpen, onTabChange, activeTab, setFetchTrigger }) {
  return (
    <aside
      role="navigation"
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-semibold">Menu</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setOpen(false)} 
          className="md:hidden" 
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name.toLowerCase();
          return (
            <Button
              key={tab.name}
              variant="ghost"
              className={`w-full justify-start transition-colors 
                ${isActive 
                  ? "bg-blue-500 text-gray-800 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600" 
                  : "hover:bg-blue-100 dark:hover:bg-blue-900"}
              `}
              onClick={() => {
                onTabChange(tab.name.toLowerCase());
                if (tab.name.toLowerCase() === "projects") {
                  setFetchTrigger(true);
                }
              }}
            >
              <tab.icon className={`mr-2 h-4 w-4 ${isActive ? "text-gray-800 dark:text-gray-300" : ""}`} />
              {tab.name}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
