import React, { useState, useEffect, useCallback } from "react";
import RootLayout from "../layouts/RootLayout";
import requests from "../axios/instance";
import { toast } from "react-toastify";
import { TbLoader } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setSelectedProject } from "../redux/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils";

const Analytics = () => {
  const [page, setPage] = useState(1); // Track the current page
  const [limit] = useState(10); // Number of items per page (constant)
  const [data, setData] = useState([]); // The analytics data
  const [loading, setLoading] = useState(false); // Loading state for the API call
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Status and WIP styles
  const statusStyles = {
    completed: "bg-green-100 text-green-600",
    wip: "bg-yellow-100 text-yellow-600",
    pending: "bg-red-100 text-red-600",
  };

  const wipStyles = {
    completed: "bg-green-500",
    wip: "bg-yellow-500",
    pending: "bg-red-500",
  };

  // Fetch analytics data and handle pagination
  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    const toastId = toast.loading("Loading analytics...");

    try {
      const response = await requests.getPaginatedUsersAnalytics(page);
      const { users, pagination } = response.data;

      setData(users); // Set the users for the current page

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
      });
    } finally {
      setLoading(false);
    }
  }, [page]); // Only fetch when the page changes

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]); // Fetch data on mount and when page changes

  // Handle row click to select a project
  const handleSelectProject = (row) => {
    dispatch(setSelectedProject(row)); // Dispatch to Redux
    navigate(routes.project_overview); // Navigate to the project overview page
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0) setPage(newPage); // Only update page if valid
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
                      key={index + "Projects"}
                      className="hover:bg-gray-50 border-b last:border-none cursor-pointer"
                      onClick={() => handleSelectProject(row)}
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
                              wipStyles[row.status] || wipStyles.pending
                            }`}
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{row.outlet || "NA"}</td>
                      <td className="px-6 py-4">{row.dueDate || "NA"}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusStyles[row.status] || statusStyles.pending
                          } capitalize`}
                        >
                          {row.status}
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
            <span>Page {page}</span>
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Analytics;
