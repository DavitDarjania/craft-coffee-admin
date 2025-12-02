import { RouterProvider } from "react-router-dom";
import "./App.css";
import MainContainer from "./pages/MainPage";
import { router } from "./routes/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
