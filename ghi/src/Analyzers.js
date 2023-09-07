const chartData = {
    labels: ["Expenses", "Income", "Savings"],
    data: [50, 100, 50],
};

const myChart = document.querySelector(".my-chart");
const ul = document.querySelector(".programming-stats .details ul");

new Chart(myChart, {
    type: "doughnut",
    data: {
        labels: chartData.labels,
        datasets: [
            {
                label: "Expenses per month",
                data: chartData.data,
            },
        ],
    },
    options: {
        borderWidth: 10,
        borderRadius: 2,
        hoverBorderWidth: 0,
        plugins: {
            legend: {
                display: true,
            },
        },
    },
});

const populateUl = () => {
    chartData.labels.forEach((l, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${l}: <span class='percentage'>${chartData.data[i]}%</span>`;
        ul.appendChild(li);
    });
};

// populateUl();

// // API helpers 
// import { getIncomes, getExpenses } from './api'

// // Chart data logic
// export const fetchChartData = async () => {
//     // Get data and calculate totals
//     // ...

//     return chartData
// }