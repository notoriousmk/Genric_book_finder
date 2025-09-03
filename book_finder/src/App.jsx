import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookFinderApp from "./pages/BookFinderApp";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookFinderApp />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}