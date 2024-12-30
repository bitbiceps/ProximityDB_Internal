import axios from "axios";
import apiRoutes from "./apiRoutes";

// export const baseURL = "https://api.proximity.press";
export const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getDashboardStats = async () => {
  return await api.get(apiRoutes.stats);
};
const getPaginatedUsersAnalytics = async (page) => {
  return await api.get(apiRoutes.paginatedAnalytics(page));
};

const getUserReviewCount = async (userId) => {
  return await api.get(apiRoutes.getReviewCount(userId));
};

const completeTopic = async (payload) => {
  return await api.patch(apiRoutes.completeTopic, payload);
};

const requests = {
  getDashboardStats,
  getPaginatedUsersAnalytics,
  getUserReviewCount,
  completeTopic,
};

export default requests;
