import React, { useState } from 'react';

const DetailsSection = () => {
  const [activeTab, setActiveTab] = useState('Details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Details':
        return (
          <div className="mt-4">
            <table className="table-auto w-full text-left border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">No. Of Reviews Done</td>
                  <td className="py-2">Empty</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Client Type</td>
                  <td className="py-2">Empty</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Status</td>
                  <td className="py-2">
                    <div className="relative w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-1/2 bg-yellow-400"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Description</td>
                  <td className="py-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla ultrices purus at pulvinar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Title Review':
        return (
          <div className="mt-4">
            <p className="text-gray-600">Title review content goes here...</p>
          </div>
        );
      case 'Article Review':
        return (
          <div className="mt-4">
            <p className="text-gray-600">Article review content goes here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla ultrices purus at pulvinar.
      </h2>

      {/* Overview Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">Status</p>
          <p className="font-semibold text-green-500">Delivered</p>
        </div>
        <div>
          <p className="text-gray-600">Start Date</p>
          <p className="font-semibold">10/05/2024</p>
        </div>
        <div>
          <p className="text-gray-600">Time Estimate</p>
          <p className="font-semibold">Empty</p>
        </div>
        <div>
          <p className="text-gray-600">Due Date</p>
          <p className="font-semibold">18/08/2024</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b">
        {['Details', 'Title Review', 'Article Review'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default DetailsSection;
