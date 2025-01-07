import React, { useCallback, useEffect, useState } from "react";
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
import requests from "../axios/instance";
import { toast } from "react-toastify";

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

const Dashboard = () => {
  // State for stats
  const [stats, setStats] = useState({
    pending: { count: 0, rise: 8.5 },
    review: { count: 0, rise: 8.5 },
    completed: { count: 0, rise: 8.5 },
  });

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

  const doughnutData = (color) => ({
    datasets: [
      {
        data: [350, 100],
        backgroundColor: [color, "#e5e7eb"],
        cutout: "75%", // Makes the doughnut chart
      },
    ],
  });

  // Create a mapping from titles to the keys in the stats object
  const titleToKeyMap = {
    "Completed Tasks": "completed",
    "Pending Tasks": "pending",
    "Waiting for Review": "review",
  };

  const initialStats = useCallback(async () => {
    const toastId = toast.loading("Fetching stats..."); // Start loading toast

    try {
      const {
        data: { data },
      } = await requests.getDashboardStats(); // Fetch stats

      // Once the data is fetched, update the toast to a success message
      toast.update(toastId, {
        render: "Success",
        type: "success",
        isLoading: false,
        autoClose: 3000, // Optional, auto-close after 3 seconds
      });

      // Update stats state with the fetched data
      setStats({
        pending: data.pending || { count: 0, rise: 8.5 },
        review: data.review || { count: 0, rise: 8.5 },
        completed: data.completed || { count: 0, rise: 8.5 },
      });

      console.log(data); // Log to inspect the fetched data
    } catch (error) {
      // On error, update the toast to an error message
      toast.update(toastId, {
        render: error.message || "Failed to fetch.",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Optional, auto-close after 3 seconds
      });
    }
  }, []);

  useEffect(() => {
    initialStats();
  }, [initialStats]);

  return (
    <RootLayout>
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Dashboard
        </h1>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {["Completed Tasks", "Pending Tasks", "Waiting for Review"].map(
            (title, index) => {
              const key = titleToKeyMap[title]; // Use the map to get the key
              const stat = stats[key] || { count: 0, rise: 8.5 }; // Default to 0 if no data
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">
                      {title}
                    </h2>
                    <p className="text-xl sm:text-2xl font-bold">
                      {stat.count}
                    </p>
                    <p className="text-xs sm:text-sm text-green-500 mt-1">
                      ↑ {stat.rise}% Up from Last Week
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
              );
            }
          )}
        </div>

        {/* Graph Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-1 lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Visual Representation
            </h2>
            <Line data={lineChartData} />
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              Profile Readiness
            </h2>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <Doughnut data={doughnutData("#6366F1")} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg sm:text-2xl font-bold">
                  {stats.pending.count}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Doughnut Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["#6366F1", "#FB923C", "#A855F7"].map((color, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center justify-center"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Profile Readiness
              </h2>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <Doughnut data={doughnutData(color)} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg sm:text-2xl font-bold">340</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default Dashboard;
