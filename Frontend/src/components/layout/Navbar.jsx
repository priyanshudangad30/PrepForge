import { useAuth } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { Search, Code2, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/problems", label: "Problems" },
    { to: "/streak", label: "Streak" },
    { to: "/progress", label: "Progress" },
    { to: "/revision", label: "Revision" }
  ];

  return (
    <header className="h-24 sticky top-0 z-[100] bg-[#0D0B21]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Left — Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
            <Code2 size={22} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">PrepForge</span>
        </Link>

        {/* Center — Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              className={({ isActive }) => `text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isActive ? 'text-violet-400' : 'text-slate-500 hover:text-white'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right — Actions */}
        <div className="flex items-center gap-6">
          {/* Search (Desktop) */}
          <div className="relative group hidden lg:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={14} className="text-slate-500 group-focus-within:text-violet-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-40 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-600"
            />
          </div>

          {/* User profile & Logout */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-3 p-1 pr-4 bg-white/5 border border-white/10 rounded-full hover:border-white/20 transition-all backdrop-blur-md group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden sm:block text-[10px] font-black text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link to="/login" className="text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Login</Link>
              <Link to="/signup" className="px-6 py-2.5 bg-white text-[#0D0B21] rounded-full text-[10px] font-black hover:bg-violet-50 transition-all shadow-xl shadow-white/10 uppercase tracking-widest">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-24 bg-[#0D0B21]/95 backdrop-blur-2xl z-[90] animate-fade-in md:hidden p-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to + link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-xl font-black uppercase tracking-widest py-4 border-b border-white/5 transition-all ${isActive ? 'text-violet-400' : 'text-slate-500'}`}
              >
                {link.label}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `text-xl font-black uppercase tracking-widest py-4 border-b border-white/5 transition-all ${isActive ? 'text-violet-400' : 'text-slate-500'}`}
              >
                My Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
