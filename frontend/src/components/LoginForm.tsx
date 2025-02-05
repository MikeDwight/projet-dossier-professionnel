import { useState } from "react";

export default function LoginForm({
  onSubmit,
}: {
  onSubmit: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    setError("");
    onSubmit(email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: "red" }}></p>}
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  );
}
