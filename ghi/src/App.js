import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import Income from "./Income";
import './index.css';
import LoginForm from "./LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";

function App() {


  return (
    <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
      <div className="bg-gradient-to-r from-customGreenOne to-customGreenTwo bg-opacity-10 h-screen">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="signup" element={<SignupForm />} />
            <Route index element={<MainPage />} />
            {/* <Route path="income" element={<Income />} /> */}
            <Route path="login" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
