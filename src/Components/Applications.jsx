import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function ApplicationsList() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/recruiter/application/job/${jobId}`,
        {
          method: "GET",
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
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );

    try {
      const response = await fetch(
        `http://localhost:8080/recruiter/appliation/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update status", response.status);

        getApplications();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      getApplications();
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Resume Link</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.client?.name || "N/A"}</td>
              <td>{app.email}</td>
              <td>
                <Link>{app.resumeLink || "N/A"}</Link>
              </td>
              <td>
                <span
                  className={`badge ${
                    app.status === "SELECTED"
                      ? "bg-success"
                      : app.status === "REJECTED"
                      ? "bg-danger"
                      : "bg-secondary"
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-success me-2"
                  onClick={() => updateStatus(app.id, "SELECTED")}
                >
                  Approve
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => updateStatus(app.id, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsList;
