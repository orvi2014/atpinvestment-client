import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from "./Pages/home";
import ViewDetails from "./Pages/viewDetails";
import './i18n';
import './Pages/login';
import LogIn from './Pages/login';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading...">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investments/details/:id" element={<ViewDetails />} />
            <Route path="/signin" element={<LogIn />} />
           
          </Routes>
        </Router>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
