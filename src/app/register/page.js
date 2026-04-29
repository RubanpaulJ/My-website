"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const fields = [
  { label: "Full Name", name: "name", type: "text", placeholder: "Ruban Kumar", required: true },
  { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com", required: true },
  { label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
  { label: "College / University", name: "college", type: "text", placeholder: "Anna University" },
  { label: "Degree", name: "degree", type: "text", placeholder: "B.E Computer Science" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", college: "", degree: "", password: "", confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setMessage({ type: "error", text: "Email and password are required." });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (form.password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          college: form.college,
          degree: form.degree,
        });
      }

      setMessage({ type: "success", text: "Account created! You can now sign in." });
      setForm({ name: "", email: "", phone: "", college: "", degree: "", password: "", confirmPassword: "" });
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm">J</div>
          <span className="font-bold text-white text-lg">JournifyJobs</span>
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-100 mb-5">
            🆓 Free for all freshers
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">
            Your IT career starts with one click.
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-8">
            Create your profile once and apply to thousands of fresher jobs across India — no CV uploads needed every time.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "50K+", label: "Placed freshers" },
              { num: "5K+", label: "Daily new jobs" },
              { num: "1.2K+", label: "Companies hiring" },
              { num: "2 wks", label: "Avg. time to hire" },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-extrabold text-white">{s.num}</div>
                <div className="text-blue-200 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-300 text-xs">
          By creating an account you agree to our{" "}
          <span className="text-blue-200 underline cursor-pointer">Terms</span> and{" "}
          <span className="text-blue-200 underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">J</div>
            <span className="font-bold text-slate-900 text-lg">Journify<span className="text-blue-600">Jobs</span></span>
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Create your free account</h1>
            <p className="text-slate-500 text-sm mt-1">Join 50,000+ freshers already on JournifyJobs</p>
          </div>

          {message.text && (
            <div className={`flex items-start gap-2 text-sm px-4 py-3 rounded-xl mb-5 border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              <span className="text-base shrink-0">{message.type === "success" ? "✅" : "⚠️"}</span>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className={field.name === "email" ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-0.5">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Free Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
