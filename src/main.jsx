import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NewTask from "./components/NewTask.jsx";
import TaskDetail from "./components/TaskDetail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="newtask" element={<NewTask />} />
          <Route path="taskdetail/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
