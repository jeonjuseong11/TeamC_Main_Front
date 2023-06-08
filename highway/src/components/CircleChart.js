import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        font: {
          size: 10,
        },
      },
    },
  },
};
const CircleChart = ({ male, female }) => {
  return (
    <div style={{ marginLeft: "5rem" }}>
      <h4 style={{ margin: "0", marginTop: "1rem" }}>학교 성비</h4>
      <div style={{ width: "10rem", height: "10rem" }}>
        <Doughnut
          data={{
            labels: ["남성", "여성"],
            datasets: [
              {
                data: [male, female],
                backgroundColor: ["#628BFA", "#F55F58"],
                borderWidth: 0,
              },
            ],
          }}
          options={options}
        />
      </div>
    </div>
  );
};
export default CircleChart;
