"use client"

import { useEffect } from "react"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import { useTranslation } from "react-i18next"
import Allinvestment from "../layout/Allinvestment"
import FooterBelow from "@/layout/FooterBelow"

export default function AllInvestmentPage() {
  const { t } = useTranslation()
  const isAuthenticated = localStorage.getItem("token") !== null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Allinvestment />
      </main>
      <div>
        {!isAuthenticated && <Footer />}
        <FooterBelow />
      </div>
    </div>
  )
}

