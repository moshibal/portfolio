import ReactDOM from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/login/Login";
import App from "./App.tsx";
import Wraper from "./utilities/Wraper";
import ErrorPage from "./utilities/ErrorPage";
import Football from "./components/football/Football";
import League from "./components/football/league/League";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <Wraper />,
    children: [
      { path: "/admin", element: <Login /> },
      { path: "/admin/football/predict", element: <Football /> },
      { path: "/admin/football", element: <League /> },
    ],
  },
]);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
