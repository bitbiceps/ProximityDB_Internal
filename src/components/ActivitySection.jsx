import requests from "../axios/instance";
import { useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";

const ActivitySection = () => {
  const [topics, setTopics] = useState([]);

  const project = useSelector(
    ({ project: { selectedProject } }) => selectedProject
  );

  const activities = [
    {
      name: "Name of the client",
      lastReviewed: "05/11/24",
      lastVerified: "28/10/24",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Name of the client",
      lastReviewed: "05/11/24",
      lastVerified: "28/10/24",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const fetchUsersReviewCount = useCallback(async () => {
    try {
      const { data } = await requests.getUserReviewCount(project._id);
      console.log("Fetched Data:", data);
      setTopics(data.topics || []);
    } catch (error) {
      console.error(error);
    }
  }, [project]);

  useEffect(() => {
    if (project?._id) {
      fetchUsersReviewCount();
    }
  }, [project, fetchUsersReviewCount]);

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">Activity</h3>
      {activities.map((activity, index) => (
        <div
          key={index}
          className="mb-4 border rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          <p className="font-semibold text-gray-800">{activity.name}</p>
          <p className="text-gray-600 text-sm">
            Last Reviewed: {activity.lastReviewed}
          </p>
          <p className="text-gray-600 text-sm">
            Last Verified: {activity.lastVerified}
          </p>
          <p className="text-gray-600 text-sm mt-2">{activity.comment}</p>
        </div>
      ))}

      {/* Display Client Suggestions */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Client Suggestions</h3>
        {topics.length > 0 ? (
          topics
            .filter((topic) => topic.suggestion) // Ensure suggestion is not null
            .map((topic, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 p-4 bg-gray-50 border rounded-lg shadow-sm"
              >
                <p className="text-gray-800 text-sm">{topic.suggestion}</p>
                <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded-full hover:bg-blue-600">
                  Give Suggestion
                </button>
              </div>
            ))
        ) : (
          <p className="text-gray-600 text-sm">No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
