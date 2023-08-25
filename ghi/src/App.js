import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import TitleBar from "./TitleBar.js";
import MainPage from "./MainPage.js";
import './index.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <h1 className="text-red-700 font-bold underline">
            Hello world!
          </h1>
        <TitleBar/>
        <Routes>
          <Route exact path="/" element={<MainPage />} ></Route>
          <Route exact path="/signup" element={<SignupForm/>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
