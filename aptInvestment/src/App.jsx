import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Home from "./pages/home";
import ViewDetails from "./pages/viewDetails";
import './i18n';
import './pages/signin';
import LogIn from './pages/signin';
import PhoneVerification from './pages/phnVarification';
import CodeVerification from './pages/codeVerification';
import Signupinfo from './pages/signupInfo';
import AdminDashboard from './pages/adminDashboard';
import AdminLogin from './pages/adminLogin';
import CreateProject from './pages/createProject';



function App() {
  return (
    <I18nextProvider i18n={i18n} >
      <Suspense fallback="Loading...">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investments/details/:id" element={<ViewDetails />} />
            <Route path="/signin" element={<LogIn />} />
            <Route path="/signup/verify" element={<PhoneVerification />} />
            <Route path="/signup/verify/OTP" element={<CodeVerification />} />
            <Route path="/signup" element={<Signupinfo />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/project/create" element={<CreateProject />} />
          </Routes>
        </Router>
      </Suspense>
    </I18nextProvider>
  );
}

export default App;
