import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AssistantPage from "./pages/AssistantPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import PopupGuide from "./components/PopupGuide";

export default function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-100">

        <Navbar />

        <main className="flex-grow">

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>

        </main>

        <Footer />

        <PopupGuide />

      </div>

    </BrowserRouter>
  );
}
