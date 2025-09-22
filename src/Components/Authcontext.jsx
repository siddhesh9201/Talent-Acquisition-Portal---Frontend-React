import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [client, setClient] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    const fetchClient = async () => {
      try {
        const clientId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!clientId || !token) return;

        const url = `http://localhost:8080/auth/seekerprofile/${clientId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setClient(result);
        console.log(result);
        localStorage.setItem("role", result.role);
        localStorage.setItem("email", result.email);
        console.log(localStorage.getItem("role"));
      } catch (e) {
        console.log("ERROR IN FETCHING: " + e);
      }
    };

    fetchClient();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
