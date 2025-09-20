import errorp from "../assets/error.png";

function PageNotFoung() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${errorp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
          transition: "transform 0.3s",
        }}
        className="page-title"
      >
        PAGE NOT FOUND
      </h1>
      <img
        src={errorp}
        alt="Error"
        style={{
          maxWidth: "400px",
          width: "90%",
          height: "auto",
          transition: "transform 0.3s",
          cursor: "pointer",
        }}
        className="error-img"
      />
      <style jsx>{`
        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem !important;
          }
          .error-img {
            max-width: 250px !important;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 2rem !important;
          }
          .error-img {
            max-width: 180px !important;
          }
        }

        .error-img:hover {
          transform: scale(1.05);
        }

        .page-title:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default PageNotFoung;
