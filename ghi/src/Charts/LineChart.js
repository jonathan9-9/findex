import { Line } from "react-chartjs-2";




function LineChart({ chartData }) {
    return (
        <div className="chart-container" style={{ width: "80%", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center" }}>Income Analysis by Month</h2>
            <Line
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
export default LineChart;
