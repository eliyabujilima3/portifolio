import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { adminLogin } from "../../api/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await adminLogin(email, password);
      window.localStorage.setItem("admin_token", token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-hero-gradient px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-navy-light rounded-2xl shadow-2xl p-8"
      >
        <h1 className="font-display font-bold text-xl text-navy dark:text-white mb-1">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Sign in to manage contact messages.
        </p>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
          Email
        </label>
        <div className="relative mb-4">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
            placeholder="admin@example.com"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
          Password
        </label>
        <div className="relative mb-2">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center mt-4 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Default seeded credentials are in the backend .env.example file.
        </p>
      </form>
    </div>
  );
}
