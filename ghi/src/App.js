import { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupForm from "./SignupForm.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import Income from "./IncomeListing";
import "./index.css";
import LoginForm from "./LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ExpenseForm from "./ExpenseForm";
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";



export const UserContext = createContext()

Chart.register(CategoryScale);

function App() {

  const [incomes, setIncomes] = useState([]);
  const { token, fetchWithToken } = useToken();
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (token) {
      setUser(JSON.parse(atob(token.split(".")[1])).account);
    }
  }, [token]);


  useEffect(() => {
    async function getIncomes() {
      const url = `${process.env.REACT_APP_API_HOST}/api/incomes/${user.id}`;
      const data = await fetchWithToken(url);
      setIncomes(data.incomes);
    }

    if (user.id) {
      getIncomes();
    }
  }, [user.id, fetchWithToken]);

  useEffect(() => {
    if (token) {
      let incomeData = {
        labels: incomes && incomes.length > 0 && incomes.map(income => {
          return income.date;
        }),
        datasets: [
          {
            label: "Income Fluctuations by Month",
            data: incomes && incomes.length > 0 && incomes.map(income => {
              return parseInt(income.income_amount);
            }),
            backgroundColor: [
              "rgba(75, 192, 192, 1)",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#00BFFF",
              "#00FF7F",
              "#FFFF00",
              "#FF3030",
              "#8E388E"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      };
      setChartData(incomeData);
    }

  }, [incomes, token]);

  useEffect(() => {

    async function getCategories() {
      const url = `${process.env.REACT_APP_API_HOST}/api/category/${user.id}`;
      const data = await fetchWithToken(url);
      setCategories(data.categories);
    }

    if (user.id) {
      getCategories();
    }

  }, [user.id, fetchWithToken]);

  <div className="bg-white">
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Nav />
        <div className="h-screen">
          <Routes>
            <Route path="signup" element={<SignupForm />} />
            <Route index element={<MainPage />} />
            <Route path="income/" element={<Income incomes={incomes} setIncomes={setIncomes} />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="expenses" element={<ExpenseForm categories={categories} setCategories={setCategories} />} />
            <Route path="analyzer2" element={<LineChart chartData={chartData} />} />
            <Route path="analyzer" element={<BarChart chartData={chartData} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  </div>
  )

}


export default App;
