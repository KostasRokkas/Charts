import _ from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./index.module.css"; // Import CSS module
import { links } from "../../App";

const Link = ({ link, isActive, isSublinkActive, onClick, children }) => {
  const linkClass = `${classes.Link} ${isActive ? classes.active : ""}`; // Use classes from the module
  return (
    <React.Fragment>
      <a onClick={onClick} className={linkClass}>
        <strong>{link.title}</strong>
      </a>
      {isActive || isSublinkActive ? (
        <div className={classes.linkBody}>{children}</div> // Ensure this class is defined in CSS
      ) : null}
    </React.Fragment>
  );
};

Link.propTypes = {
  link: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  isSublinkActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const SubLink = ({ link, isActive, onClick }) => {
  return (
    <a onClick={onClick} className={classes.SubLink}>
      {" "}
      <strong>{link.title}</strong>
    </a>
  );
};

SubLink.propTypes = {
  link: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Navbar = () => {
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  return (
    <div className={classes.Navbar}>
      {" "}
      {/* Use CSS module class */}
      <div className={classes.header} onClick={() => navigate("/")}>
        <h3>Charts</h3>
      </div>
      <div className={`${classes.links} ${activeId ? classes.visible : ""}`}>
        {links()
          .filter((link) => link.inMenu)
          .map((link, idx) => {
            const sublinks = _.get(link, "links", []);
            const isSublinkActive = sublinks.some(
              (sublink) => sublink.id === activeId
            );

            return (
              <React.Fragment key={idx}>
                <Link
                  link={link}
                  isActive={link.id === activeId}
                  isSublinkActive={isSublinkActive}
                  onClick={() => {
                    setActiveId(link.id);
                    navigate(link.path);
                  }}
                >
                  {sublinks.length > 0 && (
                    <div className={classes.subLinks}>
                      {sublinks.map((sublink, jidx) => (
                        <SubLink
                          key={jidx}
                          link={sublink}
                          isActive={sublink.id === activeId}
                          onClick={() => {
                            setActiveId(sublink.id);
                            navigate(`${link.path}${sublink.path}`);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  isActive: true,
};
Navbar.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Navbar;
