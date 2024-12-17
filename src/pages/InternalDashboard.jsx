import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import RootLayout from "../layouts/RootLayout";

// Register necessary Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale, // Required for categorical x-axis
  LinearScale, // Required for numerical y-axis
  PointElement, // Required for points on the line
  LineElement, // Required for line drawing
  Filler // Required for area filling
);

const InternalDashboard = () => {
  // Line chart data
  const lineChartData = {
    labels: ["5", "15", "25", "35", "45", "55"],
    datasets: [
      {
        label: "Pending",
        data: [20, 40, 60, 80, 60, 40],
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        borderColor: "rgba(239, 68, 68, 1)",
        fill: true,
      },
      {
        label: "Completed",
        data: [30, 50, 70, 90, 70, 50],
        backgroundColor: "rgba(99, 102, 241, 0.3)",
        borderColor: "rgba(99, 102, 241, 1)",
        fill: true,
      },
    ],
  };

  // Doughnut chart data generator
  const doughnutData = (color) => ({
    datasets: [
      {
        data: [350, 100],
        backgroundColor: [color, "#e5e7eb"],
        cutout: "75%", // Makes the doughnut chart
      },
    ],
  });

  return (
    <RootLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            "Completed Tasks",
            "Pending Tasks",
            "Waiting for Review",
            "Waiting for Review",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div>
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                <p className="text-2xl font-bold">40,689</p>
                <p className="text-sm text-green-500 mt-1">
                  ↑ 8.5% Up from Last Week
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a6 6 0 100 12A6 6 0 0010 2zM8 7a2 2 0 114 0 2 2 0 01-4 0zm2 5a4 4 0 100-8 4 4 0 000 8zm-6 3a6 6 0 0111.98 0H4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Visual Representation
            </h2>
            <Line data={lineChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Profile Readiness</h2>
            <div className="relative w-40 h-40">
              <Doughnut data={doughnutData("#6366F1")} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-2xl font-bold">350</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Doughnut Charts */}
        <div className="grid grid-cols-3 gap-6">
          {["#6366F1", "#FB923C", "#A855F7"].map((color, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-semibold mb-4">Profile Readiness</h2>
              <div className="relative w-40 h-40">
                <Doughnut data={doughnutData(color)} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl font-bold">340</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default InternalDashboard;
