import ReactDOM from "react-dom/client";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
