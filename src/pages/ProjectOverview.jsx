import React from 'react';
import DetailsSection from '../components/DetailsSection';

import ActivitySection from '../components/ActivitySection';
const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-6">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6 mb-6 lg:mb-0">
        <DetailsSection />
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <ActivitySection />
      </div>
    </div>
  );
};

export default Dashboard;
