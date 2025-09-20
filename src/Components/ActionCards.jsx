import React from "react";
import speaker from "../assets/Speaker2.png";
import search from "../assets/search.png";
import track from "../assets/track.png";
import { Link } from "react-router-dom"; // corrected import
function ActionCards() {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-3">
      {[
        { img: search, text: "Search", path: "/JobListing" },
        { img: speaker, text: "Post", path: "/About" },
        { img: track, text: "Track", path: "/Track" }
      ].map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="card text-center"
          style={{
            width: "7rem",
            height: "7rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            padding: "0.3rem",
            textDecoration: "none",
            backgroundColor: "#fff",
            color: "#000"
          }}
        >
          <img
            src={item.img}
            alt={item.text}
            style={{
              width: "45%",
              height: "45%",
              objectFit: "contain"
            }}
          />
          <p style={{ margin: "0.2rem 0 0", fontSize: "0.65rem" }}>{item.text}</p>
        </Link>
      ))}
      <style jsx>{`
        @media (max-width: 768px) {
          .card {
            width: 6rem !important;
            height: 6rem !important;
          }
          .card img {
            width: 40% !important;
            height: 40% !important;
          }
          .card p {
            font-size: 0.55rem !important;
          }
        }
        @media (max-width: 480px) {
          .card {
            width: 5rem !important;
            height: 5rem !important;
            padding: 0.2rem !important;
          }
          .card img {
            width: 35% !important;
            height: 35% !important;
          }
          .card p {
            font-size: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ActionCards;
