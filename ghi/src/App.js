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
    <BrowserRouter>
      <Nav />
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <TitleBar/>
        <Routes>
          <Route exact path="signup" element={<SignupForm/>}></Route>
          <Route exact path="/" element={<MainPage />} ></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
