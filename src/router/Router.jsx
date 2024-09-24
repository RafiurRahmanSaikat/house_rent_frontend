import { createBrowserRouter } from "react-router-dom";

import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

import Home from "../components/Home/Home";

import ErrorPage from "../components/core/ErrorPage";
import Dashboard from "../components/Dashboard/core/Dashboard";
import AddHouse from "../components/Dashboard/User/AddHouse";
import EditHouse from "../components/Dashboard/User/EditHouse";
import Favourite from "../components/Dashboard/User/Favorites";
import RentRequestList from "../components/Dashboard/User/RentRequestList";
import HouseDetail from "../components/Home/components/HouseDetail";
import DashboardLayout from "../layout/DashboardLayout";
import Layout from "../layout/Layout";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../components/Dashboard/User/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage message={"404 Not Found"} />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "advertise/:advertiseId", element: <HouseDetail /> },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage message={"404 Not Found"} />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "addHouse", element: <AddHouse /> },
      { path: "editProfile", element: <EditProfile /> },
      { path: "favourite", element: <Favourite /> },
      { path: "rentRequestList", element: <RentRequestList /> },
      { path: "editHouse/:id", element: <EditHouse /> },
    ],
  },
]);

export { router };
