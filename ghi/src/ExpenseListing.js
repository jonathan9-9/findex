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
                setNewCategory("");
            } else {
                setMessage('Failed to create category');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setMessage('An error occurred while creating the category');
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
        // Debugging logs
        console.log('handleDeleteCategory triggered');
        console.log('Selected Category:', selectedCategory);
        console.log('Expenses:', expenses);

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        if (confirm) {
            const deletePromises = expenses.map(expense => {
                if (expense.category_id === selectedCategory) {
                    const url = `${process.env.REACT_APP_API_HOST}/api/expenses/${user.id}/${expense.id}`;
                    return fetch(url, {
                        method: "DELETE",
                        headers: headers,
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to delete an expense tied to the category');
                            }
                        });
                }
                return Promise.resolve();
            });

            Promise.all(deletePromises)
                .then(async () => {  // Note the async keyword here
                    // Now safe to delete the category
                    const categoryUrl = `${process.env.REACT_APP_API_HOST}/api/category/${user.id}/${selectedCategory}`;
                    const categoryDeleteResponse = await fetch(categoryUrl, {  // Now await is allowed
                        method: "DELETE",
                        headers: headers,
                        body: JSON.stringify({ id: selectedCategory })  // send the category ID in the request body
                    });

                    if (categoryDeleteResponse.ok) {
                        getCategories();  // Refresh the categories list
                        setMessage('Category and associated expenses deleted successfully');
                    } else {
                        console.error('Failed to delete category');
                        setMessage('Failed to delete category');
                    }
                })
                .catch(error => {
                    console.error(error);
                    setMessage('Failed to delete some expenses tied to the category');
                    setShowWarning(false);
                });
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
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
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
                            <button onClick={handleCreateCategory} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
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

                        {expenses && expenses.map(expense => {
                            if (!expense) return null;
                            return (
                                <div key={expense.id} className="col-4 mb-4 card">
                                    <div className="card-body bg-blue-200 p-4 rounded-lg">
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
                } />
                <Route path="create" element={<ExpenseForm setCreateMessage={setCreateMessage} categories={categories} getCategories={getCategories} />} />
                <Route path=":id" element={<ExpenseDetail setDeleteMessage={setDeleteMessage} categories={categories} getCategories={getCategories} />} />
            </Routes>
        </div>
    );
}

export default ExpenseList;
