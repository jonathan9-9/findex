import { AuthProvider } from "@galvanize-inc/jwtdown-for-react"
import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import Income from "./IncomeListing";
import './index.css';
import LoginForm from "./LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";

export const UserContext = createContext()

function App() {

  const [incomes, setIncomes] = useState([]);
  const { token, fetchWithToken } = useToken()
  const [user, setUser] = useState({});



  async function getIncomes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/incomes/${user.id}`
    const data = await fetchWithToken(url);
    console.log(data)
    return data;

  }


  useEffect(() => {

    if (user.id) {
      getIncomes()

    }
  }, [user.id])

  useEffect(() => {

    if (token) {

      setUser(JSON.parse(atob(token.split(".")[1])).account)
    }
  }, [token])


  return (

    <div className="bg-gradient-to-r from-customGreenOne to-customGreenTwo bg-opacity-10 h-screen">
      <UserContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="signup" element={<SignupForm />} />
            <Route index element={<MainPage />} />
            <Route path="income/" element={<Income incomes={incomes} setIncomes={setIncomes} />} />
            <Route path="login" element={<LoginForm username={user} setUsername={setUser} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>

  );
}

export default App;
