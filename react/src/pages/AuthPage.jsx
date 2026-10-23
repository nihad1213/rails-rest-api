import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AuthPage({ mode }) {
  const isLogin = mode === "login";
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await (isLogin ? login : signup)(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="card auth">
      <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
        <button className="btn">{isLogin ? "Log in" : "Sign up"}</button>
      </form>
      <p className="muted center">
        {isLogin ? (
          <>No account? <Link to="/signup">Sign up</Link></>
        ) : (
          <>Already registered? <Link to="/login">Log in</Link></>
        )}
      </p>
    </div>
  );
}