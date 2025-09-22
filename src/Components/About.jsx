import { useRef } from "react";
import { useNavigate } from "react-router";

function JobFormUI() {
  const jTitle = useRef(null);
  const jDescription = useRef(null);
  const jType = useRef(null);
  const jLocation = useRef(null);
  const jCompanyName = useRef(null);
  const jSalaryRange = useRef(null);
  const jExpiryDate = useRef(null);
  const jEmail = useRef(null);
  const jName = useRef(null);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email") || "";
  const name = localStorage.getItem("name") || "";
  const navigate = useNavigate();
  const onPHandle = async (event) => {
    event.preventDefault();

    const data = {
      title: jTitle.current.value,
      description: jDescription.current.value,
      type: jType.current.value,
      location: jLocation.current.value,
      companyName: jCompanyName.current.value,
      salaryRange: jSalaryRange.current.value,
      expiryDate: jExpiryDate.current.value,
      recruiterEmail: jEmail.current.value,
      recruiterName: jName.current.value,
    };

    console.log("Token:", token);
    console.log("Job Data:", data);

    try {
      const url = "http://localhost:8080/recruiter/job/create";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      const msg = await response
        .json()
        .catch(() => ({ message: "Invalid response format" }));

      if (!response.ok) {
        alert(msg.message || "Something went wrong!");
        return;
      }

      jTitle.current.value = "";
      jDescription.current.value = "";
      jType.current.value = "";
      jLocation.current.value = "";
      jCompanyName.current.value = "";
      jSalaryRange.current.value = "";
      jExpiryDate.current.value = "";
      jEmail.current.value = email;
      jName.current.value = name;

      alert("Job added successfully!");
      navigate("/");
    } catch (e) {
      console.error("Error:", e);
      alert("Error while submitting the form!");
    }
  };

  return (
    <form className="container my-4" onSubmit={onPHandle}>
      <h3 className="text-center mb-4" style={{ fontWeight: "bold" }}>
        Post a Job
      </h3>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="title" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Frontend Developer"
            ref={jTitle}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="type" className="form-label">
            Job Type
          </label>
          <select id="type" className="form-select" ref={jType} required>
            <option value="">Select</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            placeholder="Mumbai"
            ref={jLocation}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            placeholder="Creative Tech Solutions"
            ref={jCompanyName}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="salaryRange" className="form-label">
            Salary Range
          </label>
          <input
            type="text"
            id="salaryRange"
            className="form-control"
            placeholder="4 LPA - 7 LPA"
            ref={jSalaryRange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            className="form-control"
            ref={jExpiryDate}
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-3">
          <label htmlFor="recruiterEmail" className="form-label">
            Recruiter Email
          </label>
          <input
            type="email"
            id="recruiterEmail"
            className="form-control"
            placeholder="hr@techsolutions.com"
            ref={jEmail}
            defaultValue={email}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="recruiterName" className="form-label">
            Recruiter Name
          </label>
          <input
            type="text"
            id="recruiterName"
            className="form-control"
            placeholder="Amit Sharma"
            ref={jName}
            defaultValue={name}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="form-label">
          Job Description
        </label>
        <textarea
          id="description"
          className="form-control"
          placeholder="Build responsive user interfaces"
          rows="4"
          ref={jDescription}
          required
        ></textarea>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary px-5">
          Post
        </button>
      </div>
    </form>
  );
}

export default JobFormUI;
