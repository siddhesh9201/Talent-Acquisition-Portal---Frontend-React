import { useRef } from "react";
import { Navigate, useNavigate } from "react-router";
function Seeker() {
  const username = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const role = useRef(null);
  const skills = useRef(null);
  const checkboxRef = useRef(null);
  const navigate =useNavigate();

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
      skills: skills.current.value ? [skills.current.value] : [],
    };

    try {
      let url = "http://localhost:8080/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.status===403) {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong!");
        return;
      }else{
        alert("Registration SuccessFully!");
        navigate("/LoginPage");
      }

     

     
      username.current.value = "";
      password.current.value = "";
      name.current.value = "";
      role.current.value = "";
      skills.current.value = "";
      checkboxRef.current.checked = false;

    } catch (e) {
      console.error("Network/Error:", e);
      alert("Network error! Please try again later.");
    }
  };

  return (
    <form className="container" onSubmit={submithandle}>
      <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
        REGISTRATION FOR SEEKER
      </h3>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
              ref={username}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="abc123"
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
              placeholder="Your name.."
              ref={name}
            />
          </div>
        </div>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="role">Role</label>
        <select id="role" className="form-control" ref={role} defaultValue="">
          <option value="" disabled>Choose...</option>
          <option value="SEEKER">SEEKER</option>
        </select>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="skills">Skills</label>
        <select id="skills" className="form-control" ref={skills} defaultValue="">
          <option value="" disabled>Required...</option>
          <option value="JAVA">Java</option>
          <option value="PYTHON">Python</option>
          <option value="C">C</option>
          <option value="CPP">C++</option>
          <option value="JAVASCRIPT">JavaScript</option>
          <option value="TYPESCRIPT">TypeScript</option>
          <option value="PHP">PHP</option>
          <option value="RUBY">Ruby</option>
          <option value="GO">Go</option>
          <option value="RUST">Rust</option>
          <option value="SWIFT">Swift</option>
          <option value="KOTLIN">Kotlin</option>
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
            Please confirm that all the information provided is correct before submitting
          </label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
}

export default Seeker;
