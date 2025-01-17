import React from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import PropertyDetails from "../Layout/PropertyView";


export default function ViewDetails() {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <PropertyDetails />
      </div>
      <Footer />
    </div>
  );
}
