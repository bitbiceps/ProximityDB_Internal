export const routes = {
  root: "/",
  package: "/package",
  login: "/login",
  registration: "/registration",

  profile: "/profile",
  logout: "/logout",
  error: "*",
  internal_dashboard: "/internal_dashboard",
  analytics: "/analytics",
  project_overview: "/project_overview",
};

export const sideBarTabs = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  profile: "Profile",
  logout: "Logout",
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const projectStatus = {
  pending: "pending",
  wip: "wip",
  completed: "completed",
};

export const cookieAccessKeys = {
  tokens: {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  },
};