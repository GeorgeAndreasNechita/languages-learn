import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Words from "./Words";
import Articles from "./Articles";
import Settings from "./Settings";
import Thematics from "./Thematics";
// import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="tab-nav">
        <Link to="/">Words</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/thematics">Themen</Link>
        <Link to="/settings">Settings</Link>
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
