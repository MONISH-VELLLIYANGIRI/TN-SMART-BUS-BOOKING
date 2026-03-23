import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Phone, UserRound } from "lucide-react";
import { signup } from "../services/authService";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await signup(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      navigate("/search");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="mx-auto mt-8 w-full max-w-md">
      <div className="panel p-6 md:p-7">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-1 text-sm text-slate-500">Signup and start booking your trips in seconds.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <label className="relative block">
            <UserRound className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="name" type="text" placeholder="Name" value={formData.name} onChange={onChange} required />
          </label>
          <label className="relative block">
            <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="email" type="email" placeholder="Email" value={formData.email} onChange={onChange} required />
          </label>
          <label className="relative block">
            <Phone className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={onChange} required />
          </label>
          <label className="relative block">
            <Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input className="input-control pl-9" name="password" type="password" placeholder="Password" value={formData.password} onChange={onChange} required />
          </label>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <button className="primary-btn w-full" type="submit">Create Account</button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have account? <Link className="font-semibold text-sky-700" to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
