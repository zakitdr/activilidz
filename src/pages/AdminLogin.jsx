import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    if (pass === "admin123") {
      localStorage.setItem("admin-auth", "yes");
      navigate("/admin");
    } else {
      alert("Mot de passe incorrect");
    }
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Connexion Admin</h1>
      <input className="border p-2 w-full mb-2" type="password" placeholder="Mot de passe" value={pass} onChange={e => setPass(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Se connecter</button>
    </div>
  );
}