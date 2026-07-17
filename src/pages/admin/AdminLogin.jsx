import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

import { loginAdmin } from "../../services/authService";

export default function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!password.trim()) {
            setError("Password is required.");
            return;
        }

        try {

            setLoading(true);

            await loginAdmin(email, password);

            navigate("/admin");

        } catch (err) {

            console.error(err);

            switch (err.code) {

                case "auth/invalid-email":
                    setError("Invalid email address.");
                    break;

                case "auth/user-not-found":
                    setError("Admin account not found.");
                    break;

                case "auth/wrong-password":
                    setError("Incorrect password.");
                    break;

                case "auth/invalid-credential":
                    setError("Invalid email or password.");
                    break;

                default:
                    setError("Login failed. Please try again.");
            }

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="admin-login-page">

            <div className="login-card">

                <div className="login-logo">

                    <h1>PK Frame</h1>

                    <p>Admin Panel</p>

                </div>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                </form>

                <div className="login-footer">

                    <Link to="/">

                        ← Back to User Page

                    </Link>

                </div>

            </div>

        </div>

    );

}