import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";
import ProfileImage from "../assets/Profile.png";

function Profile({ onClose }) {
  const { logout } = useContext(AuthContext);
  const [client, setClient] = useState(null);

  useEffect(() => {
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

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setClient(result);
        console.log(result);
        
      } catch (e) {
        console.log("ERROR IN FETCHING: " + e);
      }
    };

    fetchClient();
  }, []);

  return (
    <div
      className="card shadow p-3 position-absolute"
      style={{ top: "40px", right: 0,width: "350px", 
    minHeight: "450px", }}
    >
      <div className="d-flex justify-content-end">
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <div className="text-center mb-3">
        <img
          src={ProfileImage}
          alt="Avatar"
          className="rounded-circle img-fluid"
          style={{ width: "60px" }}
        />
        <h5 className="mt-2 text-uppercase">{client?.name}</h5>
        
      </div>

      <h6>Information</h6>
       <hr />
      <p ><strong>Role:</strong> {client?.role}</p>
      <hr />
      <p><strong>Email:</strong> {client?.email}</p>
      <hr />
      <p><strong> Skills:</strong> {client?.skills}</p>
        <hr />
      <p><strong>Last Login:</strong> {client?.lastLogin}</p>

      <button className="btn btn-primary w-100 mt-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
