import { Line } from "react-chartjs-2";



function LineChart({ incomeData, expenseData }) {

    const incomeArray = incomeData?.datasets[0].data;
    const expenseArray = expenseData?.datasets[0].data;

    console.log(
        "incomedata:", incomeArray,
        "expensedata:", expenseArray
    )

    /////savings is calculated as accumulated savings for all months
    //// savings uses optinal chaining
    let totalSavings = 0;
    const totalSavingsArray = incomeArray?.map((income, index) => {
        totalSavings += income - expenseArray[index];
        return totalSavings
    });

    const monthlySavingsArray = incomeArray.map((income, index) => income - expenseArray[index]);


    const data = {
        labels: incomeData.labels,
        datasets: [
            {
                label: "Income",
                data: incomeArray,
                backgroundColor: "rgba(118, 222, 172, 1)", // Green
                borderColor: "rgba(118, 222, 172, 1)", // Green
                borderWidth: 2,
            },
            {
                label: "Expenses",
                data: expenseArray,
                backgroundColor: "rgba(255, 81, 81, 1)", // Red
                borderColor: "rgba(255, 81, 81, 1)", // Red
                borderWidth: 2,
            },
            {
                label: "Monthly Savings",
                data: monthlySavingsArray,
                backgroundColor: "rgba(90, 166, 255, 1)", // Blue
                borderColor: "rgba(90, 166, 255, 1)", // Blue
                borderWidth: 2,
            },
            {
                label: "Cumulative Savings",
                data: totalSavingsArray,
                backgroundColor: "rgba(133, 127, 127, 1)", // green dot
                borderColor: "rgba(133, 127, 127, 1)", // grey line
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="chart-container" style={{ width: "80%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Income and Expense Analysis by Month</h2>
            <div style={{ textAlign: "center" }} className="text-[12px] font-sans font-light pr-4 customGrey" >
                <p>click values on the legend to show or hide their data</p>
            </div>
            <Line
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Monthly Income and Expenses 2023",
                        },
                        legend: {
                            display: true,
                        },
                    },
                }}
            />
        </div>
    );
}

export default LineChart;
