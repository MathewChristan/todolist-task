import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Setting from "./Pages/Setting";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
