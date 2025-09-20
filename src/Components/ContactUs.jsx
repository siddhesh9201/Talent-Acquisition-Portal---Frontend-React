import contact from '../assets/co.png';
import addressIcon from '../assets/address.png';
import phone from '../assets/phone6.jpeg';
import emailIcon from '../assets/emil.png';

export default function ContactUs() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "40px 20px" }}>
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", width: "100%", maxWidth: "1200px", margin: "0 auto", gap: "20px" }}>

          {/* Image Section */}
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            <img
              src={contact}
              alt="Team working"
              style={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "cover", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            />
          </div>

          {/* Contact Info Section */}
          <div style={{ flex: "1 1 300px", padding: "20px" }}>
            <h2 style={{ marginBottom: "20px", fontSize: "2rem", color: "#333" }}>Get in touch</h2>
            <p style={{ color: "#555", marginBottom: "30px", lineHeight: "1.6" }}>
              We're always on the lookout to work with new clients. If you're interested in working with us, please get in touch in one of the following ways.
            </p>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "25px" }}>
              <img src={addressIcon} alt="Address" style={{ width: "28px", marginRight: "15px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px", color: "#333" }}>Address</h4>
                <p style={{ margin: 0, color: "#555" }}>
                  8014 Edith Blvd NE, Albuquerque, New York, United States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "25px" }}>
              <img src={phone} alt="Phone" style={{ width: "28px", marginRight: "15px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px", color: "#333" }}>Phone</h4>
                <p style={{ margin: 0 }}>
                  <a href="tel:+15057922430" style={{ textDecoration: "none", color: "#555" }}>
                    (505) 792-2430
                  </a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <img src={emailIcon} alt="Email" style={{ width: "28px", marginRight: "15px" }} />
              <div>
                <h4 style={{ margin: "0 0 5px", color: "#333" }}>E-Mail</h4>
                <p style={{ margin: 0 }}>
                  <a href="mailto:demo@yourdomain.com" style={{ textDecoration: "none", color: "#555" }}>
                    demo@yourdomain.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
