"use client"; 

import "../layout/CreateProject/index.css";
import CreateProject from "../layout/CreateProject";
import logo from '../assets/image/logo-blue.png';

export default function ProjectLayout({ children }) {
  return (
    <div className="project-layout">
      <header className="project-header">
       <div className="flex items-center gap-2">
                   <img
                     src={logo || "/placeholder.svg"}
                     alt="logo"
                     className="h-10 w-10 mt-4"
                   />
                   <span className="company font-bold text-2xl">ATP INVESTMENT</span>
        </div>

      </header>
      <main className="project-main">
        <CreateProject />
      </main>
    </div>
  );
}
