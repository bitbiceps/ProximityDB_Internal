import React from "react";
import RootLayout from "../layouts/RootLayout";

const Analytics = () => {
  const data = [
    {
      name: "Lorem Ipsum",
      wip: "green",
      outlet: "Zee News",
      dueDate: "01/12/2024",
      status: "Delivered",
    },
    {
      name: "Lorem Ipsum",
      wip: "yellow",
      outlet: "Zee News",
      dueDate: "01/12/2024",
      status: "In-Progress",
    },
    {
      name: "Lorem Ipsum",
      wip: "red",
      outlet: "Zee News",
      dueDate: "01/12/2024",
      status: "Not Started",
    },
    {
      name: "Lorem Ipsum",
      wip: "red",
      outlet: "Zee News",
      dueDate: "01/12/2024",
      status: "Not Started",
    },
    {
      name: "Lorem Ipsum",
      wip: "green",
      outlet: "Zee News",
      dueDate: "01/12/2024",
      status: "Delivered",
    },
    {
        name: "Lorem Ipsum",
        wip: "red",
        outlet: "Zee News",
        dueDate: "01/12/2024",
        status: "Not Started",
      },
      {
        name: "Lorem Ipsum",
        wip: "red",
        outlet: "Zee News",
        dueDate: "01/12/2024",
        status: "Not Started",
      },
      {
        name: "Lorem Ipsum",
        wip: "green",
        outlet: "Zee News",
        dueDate: "01/12/2024",
        status: "Delivered",
      },
  ];

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

  return (
    <RootLayout>
    <div className=" min-h-screen p-6">
     

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 px-6 py-6">Analytics</h1>
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
                  <span>{row.name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-32 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`absolute top-0 h-2 rounded-full ${
                        wipStyles[row.wip]
                      }`}
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4">{row.outlet}</td>
                <td className="px-6 py-4">{row.dueDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[row.status]
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </RootLayout>
  );
};

export default Analytics;
