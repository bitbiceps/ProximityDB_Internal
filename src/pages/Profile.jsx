import React from "react";
import RootLayout from "../layouts/RootLayout";

const Profile = () => {
  return (
    <RootLayout>
      <div className=" flex  justify-center ">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-5xl">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
              <button className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v2h1a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1h1V3zm10 2V3H6v2h8zM4 9v7h12V9H4zm8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-700">
              Upload Photo
            </h2>
          </div>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-2 px-16 gap-16">
              <div>
                <label className="block text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 px-16 gap-16">
              <div>
                <label className="block text-sm text-gray-600">
                 Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Phone Number</label>
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            

            <div className="grid grid-cols-2  px-16 gap-16">
              <div>
                <label className="block text-sm text-gray-600">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mr-48">
                <label className="block text-sm text-gray-600">Gender</label>
                <select className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="px-[400px] py-4">
              <button
                type="submit"
                className="w-full bg-[#4D49F6] text-white py-3 rounded-md text-sm font-medium "
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
