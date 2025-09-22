import { useEffect, useState } from "react";

function Track() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const clientId = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        if (!clientId || !token) {
          console.error("Missing client ID or token");
          return;
        }

        const url = `http://localhost:8080/seeker/application/client/${clientId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning text-dark";
      case "accepted":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "in progress":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold ">
        Track Your Job Applications
      </h2>

      {applications.length === 0 ? (
        <h4 className="text-center text-muted">
          {localStorage.getItem("username")}, you have not applied for any job yet.
        </h4>
      ) : (
        <div className="row justify-content-center">
          {applications.map((application) => (
            <div key={application.id} className="col-md-8 col-lg-6 mb-4">
              <div className="card shadow rounded-4 h-100 border-0">
                <div className="card-header d-flex justify-content-between align-items-center text-white fw-bold" style={{ backgroundColor: "#0d6efd" }}>
                  <span>{application.job.companyName}</span>
                  <span className={`badge ${getStatusClass(application.status)} rounded-pill`}>
                    {application.status}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{application.job.title}</h5>
                  <p className="card-text text-muted">{application.job.type}</p>
                  <p className="text-muted mb-0">
                    Location: {application.job.location || "Not specified"}
                  </p>
                </div>
                <div className="card-footer text-muted text-center small">
                  Applied on: {application.appliedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Track;
