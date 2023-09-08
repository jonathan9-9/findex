import { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css";
import SignupForm from "./SignupForm.js";
import MainPage from "./MainPage.js";
import Nav from "./Nav";
import Income from "./IncomeListing";
import './index.css';
import LoginForm from "./LoginForm";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ExpenseForm from "./ExpenseForm";
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import format from "date-fns/format";



export const UserContext = createContext()

Chart.register(CategoryScale);

function App() {

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { token, fetchWithToken } = useToken()
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [incomeData, setIncomeData] = useState({});
  const [expenseData, setExpenseData] = useState({});



  //fetch income data
  async function getIncomes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/incomes/${user.id}`
    const data = await fetchWithToken(url);
    setIncomes(data.incomes)
    // console.log("income data ->", data)
    return data;
  }

  ///fetch expense data
  async function getExpenses() {
    const url = `${process.env.REACT_APP_API_HOST}/api/expenses/${user.id}`
    const data = await fetchWithToken(url);
    setExpenses(data.expenses)
    // console.log("expense data ->", data)
    return data;
  }


  useEffect(() => {
    if (token) {
      setUser(JSON.parse(window.atob(token.split(".")[1])).account)
    }
  }, [token])

  useEffect(() => {
    if (user.id) {
      getExpenses()
    }
  }, [user.id])

  useEffect(() => {
    if (user.id) {
      getIncomes()
    }
  }, [user.id])

  console.log(user.id)

  useEffect(() => {
    if (token && incomes && expenses) {
      // console.log("logdate", incomes.date)

      // Income data
      const incomeData = {
        labels: incomes.map((income) => format(new Date(income.date), 'MMM yyyy')), // format date how we want it to display
        datasets: [
          {
            label: "Income Fluctuations by Month",
            data: incomes.map((income) => parseInt(income.income_amount)),
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

      // Expense data
      const expenseData = {
        labels: expenses.map((expense) => format(new Date(expense.date), 'MMM yyyy')), // format date how we want it to display
        datasets: [
          {
            label: "Expenses by Month",
            data: expenses.map((expense) => parseInt(expense.expense_amount)),
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

      setIncomeData(incomeData);
      setExpenseData(expenseData);
    }
  }, [incomes, expenses, token]);

  async function getCategories() {
    const url = `${process.env.REACT_APP_API_HOST}/api/category/${user.id}`
    const data = await fetchWithToken(url);
    setCategories(data.categories)
    return data;

  }

  useEffect(() => {

    async function getCategories() {
      const url = `${process.env.REACT_APP_API_HOST}/api/category/${user.id}`;
      const data = await fetchWithToken(url);
      setCategories(data.categories);
    }

    if (user.id) {
      getCategories()
    }
  }, [user.id])

  return (
    <div className="bg-white">
      <UserContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav />
          <div className="h-screen">
            <Routes>
              <Route path="signup" element={<SignupForm />} />
              <Route index element={<MainPage />} />
              <Route path="income/" element={<Income incomes={incomes} setIncomes={setIncomes} getIncomes={getIncomes} />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="expenses" element={<ExpenseForm categories={categories} setCategories={setCategories} getExpenses={getExpenses} />} />
              <Route path="analyzer2" element={<LineChart incomeData={incomeData} expenseData={expenseData} getIncomes={getIncomes} />} />
              <Route path="analyzer" element={<BarChart incomeData={incomeData} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>


  );
}


export default App;
