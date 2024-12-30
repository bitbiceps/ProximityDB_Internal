import React, { useState, useEffect } from "react";
import RootLayout from "../layouts/RootLayout";
import requests from "../axios/instance";
import { toast } from "react-toastify"; // Import Toastify components
import { TbLoader } from "react-icons/tb"; // Import Loader Icon

const Analytics = () => {
  const [page, setPage] = useState(1); // Track the current page
  const [limit, setLimit] = useState(10); // Number of items per page
  const [data, setData] = useState([]); // The analytics data
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users
  const [loading, setLoading] = useState(false); // Loading state for the API call

  // Styles for status and WIP
  const statusStyles = {
    Delivered: "bg-green-100 text-green-600",
    "In-Progress": "bg-yellow-100 text-yellow-600",
    "Not Started": "bg-red-100 text-red-600",
  };

  const wipStyles = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  // Fetch data when the page or limit changes
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);
      const toastId = toast.loading("Loading analytics..."); // Show loading toast
      try {
        // Call the API with current page and limit
        const {
          data: { users, pagination },
        } = await requests.getPaginatedUsersAnalytics(page);

        // Assuming the response contains the data and the totalUsers count
        setData(users); // Set the users for the current page
        setTotalUsers(pagination.totalUsers); // Set the total users count

        // Display success toast after data is successfully fetched
        toast.update(toastId, {
          render: "Data loaded successfully!",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast.update(toastId, {
          render: "Failed to load data",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        }); // Show error toast if the API call fails
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [page, limit]); // Fetch data when page or limit changes

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <RootLayout>
      <div className="min-h-screen p-6">
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4 px-6 py-6">Analytics</h1>

          {loading ? (
            <div className="h-[90vh] flex justify-center items-center">
              <TbLoader className="animate-spin text-3xl" />
            </div>
          ) : (
            <>
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="text-sm font-semibold text-gray-600 border-b">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">WIP</th>
                    <th className="px-6 py-4">Outlet</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 border-b last:border-none"
                    >
                      <td className="px-6 py-4 flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-500"
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
                        <span>{row.fullName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative w-32 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`absolute top-0 h-2 rounded-full ${
                              wipStyles[row.status || "red"]
                            }`}
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{row.outlet || "NA"}</td>
                      <td className="px-6 py-4">{row.dueDate || "NA"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles["Not Started"]}`}
                        >
                          {row.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <div className="flex items-center">
            <span>
              Page {page} of {Math.ceil(totalUsers / limit)}
            </span>
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page * limit >= totalUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Toast Container */}
    </RootLayout>
  );
};

export default Analytics;
