import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import Income from "./IncomeListing";
import './index.css';
import LoginForm from "./LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";

function App() {

  const [incomes, setIncomes] = useState([]);
  const { token, fetchWithToken } = useToken()


  async function getIncomes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/incomes/2`
    const response = await fetchWithToken(url);
    console.log(response)
  }


  useEffect(() => {

    if (token) {
      getIncomes()
    }
  }, [token])


  return (

    <div className="bg-gradient-to-r from-customGreenOne to-customGreenTwo bg-opacity-10 h-screen">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="signup" element={<SignupForm />} />
          <Route index element={<MainPage />} />
          <Route path="income" element={<Income incomes={incomes} setIncomes={setIncomes} />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
