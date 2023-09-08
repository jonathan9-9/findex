import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ chartData }) {

    return (
        <div className="chart-container" style={{ width: "40%", margin: "0 auto" }}>

            <h2 style={{ textAlign: "center" }}>Income Breakdown</h2>

            <Doughnut
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Income Breakdown'
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }}
            />

        </div>
    );
}

export default DoughnutChart;