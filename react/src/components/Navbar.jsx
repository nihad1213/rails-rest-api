import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">MyApp</Link>
      {user && (
        <div className="nav-right">
          <span className="muted">{user.email}</span>
          <button
            className="btn-ghost"
            onClick={() => { logout(); navigate("/login"); }}
          >
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}