import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import App from "../App.tsx";
import Wraper from "../utilities/Wraper";
import ErrorPage from "../utilities/ErrorPage";
import Football from "../components/football/Football";
import League from "../components/football/league/League";
import SoccorHomePage from "../components/football/SoccorHomePage";
import SignUp from "../components/login/SignUp";
//creating the router path.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  { path: "/soccor/home", element: <SoccorHomePage /> },
  {
    path: "/",
    element: <Wraper />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/admin",
    element: <Wraper />,
    children: [
      { path: "/admin/football/predict", element: <Football /> },
      { path: "/admin/football", element: <League /> },
    ],
  },
]);
export default router;
