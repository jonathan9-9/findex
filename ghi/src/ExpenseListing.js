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


function ExpenseList({ setExpenses, expenses }) {

    const { user } = useContext(UserContext)
    const { token, fetchWithToken } = useToken()
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const [date, setDate] = useState(null);
    const [expenseAmount, setExpenseAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');


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
            expense_amount: expenseAmount,
            description: description,
            category: category
        }


        const expenseUrl = `${process.env.REACT_APP_API_HOST}/api/expenses/${user.id}`;

        if (token) {

            const newExpense = await fetchWithToken(expenseUrl,
                "POST", { 'Content-Type': 'application/json' }, { body: JSON.stringify(data) });

            setDate(null);
            setExpenseAmount('');
            setDescription('');
            setCategory('');
            setExpenses([...expenses, newExpense]);
        }
    }

    return (
        <div className="flex justify-center items-center my-14 space-x-64">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4" onClick={openModal}>Add Expense <FontAwesomeIcon icon={faPlus} /></button>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Expense Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {expenses.map((expense, idx) => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                                    <td className="px-6 py-4">{expense.date}</td>
                                    <td className="px-6 py-4">{expense.expense_amount}</td>
                                    <td className="px-6 py-4">{expense.description}</td>
                                    <td className="px-6 py-4">{expense.category}</td>

                                    <td className="px-6 py-4">
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mr-2">
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>

                                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
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

                    <form onSubmit={handleSubmit} id="create-expense-form">
                        <h1 className="text-2xl font-semibold mb-4">Add an Expense</h1>

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
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                value={expenseAmount}
                                placeholder="Expense amount"
                                required
                                type="number"
                                step="0.01"
                                id="expenseAmount"
                                name="expenseAmount"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="expenseAmount">Expense Amount</label>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                id="description"
                                name="description"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="description">Description</label>
                        </div>

                        <div className="mb-4">
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category"
                                id="category"
                                name="category"
                                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <label htmlFor="category">Category</label>
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

export default ExpenseList;