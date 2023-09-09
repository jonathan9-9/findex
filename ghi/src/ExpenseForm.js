import React, { useState, useContext } from "react";
import { UserContext } from "./App";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom';

function ExpenseForm({ categories, setCreateMessage }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const { token } = useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dateFormat, setDateFormat] = useState('day');
    const navigate = useNavigate();

    const { user } = useContext(UserContext)

    const handleSeeAllExpenses = () => {
        navigate('/expenses');
    };

    const createNewCategory = async () => {
        const API_HOST = process.env.REACT_APP_API_HOST;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const newCategoryData = {
            expense_category_name: newCategory,
            user_id: `${user.id}`,
        };
        const categoryResponse = await fetch(`${API_HOST}/api/category/${user.id}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newCategoryData),
        });
        const data = await categoryResponse.json();
        if (categoryResponse.ok) {
            return data.id;
        } else {
            if (data.message === 'Category already exists') {
                console.log("Category already exists.");
            } else {
                console.error("Failed to create category:", categoryResponse);
            }
            return null;
        }
    };

    const handleDateFormatChange = (e) => {
        const newFormat = e.target.value;
        setDateFormat(newFormat);

        let currentDate = date;
        if (newFormat === 'month') {
            if (!currentDate || currentDate === '') {

                currentDate = new Date().toISOString().substr(0, 10);
            }
            try {
                const firstDayOfMonth = new Date(currentDate);
                firstDayOfMonth.setDate(1);
                setDate(firstDayOfMonth.toISOString().substr(0, 10));
            } catch (error) {
                console.error("Error setting date:", error);
            }
        }
    };


    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        setSuccessMessage("");
        setErrorMessage("");

        if (!isFormValid()) {
            setErrorMessage("All fields are required.");
            setIsLoading(false);
            return;
        }

        let formattedDate = date;
        if (formattedDate.length === 7) {
            formattedDate += "-01";
        }

        try {
            const API_HOST = process.env.REACT_APP_API_HOST;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const expenseData = {
                expense_amount: parseFloat(expenseAmount),
                date: formattedDate,
                category: selectedCategory === "create_new" ? null : parseInt(selectedCategory),
                description: description,
                user_id: `${user.id}`,
            };

            let categoryId = selectedCategory;

            if (selectedCategory === "create_new") {
                categoryId = await createNewCategory();
                if (!categoryId) {
                    console.log("Failed to create new category");
                    setIsLoading(false);
                    return;
                }
            }

            expenseData.category = categoryId;

            const expenseResponse = await fetch(`${API_HOST}/api/expenses/${user.id}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(expenseData),
            });

            if (expenseResponse.ok) {
                console.log("Expense created successfully");
                setSuccessMessage("Expense created successfully");

                if (typeof setCreateMessage === 'function') {
                    setCreateMessage("New expense created");
                }

                setExpenseAmount("");
                setDate("");
                setSelectedCategory("");
                setNewCategory("");
                setDescription("");
            } else {
                setErrorMessage("Failed to create expense.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while submitting the form.");
        } finally {
            setIsLoading(false);
        }
    };
    const isFormValid = () => {
        return expenseAmount && date && (selectedCategory || newCategory) && description;
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Expense Form</h2>
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                {isLoading && <div className="text-blue-500 mb-4">Loading...</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
                        <input
                            type="number"
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            value={expenseAmount}
                            onChange={e => setExpenseAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date Format</label>
                        <select
                            value={dateFormat}
                            onChange={handleDateFormatChange}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        >
                            <option value="day">Day-Month-Year</option>
                            <option value="month">Month-Year</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input
                            type={dateFormat === 'day' ? 'date' : 'month'}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Select a category</option>

                            {categories?.length > 0 &&
                                categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.expense_category_name}
                                    </option>
                                ))}
                            <option value="create_new">Create New Category</option>
                        </select>
                        {selectedCategory === "create_new" && (
                            <input
                                type="text"
                                placeholder="New category"
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                className="border rounded-lg px-3 py-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            disabled={!isFormValid() || isLoading}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                            type="submit"
                        >
                            {isLoading ? "Loading..." : "Submit"}
                        </button>
                        <button
                            type="button"
                            onClick={handleSeeAllExpenses}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                            See All Expenses
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExpenseForm;
