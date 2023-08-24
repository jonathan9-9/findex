import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import SignupForm from "./SignupForm.js";
import TitleBar from "./TitleBar.js";
import MainPage from "./MainPage.js";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
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
