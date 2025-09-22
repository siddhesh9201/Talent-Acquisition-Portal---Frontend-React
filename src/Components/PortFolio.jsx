import React from "react";
import aboutImage from "../assets/About.jpg"; 

function AboutUs() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
       
         <div className="col-lg-6 mb-4 mb-lg-0">
                  <img
                    src={aboutImage}
                    alt="Contact Us"
                    className="img-fluid rounded-4 shadow-lg"
                    style={{ width: "100%", objectFit: "cover", height: "400px" }}
                  />
                </div>

        
        <div className="col-md-6">
          <h2 className="mb-3">About Us</h2>
          <p>
            Welcome to <strong>Talent Aquestion Portal</strong>! We are dedicated to
            connecting talented job seekers with the right opportunities.
          </p>
          <p>
            Our platform makes recruitment easy, fast, and transparent. Track
            applications, manage hiring, and stay updated—all in one place.
          </p>
          <p>
            Join us today and experience a smarter way of hiring and applying
            for jobs!
          </p>
        <button
  className="btn btn-primary mt-3"
  onClick={() => window.open("https://github.com/siddhesh9201/TalentAcquisitionPortal/blob/main/README.md", "_blank")}
>
  Learn More
</button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
