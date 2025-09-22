import React from "react";
import logo from "../assets/bg.png";

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div
        className="text-center p-3 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", borderRadius: "5px" }}
          />
        </div>

        <div>
          © {new Date().getFullYear()} Copyright:{" "}
          <a className="text-body" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>

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
