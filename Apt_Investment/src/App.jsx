import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from "./Pages/home";
import ViewDetails from "./Pages/viewDetails";
import './i18n';
import './Pages/signin';
import LogIn from './Pages/signin';
import PhoneVerification from './Pages/phnVarification';
import CodeVerification from './Pages/codeVerification';
import Signupinfo from './Pages/signupInfo';



function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Loading...">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investments/details/:id" element={<ViewDetails />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/signup" element={<PhoneVerification />} />
            <Route path="/signup/verify" element={<CodeVerification />} />
            <Route path="/signup/info" element={<Signupinfo />} />
          </Routes>
        </Router>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
