import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Words from "./Words";
import Articles from "./Articles";
import Settings from "./Settings";
import Thematics from "./Thematics";
// import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="tab-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Words</NavLink>
        <NavLink to="/articles" className={({ isActive }) => (isActive ? "active" : "")}>Articles</NavLink>
        <NavLink to="/thematics" className={({ isActive }) => (isActive ? "active" : "")}>Themen</NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>Settings</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Words />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/thematics" element={<Thematics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
