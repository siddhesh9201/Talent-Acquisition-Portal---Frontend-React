import { useRef } from "react";
import { useParams } from "react-router";

function JobApply() {
  const { id } = useParams();

  const username = useRef(null);
  const resume = useRef(null);
  const salary = useRef(null);
  const coverLetter = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      jobId: id,
      resumeLink: resume.current.value,
      coverLetter: coverLetter.current.value,
      expectedSalary: parseInt(salary.current.value),
      email: username.current.value,
    };

    try {
      const url = "http://localhost:8080/seeker/application/apply";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("HTTP error:", response.status);
        return;
      }

      const result = await response.text();
      alert("Application Submitted Successfully");
    } catch (e) {
      console.error("Error in Fetching:", e);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label">Email / Username</label>
            <div className="input-group">
              <span className="input-group-text">@</span>
              <input
                ref={username}
                type="text"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Resume Link</label>
            <input
              ref={resume}
              type="text"
              className="form-control"
              placeholder="Paste your resume link"
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Expected Salary</label>
            <input
              ref={salary}
              type="text"
              className="form-control"
              placeholder="e.g., 4L - 5L"
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Cover Letter</label>
            <input
              ref={coverLetter}
              type="text"
              className="form-control"
              placeholder="Write a short cover letter"
            />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="confirmCheck" />
              <label className="form-check-label" htmlFor="confirmCheck">
                I confirm that all the information provided is correct
              </label>
            </div>
          </div>

          <div className="col-12 text-center mt-3">
            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2"
              style={{ minWidth: "150px", maxWidth: "250px" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default JobApply;
