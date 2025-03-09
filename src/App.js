import React, { useState } from "react";
import axios from "axios";

function App() {
  const [features, setFeatures] = useState({
    size: "",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    feature1: "",
    feature2: "",
    feature3: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const getPrediction = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5004/predict", {
        features: Object.values(features).map(Number),
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? "#121212"
          : `url("https://wallpaperaccess.com/full/317501.jpg") no-repeat center center/cover`,
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <div style={styles.toggleContainer}>
        <label style={styles.switch}>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <span style={styles.slider}></span>
        </label>
        <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <h1 style={styles.heading}>House Price Prediction</h1>

      <div style={styles.form}>
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="size"
          placeholder="Size (sqft)"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="garage"
          placeholder="Garage"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="feature1"
          placeholder="Feature 1"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="feature2"
          placeholder="Feature 2"
          onChange={handleChange}
        />
        <input
          style={darkMode ? styles.darkInput : styles.lightInput}
          type="number"
          name="feature3"
          placeholder="Feature 3"
          onChange={handleChange}
        />

        <button style={styles.button} onClick={getPrediction} disabled={loading}>
          {loading ? "Calculating..." : "Predict"}
        </button>
      </div>

      {prediction !== null && <h2 style={styles.result}>Predicted Price: ${prediction.toFixed(2)}</h2>}
    </div>
  );
}

// Styles
const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.3s ease",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: "40px",
    height: "20px",
    marginRight: "10px",
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "#ccc",
    borderRadius: "20px",
    transition: "0.4s",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
    borderRadius: "10px",
  },
  darkInput: {
    width: "250px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    background: "rgba(255, 255, 255, 0.1)", // Semi-transparent glass effect
    backdropFilter: "blur(5px)", // Blurry glass look
    color: "#fff",
    boxShadow: "0 0 10px rgba(0, 150, 255, 0.7)", // Neon blue glow
    transition: "0.3s",
  },
  lightInput: {
    width: "250px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Soft shadow for a clean look
    transition: "0.3s",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  result: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default App;
