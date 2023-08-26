import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import TitleBar from "./TitleBar.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import './index.css';

function App() {
  return (
  <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
    <div className="bg-gradient-to-r from-customBlue to-customGreen h-screen">
      <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="signup" element={<SignupForm/>}/>
            <Route index element={<MainPage />}/>
          </Routes>
      </BrowserRouter>
    </div>
  </AuthProvider>
  );
}

export default App;
