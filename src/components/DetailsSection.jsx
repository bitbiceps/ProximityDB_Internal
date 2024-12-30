import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { formatDate, projectStatus } from "../utils";
import requests from "../axios/instance";

const DetailsSection = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const project = useSelector(
    ({ project: { selectedProject } }) => selectedProject
  );

  const [count, setCount] = useState(0);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch review counts (topics and articles)
  const fetchUsersReviewCount = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true when starting the fetch
      const { data } = await requests.getUserReviewCount(project._id);
      setCount(data.count || 0);
      setTopics(data.topics || []);
      setArticles(data.articles || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  }, [project]);

  useEffect(() => {
    if (project?._id) {
      fetchUsersReviewCount();
    }
  }, [project, fetchUsersReviewCount]);

  const { statusClassName, progressBarClassName } = useMemo(() => {
    let statusClass = "text-gray-600";
    let progressBarClass = "bg-gray-200";

    switch (project.status) {
      case projectStatus.pending:
        statusClass = "text-red-500";
        progressBarClass = "bg-red-500";
        break;
      case projectStatus.wip:
        statusClass = "text-yellow-500";
        progressBarClass = "bg-yellow-500";
        break;
      case projectStatus.completed:
        statusClass = "text-green-500";
        progressBarClass = "bg-green-500";
        break;
      default:
        break;
    }

    return {
      statusClassName: statusClass,
      progressBarClassName: progressBarClass,
    };
  }, [project.status]);

  const tabs = ["Details", "Title Review", "Article Review"];

  const handleCompleteTopic = async (payload) => {
    try {
      setLoading(true); // Set loading to true when the topic is being marked as completed
      const data = await requests.completeTopic(payload);
      console.log(data);
      
      // Re-fetch the updated data after marking the topic as completed
      fetchUsersReviewCount(); // Reload the topics and counts
    } catch (error) {
      console.error("Error completing topic:", error);
    } finally {
      setLoading(false); // Set loading to false once the operation completes
    }
  };

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "Details":
        return (
          <div className="mt-4">
            <table className="table-auto w-full text-left border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">No. Of Reviews Done</td>
                  <td className="py-2">{count || 0}</td>{" "}
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Client Type</td>
                  <td className="py-2">Empty</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-600">Status</td>
                  <td className="py-2">
                    <div className="relative w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full w-1/2 ${progressBarClassName}`}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "Title Review":
        return (
          <div className="mt-4">
            {topics.length === 0 ? (
              <p>No topics in review.</p>
            ) : (
              topics.map((topic, idx) => (
                <div
                  key={idx + "topicDetails"}
                  className="capitalize flex items-center gap-2 mb-2"
                >
                  <div>{idx + 1}</div>
                  <div className="flex-1 flex gap-2">
                    {topic.topics.map((singles, index) => (
                      <div
                        key={singles._id}
                        onClick={() =>
                          handleCompleteTopic({ index, _id: topic._id })
                        }
                        className={`text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-black cursor-pointer ${
                          topic.finalTopic === singles.value
                            ? "text-white bg-green-500 border-none"
                            : ""
                        }`}
                      >
                        {singles.value}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "Article Review":
        return (
          <div className="mt-4">
            {articles.length === 0 ? (
              <p>No articles in review.</p>
            ) : (
              articles.map((article, idx) => (
                <div key={idx + "articleDetails"}>{article.status}</div>
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, count, topics, articles, progressBarClassName]);

  return (
    <div>
      {/* Overview Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">Status</p>
          <p className={`font-semibold capitalize ${statusClassName}`}>
            {project.status}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Start Date</p>
          <p className="font-semibold">{formatDate(project.createdAt)}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        renderTabContent
      )}
    </div>
  );
};

export default DetailsSection;
