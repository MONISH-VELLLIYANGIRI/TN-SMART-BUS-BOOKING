import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { login } from "../services/authService";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      const to = location.state?.from?.pathname || "/search";
      navigate(to, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-md">
      <div className="panel p-6 md:p-7">
        <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-1 text-sm text-slate-500">Login to continue booking and tracking your bus.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="email" type="email" placeholder="Email" value={formData.email} onChange={onChange} required />
          </label>

          <label className="relative block">
            <Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="password" type="password" placeholder="Password" value={formData.password} onChange={onChange} required />
          </label>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <button className="primary-btn w-full" type="submit">Login</button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          New user? <Link className="font-semibold text-sky-700" to="/signup">Create account</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
