import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./routes/home";
import Product from "./routes/product";
import Offers from "./routes/offers";
import Doffers from "./routes/doffers";
import Coffers from "./routes/coffers";
import Cart from "./routes/cart";
import Category from "./routes/category";
import Checkout from "./routes/checkout";
import Login from "./routes/login";
import Register from "./routes/register";
import Profile from "./routes/profile";
import Account from "./routes/account";
import Wishlist from "./routes/wishlist";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    }, 
    {
      path: "c/:categoryId",
      element: <Category />,
    },
    {
      path: "p/:productId",
      element: <Product />,
    },
    {
      path: "o/:productId",
      element: <Offers />,
    }
    ,
    {
      path: "do/:productId",
      element: <Doffers />,
    },
    {
      path: "co/:productId",
      element: <Coffers />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/cart",
      element: <Cart />,
    }
    ,
    {
      path: "/login",
      element: <Login />,
    }
    ,
    {
      path: "/register",
      element: <Register />,
    }
    ,
    {
      path: "/wishlist",
      element: <Wishlist />,
    }
    ,
    {
      path: "/profile",
      element: <Profile />,
    }
    ,
    {
      path: "/account",
      element: <Account />,
    }
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);