import { Routes, Route } from "react-router-dom";

import Startup from "./pages/xStartup";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Startup /> } />
    </Routes>
  )
}