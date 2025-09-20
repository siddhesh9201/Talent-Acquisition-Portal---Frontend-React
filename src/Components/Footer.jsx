import React from "react";
import logo from "../assets/bg.png"; // replace with your image path

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div
        className="text-center p-3 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {/* Left side: Logo/Image */}
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", borderRadius: "5px" }}
          />
        </div>

        {/* Center: Copyright */}
        <div>
          © {new Date().getFullYear()} Copyright:{" "}
          <a className="text-body" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>

        {/* Right side: Extra image/icon */}
        <div>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
            alt="social"
            style={{ height: "30px", marginLeft: "10px" }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
