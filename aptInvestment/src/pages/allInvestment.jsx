import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useTranslation } from 'react-i18next';
import Allinvestment from "../layout/Allinvestment";
import FooterBelow from "@/layout/FooterBelow";



export default function Home() {
    const { t } = useTranslation();
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <div>
            <Header />
            <div className=" mx-auto px-4">
               <Allinvestment /> 
               
            </div>
            {!isAuthenticated && <Footer />}
            <FooterBelow />
        </div>
    );
}

