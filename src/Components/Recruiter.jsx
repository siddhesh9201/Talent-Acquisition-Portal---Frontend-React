import { useRef } from "react";
import { useNavigate } from "react-router";

function Recruiter() {
  let username = useRef(null);
  let password = useRef(null);
  let name = useRef(null);
  let role = useRef(null);
  let skills = useRef([]);
  let checkboxRef = useRef(null);
 const navigate= useNavigate();
  const submithandle = async (event) => {
    event.preventDefault();
    if (!checkboxRef.current.checked) {
      alert("Please confirm the checkbox before submitting!");
      return;
    }

    const data = {
      name: name.current.value,
      email: username.current.value,
      password: password.current.value,
      role: role.current.value,
      skills: skills.current.value ? skills.current.value.split(",") : [],
    };

    try {
      let url = "http://localhost:8080/auth/register";
      console.log(data);
      const response = await fetch(url, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      if (!response.ok) {
        let msg = await response.json();
        alert(msg.message || "Something Went Wrong...");
        
        return;
      } else {
        alert("Registration Successfully!");
           navigate("/")
          username.current.value = "";
    password.current.value = "";
    name.current.value = "";
    role.current.value = "";
    skills.current.value = "";
    checkboxRef.current.checked = false;
   
      }

    } catch (e) {
      console.log("ERROR ", e);
    }
  
  };

  return (
    <>
      <form className="container" onSubmit={submithandle}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
          REGISTRATION FOR RECRUITER
        </h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                ref={username}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="inputPassword3">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword3"
                placeholder="Password"
                ref={password}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Recruiter name.."
                ref={name}
              />
            </div>
          </div>
        </div>

       

        <div className="form-group col-md-4">
          <label htmlFor="inputRole">Role</label>
          <select
            id="inputRole"
            className="form-control"
            defaultValue=""
            ref={role}
          >
            <option value="" disabled>
              Choose...
            </option>
          
            <option value="RECRUITER">RECRUITER</option>
          </select>
        </div>

       
        <div className="form-group col-md-4">
          <label htmlFor="inputSkills">Skills</label>
          <select
            id="inputSkills"
            className="form-control"
            defaultValue=""
            ref={skills}
          >
            <option value="" disabled>
              Optional...
            </option>
            <option value="talent">Talent Sourcing</option>
            <option value="screening">Candidate Screening</option>
            <option value="interviewing">Interviewing</option>
            <option value="resume">Resume Evaluation</option>
            <option value="jobPosting">Job Posting & Advertising</option>
            <option value="relationship">
              Candidate Relationship Management
            </option>
          </select>
        </div>

        <br />

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              ref={checkboxRef}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Please confirm that all the information provided is correct before
              submitting
            </label>
          </div>
        </div>

        <br />

        <div className="row mt-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Recruiter;
