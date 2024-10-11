import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.css";

// Link Component
const Link = ({ link, onClick }) => {
  return (
    <React.Fragment>
      <a
        href={link.path}
        className={classes.link}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <strong>{link.title}</strong>
      </a>
    </React.Fragment>
  );
};

const Navbar = ({ links }) => {
  const navigate = useNavigate();

  /**
   * Handles link click events.
   *
   * @param {string} path - The path to navigate to.
   */
  const handleLinkClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className={classes.Navbar}>
      <div className={classes.header}>
        <h2 onClick={() => navigate("/")}>Charts</h2>{" "}
      </div>
      <div className={classes.linksSection}>
        <div className={classes.links}>
          {links.map((link, idx) => (
            <React.Fragment key={idx}>
              <Link
                link={link}
                onClick={() => handleLinkClick(link.id, link.path)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
