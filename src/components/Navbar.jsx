"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white text-xs py-2.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"></span>
        <span className="font-medium">Trusted by 500+ students across Tamil Nadu — Final Year Projects, Papers & More</span>
        <a href="https://wa.me/917904203916" target="_blank" rel="noopener noreferrer"
          className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-0.5 rounded-full font-bold text-xs transition">
          Chat Now
        </a>
      </div>

      {/* Navbar */}
      <nav className={`w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-gray-950"
      }`}>

        {/* Logo */}
<Link href="/" className="flex items-center gap-2">
  <img
    src="/logo.jpeg"
    alt="Journify Logo"
    className="w-8 h-8 rounded-lg object-contain"
  />
  <span className="text-xl font-black text-white tracking-tight">
    Journify<span className="text-cyan-400">.</span>
  </span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/"
            className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition text-sm font-medium">
            Home
          </Link>
          <Link href="/services"
            className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition text-sm font-medium">
            Services
          </Link>
          <Link href="/jobs"
            className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition text-sm font-medium">
            Jobs
          </Link>
          <Link href="/match"
            className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-full transition text-sm font-bold border border-white/20">
            AI Match
          </Link>
          <Link href="/profile"
            className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition text-sm font-medium">
            Profile
          </Link>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition border border-white/20"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-xs">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm max-w-[100px] truncate">{user.email}</span>
                <span className="text-xs text-gray-400">{dropdownOpen ? "▲" : "▼"}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.email}</p>
                  </div>
                  {[
                    { href: "/profile", icon: "👤", label: "My Profile" },
                    { href: "/match", icon: "✨", label: "AI Job Match" },
                    { href: "/jobs", icon: "💼", label: "Browse Jobs" },
                    { href: "/services", icon: "🎓", label: "Services" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition">
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/10">
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition text-sm font-medium border border-white/20">
                Login
              </Link>
              <Link href="/register"
                className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 px-5 py-2 rounded-full font-bold text-sm transition shadow-lg shadow-cyan-500/20">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-950 border-t border-white/10 flex flex-col px-6 py-4 gap-3 md:hidden z-40">
            <Link href="/" onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-white/5">
              🏠 Home
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-white/5">
              🎓 Services
            </Link>
            <Link href="/jobs" onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-white/5">
              💼 Jobs
            </Link>
            <Link href="/match" onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-white/5">
              ✨ AI Match
            </Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-white py-2.5 text-sm font-medium border-b border-white/5">
              👤 Profile
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <p className="text-xs text-gray-500 truncate px-1">{user.email}</p>
                  <button onClick={handleLogout}
                    className="w-full py-2.5 text-red-400 border border-red-400/30 rounded-xl text-sm font-semibold">
                    🚪 Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 text-white border border-white/20 rounded-xl text-sm font-semibold">
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 bg-cyan-500 text-gray-900 rounded-xl text-sm font-bold">
                    Register Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}