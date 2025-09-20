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
        console.log("Applications:", data);

        setApplications(data || []);
   
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
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
              <div className="card shadow-sm border-0 rounded-3 hover-effect">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: "#0d6efd" }} 
                >
                  <h5 className="mb-0">{application.job.companyName}</h5>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{application.job.title}</h5>
                  <p className="card-text text-muted">{application.job.type}</p>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#00a6ffff",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {application.status}
                  </span>
                </div>
                <div className="card-footer text-muted text-center">
                  Applied on: {application.appliedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .hover-effect:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default Track;
