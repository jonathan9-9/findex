import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";

function BarChart({ incomeData, expenseData }) {
    const [displayType, setDisplayType] = useState('Income');

    const incomeArray = incomeData?.datasets[0].data;
    const expenseArray = expenseData?.datasets[0].data;

    if (!incomeData || !expenseData || !incomeArray || !expenseArray) {
        return <div>Loading...</div>;
    }

    let selectedData;
    switch (displayType) {
        case 'Income':
            selectedData = incomeData;
            break;
        case 'Expenses':
            selectedData = expenseData;
            break;
        case 'Savings':
            const monthlySavingsArray = incomeArray.map((income, index) => income - expenseArray[index]);
            selectedData = {
                labels: incomeData.labels,
                datasets: [
                    {
                        label: "Savings",
                        data: monthlySavingsArray,
                        backgroundColor: "purple",
                        borderColor: "black",
                        borderWidth: 2,
                    },
                ],
            };
            break;
        default:
            break;
    }

    return (
        <div className="chart-container" style={{ width: "80%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        border: '2px solid darkgreen',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        marginRight: '10px'
                    }}
                    onClick={() => setDisplayType('Income')}
                >
                    Income
                </button>
                <button
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: '2px solid darkred',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        marginRight: '10px'
                    }}
                    onClick={() => setDisplayType('Expenses')}
                >
                    Expenses
                </button>
                <button
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: '2px solid darkblue',
                        borderRadius: '5px',
                        padding: '10px 20px'
                    }}
                    onClick={() => setDisplayType('Savings')}
                >
                    Savings
                </button>
            </div>

            <Bar
                data={selectedData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: `Monthly ${displayType} 2023`
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}

export default BarChart;
