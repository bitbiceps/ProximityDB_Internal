import axios from "axios";
import apiRoutes from "./apiRoutes";

export const baseURL = "https://api.proximity.press";
// export const baseURL = "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getDashboardStats = async () => {
  return await api.get(apiRoutes.stats);
};

const requests = {
    getDashboardStats
};

export default requests;
