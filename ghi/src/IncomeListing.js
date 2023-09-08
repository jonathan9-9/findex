import React, { useState, useContext } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { UserContext } from "./App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


function Income({ setIncomes, incomes, getIncomes }) {
    const { user } = useContext(UserContext)
    const { token, fetchWithToken } = useToken()
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const [date, setDate] = useState(null);
    const [incomeAmount, setIncomeAmount] = useState('');
    const [description, setDescription] = useState('');
    const [incomeTitle, setIncomeTitle] = useState('');


    const openModal = () => {
        setModalIsOpen(true);
    }


    const closeModal = () => {
        setModalIsOpen(false);
    }


    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            date: date,
            income_amount: incomeAmount,
            description: description,
            income_title: incomeTitle
        }


        const incomeUrl = `${process.env.REACT_APP_API_HOST}/api/incomes/${user.id}`;
        console.log("income url:", incomeUrl)


        if (token) {


            const newIncome = await fetchWithToken(incomeUrl,
                "POST", { 'Content-Type': 'application/json' }, { body: JSON.stringify(data) });
            console.log("new income:", newIncome)




            setDate(null);
            setIncomeAmount('');
            setDescription('');
            setIncomeTitle('');
            setIncomes([...incomes, newIncome]);
            getIncomes();
        }
    }

    return (
        <div className="flex justify-center items-center my-14 space-x-64">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={openModal}>Add new <FontAwesomeIcon icon={faPlus} /></button>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Income amount($)
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Income title
                            </th>
                            <th >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>


                        {incomes.map((income, idx) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                                    <td className="px-6 py-4">{income.date}</td>
                                    <td className="px-6 py-4">{income.income_amount}</td>
                                    <td className="px-6 py-4">{income.description}</td>
                                    <td className="px-6 py-4">{income.income_title}</td>
                                    <td className="px-6 py-4">
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-2"> <FontAwesomeIcon icon={faPencil} /></button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"><FontAwesomeIcon icon={faTrashCan} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {
                <Modal isOpen={modalIsOpen} onClose={closeModal} style={customStyles} appElement={document.getElementById('root')}>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline" onClick={closeModal}>Exit</button>
                    <form onSubmit={handleSubmit} id="create-income-form">
                        <h1 className="text-2xl font-semibold mb-4">Add an Income</h1>
                        <div className="mb-4">
                            <input
                                type="date"
                                value={date || ""}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="mb-4">
                            <input
                                onChange={(e) => setIncomeAmount(e.target.value)}
                                value={incomeAmount}
                                placeholder="Income amount in $"
                                required
                                type="number"
                                step="0.01"
                                id="income"
                                name="income"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="incomeAmount">Income Amount</label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter message"
                                id="description"
                                name="description"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={incomeTitle}
                                onChange={(e) => setIncomeTitle(e.target.value)}
                                placeholder="Income title"
                                id="incomeTitle"
                                name="incomeTitle"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="incomeTitle">Income Title</label>
                        </div>
                        <div className="mb-4">
                            <button
                                className="bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </Modal>
            }
        </div>
    );


}
export default Income;
