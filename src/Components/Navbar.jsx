import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { AuthContext } from "./Authcontext";

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleToggle = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  const closeMenu = () => {
    setIsNavExpanded(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              letterSpacing: "3px",
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(90deg, #4b9fedff, #000000)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            Talent
          </h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarContent"
          aria-expanded={isNavExpanded ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link text-dark" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/JobListing"
                className="nav-link text-dark"
                onClick={closeMenu}
              >
                Job Listing
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/PortFolio"
                className="nav-link text-dark"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/ContactUs"
                className="nav-link text-dark"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item dropdown position-relative">
                <button
                  className="btn btn-outline-primary"
                  onClick={toggleProfile}
                >
                  Profile
                </button>
                {isProfileOpen && (
                  <div
                    className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    <Profile onClose={() => setIsProfileOpen(false)} />
                  </div>
                )}
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/LoginPage" onClick={closeMenu}>
                  <button type="button" className="btn btn-outline-primary">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
