import React, { useState, Effect, useContext } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "./App";



function Income({ setIncomes, incomes }) {

    const { user } = useContext(UserContext)
    // can also do user.username to add into path url if needed in other components
    //import UserContext, useContext into whichever component vs prop drilling
    const [incomeAmount, setIncomeAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const { token, fetchWithToken } = useToken()

    const handleIncomeAmountChange = (e) => {
        const value = e.target.value;
        setIncomeAmount(value);
    };

    const handleDateChange = e => {
        setSelectedDate(e.target.value)

    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = {
            income_amount: incomeAmount,
            date: selectedDate,
        };


        const incomeUrl = `${process.env.REACT_APP_API_HOST}/api/incomes/${user.id}`;
        if (token) {
            const newIncome = await fetchWithToken(incomeUrl, "POST", { 'Content-Type': 'application/json' }, { body: JSON.stringify(data) })
            console.log(newIncome);


            setIncomeAmount('');
            setSelectedDate(null);
            setIncomes()


        }



    }

    return (
        <div className="flex justify-center items-center my-14 space-x-64">
            <div className="bg-white shadow-md p-6 rounded-md w-96">
                <form onSubmit={handleSubmit} id="create-income-form">
                    <h1 className="text-2xl font-semibold mb-4">Add an Income</h1>
                    <div className="mb-4">
                        <input
                            onChange={handleIncomeAmountChange}
                            value={incomeAmount}
                            placeholder="Income amount in $"
                            required
                            type="number"
                            step="0.01"
                            id="income"
                            name="income"
                            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}

                            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="bg-black hover:bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
            <h2 className="text-xl font-semibold mb-4">Income by Month</h2>

            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Income amount($)
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Income title
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{income.date}</td>
                                    <td>{income.income_amount}</td>
                                    <td>{income.description}</td>
                                    <td>{income.income_title}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );

}
export default Income;

    // const [userInfo, setUserInfo] = useState(null);

   // fetch(`${process.env.REACT_APP_API_HOST}/api/users/${user.username}`).then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         throw new Error('Failed to fetch users data');
        //     }
        // })
        //     .then(data => {
        //         console.log("DATA", data);
        //         setUserInfo(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });




// function Income() {
//     const [incomes, setIncomes] = useState(null);
//     const navigate = useNavigate();

//     const LoadEdit = (id) => {
//         navigate(`${process.env.REACT_APP_API_HOST}/api/incomes/2`)
//     }

//     return (
//         <div className="container mx-auto">
//             <div className="bg-white shadow-lg rounded-lg">
//                 <div className="bg-gray-800 text-white p-4 rounded-t-lg">
//                     <h2 className="text-2xl font-semibold">Income Listing</h2>
//                 </div>
//                 <div className="p-4">
//                     <div className="flex justify-end mb-4">
//                         <Link to="employee/create" className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
//                             Add New (+)
//                         </Link>
//                     </div>
//                     <table className="w-full table-fixed border-collapse border border-gray-300">
//                         <thead className="bg-gray-800 text-white">
//                             <tr>
//                                 <th className="px-4 py-2">Date</th>
//                                 <th className="px-4 py-2">Income Amount</th>
//                                 <th className="px-4 py-2">Income Title</th>
//                                 <th className="px-4 py-2">Description</th>
//                                 <th className="px-4 py-2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {incomes &&
//                                 incomes.map((item, idx) => (
//                                     <tr key={idx}>
//                                         <td className="px-4 py-2">{item.date}</td>
//                                         <td className="px-4 py-2">{item.income_amount}</td>
//                                         <td className="px-4 py-2">{item.income_title}</td>
//                                         <td className="px-4 py-2">{item.description}</td>
//                                         <td className="px-4 py-2">
//                                             <a
//                                                 onClick={() => {
//                                                     LoadEdit(item.idx);
//                                                 }}
//                                                 className="bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-600"
//                                             >
//                                                 Edit
//                                             </a>
//                                             <a
//                                                 onClick={() => {
//                                                     // Handle Remove action here
//                                                 }}
//                                                 className="bg-red-500 text-white py-1 px-2 ml-2 rounded-full hover:bg-red-600"
//                                             >
//                                                 Remove
//                                             </a>
//                                         </td>
//                                     </tr>
//                                 ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );

// }

// export default Income;
