import React, { useState, Effect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link, useNavigate, useParams } from "react-router-dom"

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

function Income({ incomes, setIncomes }) {

    const [incomeAmount, setIncomeAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    const { token, fetchWithToken } = useToken()

    const handleIncomeAmountChange = (e) => {
        const value = e.target.value;
        setIncomeAmount(value);
    };

    const handleDateChange = e => {
        setSelectedDate(e.target.value)

    }



    const handleSubmit = (e) => {
        e.preventDefault();


        const data = {
            income_amount: incomeAmount,
            date: selectedDate,
        };



        fetch(`${process.env.REACT_APP_API_HOST}/api/users/lock1`).then(response => {
            console.log("RESPONSE", response)
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch users data');
            }
        })
            .then(data => {
                console.log("DATA", data);
                setUserInfo(data);
            })
            .catch(error => {
                console.error(error);
            });

        console.log("user data", userInfo.id)




        const incomeUrl = `${process.env.REACT_APP_API_HOST}/api/incomes/${userInfo.id}`;
        if (token) {
            const newIncome = fetchWithToken(incomeUrl, "POST", { 'Content-Type': 'application/json' }, { body: JSON.stringify(data) })
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
            <div>
                <h2 className="text-xl font-semibold mb-4">Income by Month</h2>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light">
                                    <colgroup>
                                        <col style={{ width: '20%' }} /> {/* Adjust the width as needed */}
                                        <col style={{ width: '40%' }} /> {/* Adjust the width as needed */}
                                        <col style={{ width: '40%' }} /> {/* Adjust the width as needed */}
                                    </colgroup>
                                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                        <tr>
                                            <th scope="col" class="px-6 py-4">Month</th>
                                            <th scope="col" class="px-6 py-4">Income</th>
                                            <th scope="col" class="px-6 py-4">Total Income</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">December</td>
                                            <td className="whitespace-nowrap px-6 py-4">$7693.22</td>
                                            <td className="whitespace-nowrap px-6 py-4"></td>
                                        </tr>
                                        <tr class="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">January</td>
                                            <td className="whitespace-nowrap px-6 py-4">$97098.45</td>
                                            <td className="whitespace-nowrap px-6 py-4">$168977.32</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Income;
