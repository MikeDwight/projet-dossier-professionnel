export default function Login() {
  return (
    <div className="container">
      <h1>Connexion</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
