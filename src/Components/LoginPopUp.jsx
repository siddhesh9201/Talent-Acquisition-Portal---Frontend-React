import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Authcontext";

function LoginPopUp() {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailInput = email.current.value;
      const passInput = password.current.value;

      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, password: passInput }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Login failed");
        return;
      }
      const result = await response.json();

      localStorage.setItem("username", result.name);
      localStorage.setItem("id", result.clientId);
      localStorage.setItem("token", result.jwt);

      login(localStorage.getItem("token"));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
      <div className="card shadow-lg w-100 mx-3" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title h3">Sign in</h1>
            <p className="card-text text-muted">
              Sign in below to access your account
            </p>
          </div>
          <form className="mt-4" onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-muted">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={email}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-muted">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                ref={password}
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign in
              </button>
            </div>
            <p className="text-center text-muted">
              Don’t have an account yet?{" "}
              <Link to={"/SeekerRegistration"} className="text-decoration-none">
                Sign up
              </Link>
              .
            </p>
          </form>
          <div className="text-center mt-3">
            <Link to={"/"}>
              <button className="btn btn-sm btn-outline-secondary">
                Close
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPopUp;
