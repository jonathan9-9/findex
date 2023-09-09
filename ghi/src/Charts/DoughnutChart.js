import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ incomeData, expenseData }) {

    const incomeArray = incomeData?.datasets[0].data;
    const expenseArray = expenseData?.datasets[0].data;

    const monthlySavingsArray = incomeArray.map((income, index) => income - expenseArray[index]);

    const data = {
        labels: ['Income', 'Expenses', 'Savings'],
        datasets: [{
            data: [
                incomeArray.reduce((a, b) => a + b, 0),
                expenseArray.reduce((a, b) => a + b, 0),
                monthlySavingsArray.reduce((a, b) => a + b, 0)
            ],
            backgroundColor: [
                'rgba(46, 234, 171, 0.88)',
                'rgba(255, 81, 81, 1)',
                'rgba(73, 136, 239, 1.0)'
            ]
        }]
    };

    return (
        <div style={{ textAlign: 'center', width: '40%', margin: '0 auto' }}>
            <Doughnut
                data={data}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Total Income, Expenses, and Savings',
                            font: {
                                size: 20
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default DoughnutChart;
