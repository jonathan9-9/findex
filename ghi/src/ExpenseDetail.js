import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext, CategoryContext } from './App';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useCallback } from 'react';

function ExpenseDetail({ setDeleted, setEdited, setDeleteMessage }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { token } = useToken();
    const [expense, setExpense] = useState(null);
    const [editedExpense, setEditedExpense] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { categories, getCategories } = useContext(CategoryContext);
    const [userChangedCategory, setUserChangedCategory] = useState(false);

    const fetchExpense = useCallback(async () => {
        const API_HOST = process.env.REACT_APP_API_HOST;
        const url = `${API_HOST}/api/expenses/${user.id}/${id}`;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };

        if (user.id) {
            try {
                const response = await fetch(url, { headers });
                if (response.ok) {
                    const data = await response.json();
                    const correspondingCategory = categories.find(c => c.expense_category_name === data.category_name);
                    console.log("Received expense data:", data);
                    setExpense(data);


                    if (correspondingCategory && correspondingCategory.id) {
                        console.log("Setting selectedCategory to:", correspondingCategory.id.toString());
                        setSelectedCategory(correspondingCategory.id.toString());
                        if (!userChangedCategory) {
                            setSelectedCategory(correspondingCategory.id.toString());
                        }
                    } else if (categories.length > 0) {
                        console.error("Could not find corresponding category ID");
                    }

                } else {
                    console.error('Failed to fetch expense');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, user.id, token, categories]);

    useEffect(() => {
        getCategories();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchExpense();
        console.log("User ID", user.id);
        console.log("ID from params", id);
        console.log('Fetching expenses');
    }, [id, user.id, fetchExpense, categories]);

    useEffect(() => {
        if (expense) {
            setEditedExpense(expense);
            if (expense.expense_category_id !== undefined) {
                setSelectedCategory(expense.expense_category_id.toString());
            }
        }
    }, [expense, categories, getCategories]);



    const handleDelete = async () => {
        console.log("Starting Delete Operation");

        try {
            const API_HOST = process.env.REACT_APP_API_HOST;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const url = `${API_HOST}/api/expenses/${user.id}/${id}`;
            console.log("Delete URL: ", url);

            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            });

            console.log("Delete response: ", response);

            if (response.ok) {
                console.log("Delete operation successful");
                navigate('/expenses');
                setDeleteMessage('Expense deleted successfully');
            } else {
                console.log("Delete operation failed");
            }
        } catch (error) {
            console.log("Error during delete operation: ", error);
        }

        console.log("Ending Delete Operation");
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log("Current selectedCategory:", selectedCategory);
        if (!selectedCategory || isNaN(selectedCategory)) {
            console.error("Invalid category ID:", selectedCategory);
            return;
        }

        try {
            const API_HOST = process.env.REACT_APP_API_HOST;
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const editExpenseData = {
                expense_amount: parseFloat(editedExpense.expense_amount),
                date: editedExpense.date,
                expense_category_id: parseInt(selectedCategory) || null,
                description: editedExpense.description,
                user_id: `${user.id}`,
            };
            console.log("Selected Category: ", selectedCategory);
            console.log("Sending editExpenseData:", editExpenseData);

            const url = `${API_HOST}/api/expenses/${user.id}/${id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(editExpenseData),
            });

            if (response.ok) {
                const updatedExpense = await response.json();
                setExpense(updatedExpense);
                setIsEditing(false);
                setMessage('Expense successfully updated');
                navigate('/expenses');
            } else {
                console.error('Failed to update expense. HTTP Status:', response.status);
                const responseBody = await response.json();
                console.error('Server response:', responseBody);
            }
        } catch (error) {
            console.error('Failed to update expense:', error);
            if (error.name === 'TypeError') {
                console.error('This looks like a network error.');
            }
        }
    };

    const handleEditChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log("Date Value:", value);

        if (name === "category") {
            setUserChangedCategory(true);
        }


        setEditedExpense(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };





    if (!expense) return <div>No expense found with the specified ID.</div>;

    const handleCancel = () => {
        navigate('/expenses');
    };

    if (!expense) {
        return <div>No expense found with the specified ID.</div>;
    }

    return (
        <div className="flex flex-col justify-start items-center min-h-screen pt-12">
            <div className="card expense-detail">
                {message && <div className="alert alert-success">{message}</div>}
                {isEditing ? (
                    <form onSubmit={handleEditSubmit}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Expense Amount:
                            <input type="number" name="expense_amount" value={editedExpense.expense_amount} onChange={handleEditChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>

                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date:
                            <input type="date" name="date" value={editedExpense.date} onChange={handleEditChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>

                        <label>
                            Category:
                            <select
                                name="category"
                                value={selectedCategory || ''}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.expense_category_name}
                                    </option>
                                ))}
                            </select>

                        </label>

                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description:
                            <textarea name="description" value={editedExpense.description} onChange={handleEditChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ></textarea>
                        </label>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
                            Save
                        </button>
                    </form>

                ) : (
                    <div className="card-body">
                        <h5 className="text-2xl font-bold mb-4">Expense Date: {expense.date}</h5>
                        <p className="text-base text-gray-700 mb-2">Expense Amount: {expense.expense_amount}</p>
                        <p className="text-base text-gray-700 mb-2">Category: {expense.category}</p>
                        <p className="text-base text-gray-700 mb-4">Description: {expense.description || 'None'}</p>
                        <div className="mt-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 ml-2" onClick={handleDelete}>Delete</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExpenseDetail;
