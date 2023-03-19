import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import CoursesPage from "./components/CoursesPage";
import LessonPage from "./components/LessonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path={"/courses/:id"} element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/courses" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
