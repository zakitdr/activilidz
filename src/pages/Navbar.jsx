import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-black text-white px-4 py-2 flex gap-4">
      <Link to="/">Accueil</Link>
      <Link to="/produits/Streaming">Streaming</Link>
      <Link to="/produits/Services">Services</Link>
      <Link to="/produits/Codes">Codes</Link>
      <Link to="/admin-login" className="ml-auto">Admin</Link>
    </nav>
  );
}