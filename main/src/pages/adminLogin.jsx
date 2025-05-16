import AdminLogin from "../layout/Adminlogin";


export default function login({ children }) {
  return (
    <div className="root-layout">
      <main className="main-content">{children}</main>
      <AdminLogin />
    </div>
  )
}

