import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import MainPage from "../pages/MainPage";
import IngredientPage from "../pages/IngredientPage";
import EditMain from "../pages/EditMain";
import EditIngredient from "../pages/EditIngredient";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <MainPage />,
        path: "/",
      },
      {
        element: <IngredientPage />,
        path: "/ingredient",
      },
    ],
  },
]);
