import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import ProductDetails from "../features/Catalog/ProductDetails";
import Catalog from "../features/Catalog/Catalog";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ServerError from "../app/errors/ServerError";
import NotFound from "../app/errors/NotFound";
import BasketPage from "../features/Basket/BasketPage";
import CheckoutPage from "../features/checkout/CheckOutPage";
import Login from "../features/account/Login";
import Register from "../features/account/Register";
import RequireAuth from "./RequireAuth";
import Orders from "../features/orders/Order";
import CheckoutWrapper from "../features/checkout/CheckoutWrapper";
import Inventory from "../features/admin/Inventory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <CheckoutWrapper /> },
          { path: "orders", element: <Orders /> },
        ],
      },
      {
        element: <RequireAuth roles={["Admin"]} />,
        children: [{ path: "inventory", element: <Inventory /> }],
      },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "basket", element: <BasketPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
