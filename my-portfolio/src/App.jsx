

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";
import EducationPage from "./EducationPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}