const apiRoutes = {
    stats: "/internal/stats",
    paginatedAnalytics:(page) => `/internal/users?page=${page}?limit=${10}`
  };
  
  export default apiRoutes;