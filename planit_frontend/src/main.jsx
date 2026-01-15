import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { CategoryProvider } from "./context/CategoriesContext.jsx";

createRoot(document.getElementById("root")).render(
  <CategoryProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </CategoryProvider>
);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
