import { Bar } from "react-chartjs-2";


function BarChart({ chartData }) {
    return (
        <div className="chart-container" style={{ width: "80%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Monthly gained income 2023"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};
export default BarChart;
