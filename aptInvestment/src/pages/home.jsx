import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Homeinfo from "../layout/HomeInfo";
import { useTranslation } from 'react-i18next';
import About from "../layout/Aboutus";
import InvestApproach from "../layout/InvestmentApproach";


export default function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <Header />
            <div className=" mx-auto px-4">
                <Homeinfo />
                <About />
                <InvestApproach />
            </div>
            <Footer />
        </div>
    );
}

