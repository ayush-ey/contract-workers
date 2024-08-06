// app.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import AddWork from "./components/AddWork";
import ViewWorks from "./components/ViewWorks";
import EditWorks from "./components/EditWorks";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/edit">Edit</Link>
            </li>
            <li>
              <Link to="/view">View</Link>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/add" element={<AddWork />} />
            <Route path="/edit" element={<EditWorks />} />
            <Route path="/view" element={<ViewWorks />} />
            <Route path="/" element={<Navigate to="/view" />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
