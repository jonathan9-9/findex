import React, { useEffect, useState, useContext, useCallback } from 'react';
import { UserContext, CategoryContext } from './App';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';
import ExpenseDetail from './ExpenseDetail';

function ExpenseList() {
    const { categories, getCategories } = useContext(CategoryContext);
    const [expenses, setExpenses] = useState([]);
    const { token, fetchWithToken } = useToken();
    const { user } = useContext(UserContext);
    const [setCreateMessage] = useState(null);
    const [setDeleteMessage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [message, setMessage] = useState(null);
    const [newCategory, setNewCategory] = useState("");

    const handleCreateCategory = async () => {

        if (!newCategory.trim()) {
            setMessage('Category name cannot be empty');
            setTimeout(() => {
                setMessage(null);
            }, 4000);

            return;
        }
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/category/${user.id}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ expense_category_name: newCategory })
            });

            if (response.ok) {
                getCategories();
                setMessage('Category created successfully');
                setTimeout(() => {
                    setMessage(null);
                }, 4000);

                setNewCategory("")
            } else {
                setMessage('Failed to create category');

                setTimeout(() => {
                    setMessage(null);
                }, 4000);

            }
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred while creating the category');

            setTimeout(() => {
                setMessage(null);
            }, 4000);

        }
    };


    const navigate = useNavigate();

    const fetchExpenses = useCallback(async () => {
        console.log('Inside fetchExpenses');
        console.log('user.id inside fetchExpenses:', user.id);
        const API_HOST = process.env.REACT_APP_API_HOST;
        const url = `${API_HOST}/api/expenses/${user.id}`;
        if (token) {
            const data = await fetchWithToken(url);
            if (data.expenses) {
                console.log('Received data:', data);
                setExpenses(data.expenses);
            } else {
                console.error('Failed to fetch expenses');
            }
        }
    }, [user.id, token, fetchWithToken]);

    /*useEffect(() => {
        console.log('useEffect triggered');
        console.log('user.id:', user.id);
        console.log('createMessage:', createMessage);
        console.log('deleteMessage:', deleteMessage);
        console.log('fetchExpenses:', fetchExpenses);
        if (user.id || createMessage || deleteMessage) {
            console.log('Fetching expenses');  // Debugging line
            fetchExpenses();
            setDeleteMessage(null);  // Resetting the deleteMessage
            setCreateMessage(null);  // Resetting the createMessage
        }
    }, [user.id, createMessage, deleteMessage, fetchExpenses]);*/

    const handleClick = () => {
        console.log("Dropdown clicked");
        getCategories();
    }

    const handleDeleteCategoryConfirmation = () => {
        setShowWarning(true);
    };
    useEffect(() => {
        console.log("Categories updated: ", categories);
    }, [categories]);

    const handleDeleteCategory = async (confirm) => {
        if (confirm) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };
            const categoryUrl = `${process.env.REACT_APP_API_HOST}/api/category/${user.id}/${selectedCategory}`;

            try {
                const categoryDeleteResponse = await fetch(categoryUrl, {
                    method: "DELETE",
                    headers: headers
                });

                if (categoryDeleteResponse.ok) {
                    getCategories();
                    setMessage('Category and associated expenses deleted successfully');
                    setTimeout(() => {
                        setMessage(null);
                    }, 4000);
                } else {
                    console.error('Failed to delete category');
                    setMessage('Failed to delete category');
                }
            } catch (error) {
                console.error('Error while deleting category:', error);
                setMessage('An error occurred while deleting the category');
            }
        }
        setShowWarning(false);
    };



    return (
        <div className="flex flex-col justify-start items-center min-h-screen pt-12">
            <Routes>
                <Route path="/" element={
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Expenses</h2>

                        {/* Insert the alert here */}
                        {message && <div className="alert alert-success mb-4">{message}</div>}

                        {showWarning && (
                            <div className="alert alert-warning mb-4">
                                <p>All expenses tied to this category will be deleted. Are you sure?</p>
                                <button onClick={() => handleDeleteCategory(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Yes</button>
                                <button onClick={() => handleDeleteCategory(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">No</button>
                            </div>
                        )}

                        <div className="text-center my-4">
                            <button onClick={() => navigate("create")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                                Add an Expense
                            </button>
                            <button
                                type="button"
                                onClick={fetchExpenses}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-3 rounded mt-4"
                            >
                                View/Update Expenses
                            </button>
                        </div>


                        <div className="flex items-center justify-center mb-4">
                            <input
                                type="text"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {/* Disabled because newCategory is empty */}
                            <button onClick={handleCreateCategory} className={`bg-green-500 font-bold py-2 px-4 rounded ml-4 ${!newCategory.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`} disabled={!newCategory.trim()}>
                                Add Category
                            </button>
                        </div>

                        <div className="flex justify-center items-center mb-4">
                            {/* Add the onClick event here */}
                            <select onClick={handleClick} onChange={e => setSelectedCategory(e.target.value)} className="mr-4">
                                <option>Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.expense_category_name}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleDeleteCategoryConfirmation} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete Category
                            </button>
                        </div>
                        <div className="container mx-auto">
                            <div className="flex flex-wrap -mx-4">
                                {expenses && expenses.map(expense => {
                                    if (!expense) return null;
                                    return (
                                        <div key={expense.id} className="w-auto h-auto px-4 mb-4">
                                            <div className="bg-blue-200 p-4 rounded-lg">
                                                <h5 className="text-xl font-bold mb-4">{expense.date}</h5>
                                                <p className="text-base text-gray-700 mb-2">Expense Amount: {expense.expense_amount}</p>
                                                <p className="text-base text-gray-700 mb-2">Description: {expense.description || 'None'}</p>
                                                <p className="text-base text-gray-700 mb-2">Category: {expense.category_name}</p>
                                                <div className="card-footer mt-4">
                                                    <Link to={`/expenses/${expense.id}`} className="text-blue-500 hover:underline">
                                                        Edit/Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                } />
                <Route path="create" element={<ExpenseForm setCreateMessage={setCreateMessage} categories={categories} getCategories={getCategories} />} />
                <Route path=":id" element={<ExpenseDetail setDeleteMessage={setDeleteMessage} categories={categories} getCategories={getCategories} />} />
            </Routes>
        </div>
    );
}

export default ExpenseList;
