import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Homeinfo from "../layout/HomeInfo";
import { useTranslation } from 'react-i18next';
import About from "../layout/Aboutus";
import InvestApproach from "../layout/InvestmentApproach";
import Service from "../layout/OurServices";
import Whychoose from "../layout/Whychoose";
import FooterBelow from "@/layout/FooterBelow";



export default function Home() {
    const { t } = useTranslation();
    const isAuthenticated = localStorage.getItem('token') !== null;


    return (
        <div>
            <Header />
            <div className=" mx-auto px-4">
                <Homeinfo />
                <About />
                <InvestApproach />
                <Service />
                <Whychoose />
               
            </div>
            {!isAuthenticated && <Footer />}
            <FooterBelow />
            
        </div>
    );
}

