import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import useToken from "@galvanize-inc/jwtdown-for-react";
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


function AddIncome({ setIncomes }) {
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

    const handleDateChange = e => {
        const value = e.target.value;
        setDate(value)
    }
    const handleIncomeAmountChange = e => {
        const value = e.target.value
        setIncomeAmount(value)
    }
    const handleDescriptionChange = e => {
        const value = e.target.value
        setDescription(value)
    }
    const handleIncomeTitleChange = e => {
        const value = e.target.value
        setIncomeTitle(value)
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
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetchWithToken(incomeUrl, fetchConfig);
        if (response.ok) {
            const newIncome = await response.json();
            setIncomes(newIncome);

            setDate(null);
            setIncomeAmount('');
            setDescription('');
            setIncomeTitle('');

        }
    }

    return (
        <div>
            {/* onClick={openModal} add this code into the add new button */}
            <Modal isOpen={modalIsOpen} onClose={closeModal} style={customStyles}>
                <button onClick={closeModal}>Exit</button>
                <form onSubmit={handleSubmit} id="create-income-form">
                    <h1 className="text-2xl font-semibold mb-4">Add an Income</h1>
                    <div className="mb-4">
                        <input
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                            required
                            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
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
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter message"
                            id="description"
                            name="description"
                            className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
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
        </div>
    )
}

export default AddIncome;
