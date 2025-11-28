import { Routes, Route } from "react-router-dom";

import Startup from "./pages/Startup";
import Dashboard from "./pages/Dashboard";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Startup /> } />
      <Route path="/dashboard" element={ <Dashboard /> } />
    </Routes>
  )
}