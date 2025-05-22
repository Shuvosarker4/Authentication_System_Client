import React, { useState, useEffect } from "react";

const features = [
  "Password-based login",
  "Multi-factor authentication (MFA)",
  "Social logins (Google, Facebook, etc.)",
  "Single Sign-On (SSO)",
  "Robust encryption & privacy",
  "Scalable and easy integration",
];

const About = () => {
  const [showMore, setShowMore] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100); // fade in after mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 1s ease-in",
        backgroundColor: "#fff",
      }}
    >
      <h2>About Our Authentication System</h2>
      <p>
        We provide secure and seamless authentication solutions to protect your
        users and data.
      </p>

      <button
        onClick={() => setShowMore(!showMore)}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#fd390e",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {showMore ? "Show Less" : "Learn More"}
      </button>

      {showMore && (
        <>
          <p style={{ marginTop: "15px", color: "#555" }}>
            Our system supports multiple authentication methods including
            password login, multi-factor authentication, social logins, and
            Single Sign-On. We prioritize security, privacy, and user
            experience.
          </p>

          <ul style={{ paddingLeft: "20px", color: "#333" }}>
            {features.map((feature, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "8px",
                  padding: "5px",
                  borderRadius: "4px",
                  transition: "background-color 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fd390e33")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {feature}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default About;
