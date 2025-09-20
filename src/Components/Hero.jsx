import { Link } from 'react-router-dom';
import bgImage from '../assets/bg.png';
import ActionCards from './ActionCards';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authcontext";

function HeroSection() {
  const { isLoggedIn } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      setShowToast(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowToast(false);
            return 100;
          }
          return prev + 1;
        });
      }, 30); 
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div
          className="toast show position-fixed top-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ zIndex: 1050, width: "300px" }}
        >
          <div className="toast-body text-center">
            Welcome {localStorage.getItem("username")}!
            <div className="progress mt-2" style={{ height: "4px" }}>
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${progress}%`, transition: "width 0.3s linear" }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center position-relative mx-auto"
        style={{
          height: "70vh",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "90%",
          maxWidth: "1000px",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>
          Find Your Next Opportunity<br />Hire the Best Talent
        </h1>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link to="/SeekerRegistration" className="btn btn-primary btn-lg">
            I’m a Job Seeker
          </Link>
          <Link to="/RecruiterRegistration" className="btn btn-outline-light btn-lg">
            I’m a Recruiter
          </Link>
        </div>

        <div style={{ position: "absolute", bottom: "-6rem" }}>
          <ActionCards />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem !important;
          }
          .btn-lg {
            font-size: 1rem;
            padding: 0.5rem 1rem;
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.2rem !important;
          }
          .btn-lg {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </>
  );
}

export default HeroSection;
