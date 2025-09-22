import React from "react";
import contactImage from "../assets/Contact.jpg"; 
import phoneIcon from "../assets/phone6.jpeg"; 
import emailIcon from "../assets/emil.png"; 
import locationIcon from "../assets/address.png"; 

function ContactUs() {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src={contactImage}
            alt="Contact Us"
            className="img-fluid rounded-4 shadow-lg"
            style={{ width: "100%", objectFit: "cover", height: "400px" }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-3 ">Contact Us</h2>

          <div className="d-flex align-items-center mb-3">
            <img
              src={phoneIcon}
              alt="Phone"
              style={{ width: "40px", marginRight: "15px" }}
            />
            <div>
              <h6 className="mb-0">Phone</h6>
              <p className="mb-0 text-muted">+91 7249504530</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <img
              src={emailIcon}
              alt="Email"
              style={{ width: "40px", marginRight: "15px" }}
            />
            <div>
              <h6 className="mb-0">Email</h6>
              <p className="mb-0 text-muted">siddheshmali3050@example.com</p>
            </div>
          </div>

          <div className="d-flex align-items-center mb-3">
            <img
              src={locationIcon}
              alt="Location"
              style={{ width: "40px", marginRight: "15px" }}
            />
            <div>
              <h6 className="mb-0">Location</h6>
              <p className="mb-0 text-muted"> Jalgaon, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
