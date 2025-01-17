import React from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Homeinfo from "../Layout/HomeInfo";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4">
                <Homeinfo />
            </div>
            <Footer />
        </div>
    );
}

