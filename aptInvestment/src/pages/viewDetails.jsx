import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import PropertyDetails from "../layout/PropertyView";


export default function ViewDetails() {
  return (
    <div>
      <Header />
      <div className=" mx-auto px-4">
        <PropertyDetails />
      </div>
      <Footer />
    </div>
  );
}
