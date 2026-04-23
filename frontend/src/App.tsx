import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Words from "./Words";
import Articles from "./Articles";
import SingleTopic from "./SingleTopic";
// import Settings from "./Settings";
import Topics from "./Topics";
import "./style/App.css";

export default function App() {
  return (
    <Router>
      <nav className="tab-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Topics</NavLink>
        <NavLink to="/words" className={({ isActive }) => (isActive ? "active" : "")}>Words</NavLink>
        <NavLink to="/articles" className={({ isActive }) => (isActive ? "active" : "")}>Articles</NavLink>
        {/* <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>Settings</NavLink> */}
      </nav>

      <Routes>
        <Route path="/" element={<Topics />} />
        <Route path="/topic/:id" element={<SingleTopic />} />
        <Route path="/words" element={<Words />} />
        <Route path="/articles" element={<Articles />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
}
