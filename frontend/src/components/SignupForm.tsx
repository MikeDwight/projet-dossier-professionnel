import { useState } from "react";

export default function SignupForm({
  onSubmit,
}: {
  onSubmit: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => void;
}) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    onSubmit(firstname, lastname, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}
