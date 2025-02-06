import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'inscription.");
      }

      console.log("Inscription réussie :", data);

      localStorage.setItem("token", data.token);

      navigate("/login");
    } catch (err: any) {
      console.error("Erreur d'inscription :", err);
      setError(err.message);
    }
  };

  return (
    <div className="container-signup">
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Affichage des erreurs */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Nom"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
