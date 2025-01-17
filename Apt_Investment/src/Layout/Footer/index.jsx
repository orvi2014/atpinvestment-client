import React from 'react'
import FAQ from '../../components/faq'
import Joinus from '../../components/joinUs'
import './index.css'
import logo from "../../assets/Image/logo.png"

function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      
      {/*FAQ*/}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Frequently Asked Questions
      </h1>
      <div className="faq-section">
        <FAQ />
      </div>

      {/*Jion Us section*/}
       <div className='joinus mt-4'>
        <Joinus />
       </div>
     {/*other info */}
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo">
            <img src={logo} alt="logo" />
            ATP Investment
          </div>
          <p className="contact-text">
            Please contact us if you have any specific request.
          </p>
          <a href="mailto:abc@gmail.com" className="email-link">
            abc@gmail.com
          </a>
        </div>

        <div className="footer-right">
          <div className="footer-column">
            <h3>COMPANY</h3>
            <a href="#how-it-works">How it works</a>
          </div>
          
          <div className="footer-column">
            <h3>SOCIALS</h3>
            <div className="social-links">
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
              <a href="#twitter-2">Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-center">
          <p className="copyright">
            © 2023 lorem epsum All rights reserved
          </p>
        </div>


    </footer>
  )
}

export default Footer

