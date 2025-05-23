import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Secret = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #fd390e",
        borderRadius: "10px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h2>🔒 Secret Section</h2>

      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          backgroundColor: "#fd390e",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        {isVisible ? "Hide Secret" : "Show Secret"}
      </button>

      {isVisible && (
        <div
          style={{
            backgroundColor: "#fde3db",
            padding: "15px",
            borderRadius: "5px",
            color: "#b2300f",
            fontWeight: "600",
          }}
        >
          🎉 Congratulations! You found the secret message: <br />
          "Security is our top priority."
        </div>
      )}
    </div>
  );
};

export default Secret;
