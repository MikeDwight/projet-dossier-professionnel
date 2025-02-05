export default function Signup() {
  return (
    <div className="container">
      <h1>Inscription</h1>
      <form>
        <input type="text" placeholder="Prénom" required />
        <input type="text" placeholder="Nom" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
