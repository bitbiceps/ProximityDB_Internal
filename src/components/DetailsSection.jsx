import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { formatDate, projectStatus } from "../utils";
import requests from "../axios/instance";
import { toast } from "react-toastify";

// Optimized AccordionItem
const AccordionItem = ({
  article,
  topic,
  idx,
  activeIndex,
  toggleAccordion,
}) => {
  const handleArticleSubmit = useCallback(async () => {
    try {
      const { data } = await requests.completeArticle({
        articleId: article._id,
      });
      toast.success(data.message);
      toggleAccordion(idx);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while submitting the article."
      );
    }
  }, [article._id, toggleAccordion, idx]);

  const getStatusClass = (status) => {
    switch (status) {
      case "review":
        return "text-yellow-500";
      case "pending":
        return "text-red-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="flex w-full items-center justify-between p-4">
        <button
          onClick={() => toggleAccordion(idx)}
          className="w-fit text-left font-semibold rounded-t-lg capitalize"
        >
          {topic.finalTopic}
        </button>
        <p className={`capitalize ${getStatusClass(article.status)}`}>
          {article.status}
        </p>
      </div>
      {activeIndex === idx && (
        <div className="p-4 bg-white">
          <p>{article.value}</p>
          <button
            type="button"
            disabled={article.status === "completed"}
            onClick={handleArticleSubmit}
            className={article.status==="completed"?"bg-app-blue-1 opacity-70 text-white cursor-not-allowed rounded-lg px-4 py-2 mt-2":"bg-app-blue-1 hover:opacity-70 text-white rounded-lg px-4 py-2 mt-2"}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

// Main DetailsSection Component
const DetailsSection = () => {
  const [activeTab, setActiveTab] = useState("Details");
  const [activeIndex, setActiveIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTopicIds, setActiveTopicIds] = useState([]);

  const project = useSelector(
    ({ project: { selectedProject } }) => selectedProject
  );
 console.log("project",project)
  const fetchUsersReviewCount = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await requests.getUserReviewCount(project._id);
      console.log("data", data);
      setCount(data.count || 0);
      setTopics(data.topics || []);
      setArticles(data.article || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    if (project?._id) {
      fetchUsersReviewCount();
    }
  }, [project, fetchUsersReviewCount]);

  const { statusClassName, progressBarClassName } = useMemo(() => {
    switch (project.status) {
      case projectStatus.pending:
        return {
          statusClassName: "text-red-500",
          progressBarClassName: "bg-red-500",
        };
      case projectStatus.wip:
        return {
          statusClassName: "text-yellow-500",
          progressBarClassName: "bg-yellow-500",
        };
      case projectStatus.completed:
        return {
          statusClassName: "text-green-500",
          progressBarClassName: "bg-green-500",
        };
      default:
        return {
          statusClassName: "text-gray-600",
          progressBarClassName: "bg-gray-200",
        };
    }
  }, [project.status]);

  const tabs = ["Details", "Title Review", "Article Review"];

  const handleCompleteTopic = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        await requests.completeTopic(payload); // Send API request to complete the topic

        fetchUsersReviewCount(); // Reload topics and counts to reflect changes
      } catch (error) {
        console.error("Error completing topic:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchUsersReviewCount]
  );

  const toggleAccordion = (idx) =>
    setActiveIndex(activeIndex === idx ? null : idx);

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "Details":
        return (
          <div className="mt-4">
            <table className="table-auto w-full text-left border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 text-gray-600">No. Of Reviews Done</td>
                  <td className="py-2">{count}</td>
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
              topics
                .filter(
                  (topic) =>
                    topic.status === "review" || topic.status === "completed"
                )
                .map((topic, idx) => (
                  <div
                    key={topic._id}
                    className="capitalize flex items-center gap-2 mb-2"
                  >
                    <div>{idx + 1}</div>
                    <div className="flex-1 flex gap-2">
                      {topic.topics.map((singles, index) => (
                        <button
                          key={singles._id}
                          onClick={() =>
                            handleCompleteTopic({ index, _id: topic._id })
                          }
                          disabled={topic.status === "completed"}
                          className={`text-sm border border-gray-300 px-4 py-2 rounded-lg hover:border-black cursor-pointer ${
                            topic.finalTopic === singles.value
                              ? "text-white bg-green-500 border-none"
                              : topic.status != "completed"
                              ? " border-gray-300"
                              : "opacity-50 cursor-not-allowed hover:cursor-not-allowed"
                          }`}
                        >
                          {singles.value}
                        </button>
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
              articles
                .filter(
                  (topic) =>
                    topic.status === "review" || topic.status === "completed"
                )
              .map((article, idx) => {
                  const topic = topics.find((t) => t._id === article.topicId);
                  return topic ? (
                    <AccordionItem
                      key={article._id}
                      article={article}
                      topic={topic}
                      idx={idx}
                      activeIndex={activeIndex}
                      toggleAccordion={toggleAccordion}
                    />
                  ) : null;
                })
            )}
          </div>
        );

      default:
        return null;
    }
  }, [
    activeTab,
    count,
    topics,
    articles,
    progressBarClassName,
    activeIndex,
    handleCompleteTopic,
  ]);

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
