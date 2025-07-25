import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import InnovestHackPage from "./pages/InnovestHackPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/innovesthack" element={<InnovestHackPage />} />
    </Routes>
  );
}

export default App;
