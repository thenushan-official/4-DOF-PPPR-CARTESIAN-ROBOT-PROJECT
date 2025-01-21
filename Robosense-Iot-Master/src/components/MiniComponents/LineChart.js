import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ chartData, type }) {
  return (
    <div className=" w-full">
      <Line
        data={{
          labels: chartData.map((data) => data.time), // Use attributes for labels
          datasets: [
            {
              label: `${type === "Vibration" ? "VibrationX" : "Temperature"}`,
              data: chartData.map((data) => data.value), // Data for first line
              borderColor: "#637adb",
              backgroundColor: "#637adb",
              tension: 0.2,
              borderWidth: 0.7,
              pointRadius: 2,
            },
            {
              label: "VibrationY",
              data: chartData.map((data) => data.value2), // Data for second line
              borderColor: "#ca682b",
              backgroundColor: "#ca682b",
              tension: 0.2,
              borderWidth: 0.7,
              pointRadius: 2,
            },
            {
              label: "VibrationZ",
              data: chartData.map((data) => data.value3), // Data for third line
              borderColor: "#23f538",
              backgroundColor: "#23f538",
              tension: 0.2,
              borderWidth: 0.7,
              pointRadius: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false, // Show legend for clarity
              position: "top",
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                color: "#1f2539",
              },
              ticks: {
                stepSize: 1,
                color: "#726975",
              },
            },
            y: {
              position: "right",
              grid: {
                drawBorder: true,
                color: "#1f2539",
              },
              ticks: {
                stepSize: 6, // Adjust this for better visualization
                color: "#726975",
              },
              beginAtZero: false, // Ensure the chart starts from 0
            },
          },
        }}
      />
    </div>
  );
}
