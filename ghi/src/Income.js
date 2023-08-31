import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from "react";

function ListIncomes({ userDetails }) {
    const [incomes, setIncomes] = useState([]);
    const { token } = useToken();

    console.log(userDetails)

    const fetchData = async () => {
        if (!token || !userDetails) {
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        const response = await fetch(`http://localhost:8000/api/incomes/${userDetails.id}`, { headers });
        if (response.ok) {
            const data = await response.json();
            setIncomes(data.incomes);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userDetails]); // Add userDetails to the dependency array

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>income id</th>
                    <th>income title</th>
                    <th>income amount</th>
                    <th>income date</th>
                    <th>income description</th>
                </tr>
            </thead>
            <tbody>
                {incomes.map(income => (
                    <tr key={income.id}>
                        <td>{income.id}</td>
                        <td>{income.income_title}</td>
                        <td>{income.income_amount}</td>
                        <td>{income.date}</td>
                        <td>{income.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListIncomes;
