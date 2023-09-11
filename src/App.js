import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateHabit from "./pages/CreateHabitPage";
import MyHabit from "./pages/MyHabitPage";
import GroupPage from "./pages/GroupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-habit/:nickname/new-habit" element={<CreateHabit />} />
        <Route path="/my-habit/:nickname" element={<MyHabit />} />
        <Route path="/group/:groupId" element={<GroupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
