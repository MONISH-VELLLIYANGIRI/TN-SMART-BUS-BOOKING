import { Link, useNavigate } from "react-router-dom";
import { Bus, LogOut, Search, Ticket } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link to="/search" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white">
          <Bus className="h-4 w-4" />
          TN Smart Bus
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {token && (
            <Link to="/search" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
              <Search className="h-4 w-4" />
              Search
            </Link>
          )}
          {token && (
            <Link to="/my-bookings" className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
              <Ticket className="h-4 w-4" />
              My Bookings
            </Link>
          )}
          {!token && <Link to="/login" className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100">Login</Link>}
          {!token && <Link to="/signup" className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100">Signup</Link>}
        </nav>

        <div className="flex items-center gap-2">
          {token && <span className="hidden text-sm text-slate-500 md:inline">Hello, {name}</span>}
          {token && (
            <button type="button" className="danger-btn gap-1" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
