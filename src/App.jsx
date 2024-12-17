import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/SideBar/SideBar";
import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";
import Registration from "./pages/Registraion";
import { routes } from "./utils";

import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";

import InternalDashboard from "./pages/InternalDashboard";
import Analytics from "./pages/Analytics";
import ProjectOverview from "./pages/ProjectOverview";
const App = () => {
  const location = useLocation();
  const validRoutes = Object.values(routes); // Extract the valid route paths from the routes object
  const isValidRoute = validRoutes.includes(location.pathname); // Check if the current location matches any of the valid routes

  // Determine if we should show the Sidebar
  const isNoSidebar = [routes.login, routes.registration].includes(
    location.pathname
  ); // Example of routes with no sidebar
  const isErrorRoute = !isValidRoute; // If it's not a valid route, it's an error (404)

  return (
    <Provider store={store}>
      <div className="antialiased flex h-screen">
        {!isNoSidebar && !isErrorRoute && (
          <div className="relative w-fit h-screen">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 overflow-auto min-h-screen">
          <Routes>
            <Route path={routes.login} Component={Login} />
            <Route path={routes.registration} Component={Registration} />
            <Route path={routes.root} Component={Dashboard} />

            <Route path={routes.error} Component={ErrorPage} />

            <Route path={routes.profile} Component={Profile} />
            <Route
              path={routes.internal_dashboard}
              Component={InternalDashboard}
            />
            <Route path={routes.project_overview} Component={ProjectOverview} />
            <Route path={routes.analytics} Component={Analytics} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
};

export default App;
