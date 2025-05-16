import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PropertyDetails from "../layout/PropertyView";
import FooterBelow from "@/layout/FooterBelow";


export default function ViewDetails() {

  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div>
      <Header />
      <div className=" mx-auto px-4">
        <PropertyDetails />
      </div>
      {!isAuthenticated && <Footer />}
      <FooterBelow />
    </div>
  );
}
