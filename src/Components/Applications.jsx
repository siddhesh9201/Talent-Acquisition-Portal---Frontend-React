import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ApplicationsList() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/seeker/application/job/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch applications:", response.status);
        setApplications([]);
        return;
      }

      
      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setApplications(Array.isArray(data) ? data : data.content || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, [jobId]);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/recruiter/application/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        getApplications(); 
      } else {
        console.error("Failed to update status", response.status);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="container my-4">
      <h3>Applications for Job {jobId}</h3>
      {loading ? (
        <div className="text-center my-5">Loading...</div>
      ) : applications.length === 0 ? (
        <div className="text-center my-5">No applications yet!</div>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.status}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => updateStatus(app.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => updateStatus(app.id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApplicationsList;
