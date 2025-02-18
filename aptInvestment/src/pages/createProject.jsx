import "../layout/CreateProject/index.css"
import CreateProject from "../layout/CreateProject"
import logo from "../assets/image/logo.png"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

const ProjectLayout = ({ children }) => {
  return (
    <div className="project-layout bg-background p-6">
      <div className="flex flex-col items-start gap-4 mb-8">
      <Link to="/" className="inline-flex items-center text-sm mb-8">
            <ChevronLeft className="back-button" />
           
          </Link>
        <div className="flex items-center gap-2">
          <img src={logo || "/placeholder.svg"} alt="logo" className="h-10 w-10 mt-4 ml-2" />
          <span className="company font-bold text-2xl">Aim To Prosperity</span>
        </div>
      </div>
      <main className="project-main">
        <CreateProject />
      </main>
    </div>
  )
}

export default ProjectLayout

