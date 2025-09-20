import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";

function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const email = localStorage.getItem("email")?.trim();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const location = useLocation(); // to detect navigation changes

  // Fetch all jobs
  const getAllJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/alljobs");
      const data = await response.json();
      setJobs(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [refresh, location.pathname]);

  const displayedJobs = jobs.filter((jobItem) => {
    if (role === "RECRUITER" && email) {
      const jobEmail = jobItem.recruiterEmail || "";
      return jobEmail.trim().toLowerCase() === email.trim().toLowerCase();
    }
    return true;
  });

  const onDeleteClick = async (jobId) => {
   alert("Are you sure you want to delete this job?");
    try {
      const url = `http://localhost:8080/recruiter/delete/${jobId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Job deleted successfully");
        setRefresh((prev) => !prev); 
      } else {
        console.error("Failed to delete job:", response.status);
      }
    } catch (e) {
      console.log("Error In Delete:", e);
    }
  };

  return (
    <div className="container my-4">
      <SearchBar />
      <br />

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : displayedJobs.length === 0 ? (
        <div className="text-center my-5 p-4 border rounded shadow-sm bg-light">
          <i className="bi bi-briefcase-fill display-1 text-muted mb-3"></i>
          <h4 className="mb-3">No jobs posted yet!</h4>
          <p className="mb-4">
            It looks like there are no job openings at the moment. Stay tuned
            for updates!
          </p>
          {role === "RECRUITER" && (
            <Link to={"/About"}>
              <button className="btn btn-primary">Post a Job</button>
            </Link>
          )}
        </div>
      ) : (
        <div className="row justify-content-center">
          {displayedJobs.map((jobItem) => (
            <div key={jobItem.id} className="col-md-8 col-lg-6 mb-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h5 className="card-title">{jobItem.title}</h5>
                  <p className="card-text">
                    {jobItem.salaryRange} | Job Type: {jobItem.type} | Location:{" "}
                    {jobItem.location}
                  </p>

                  {role != "RECRUITER" && (<Link
                    to={`/Apply/${jobItem.id}`}
                    className="btn btn-primary me-2"
                  >
                    Apply
                  </Link>)}

                
                  {role === "RECRUITER" &&
                    jobItem.recruiterEmail?.trim().toLowerCase() ===
                      email?.toLowerCase() && (
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => onDeleteClick(jobItem.id)}
                      >
                        Delete
                      </button>

                      
                    )}

              
              {role === "RECRUITER" &&
  jobItem.recruiterEmail?.trim().toLowerCase() ===
    email?.toLowerCase() && (
    <Link
      to={`/applications/${jobItem.id}`}
      className="btn btn-info me-2"
    >
      View Applications
    </Link>
)}

              
              
                    
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobListing;
