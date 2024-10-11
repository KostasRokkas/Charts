import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BarChart from "./components/BarChart";
import classes from "./App.module.css";
import TimelineChart from "./components/TimeLineChart";
import PieChart from "./components/PieChart ";

// Defining the links for navigation
const links = [
  {
    title: "Bar chart", // Title displayed in the navbar
    id: "BarChart", // Unique ID for the link
    path: "/barChart", // Path for the route
    element: <BarChart />, // Element to render for this route
  },
  {
    title: "Pie chart",
    id: "PieChart",
    path: "/PieChart",
    element: <PieChart />,
  },
  {
    title: "Timeline chart",
    id: "TimeLineChart",
    path: "/TimeLineChart",
    element: <TimelineChart />,
  },
];

const App = () => {
  return (
    <Router>
      <div className={classes.App}>
        <div className={classes.navbar}>
          <Navbar links={links} />
        </div>
        <div className={classes.mainContainer}>
          <Routes>
            {/* Define the routes for the application */}
            {links.map((link, idx) => (
              <Route key={idx} path={link.path} element={link.element} /> // Map through links to create a Route for each
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
