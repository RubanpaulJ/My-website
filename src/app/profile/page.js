"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tabs = ["Profile", "Skills", "Applied Jobs"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    college: "", degree: "", year: "",
    cgpa: "", city: "", skills: "", about: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) { router.push("/login"); return; }
        const currentUser = session.user;
        setUser(currentUser);
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();
        if (profile) {
          setForm({
            name: profile.name || "",
            email: profile.email || currentUser.email || "",
            phone: profile.phone || "",
            college: profile.college || "",
            degree: profile.degree || "",
            year: profile.year || "",
            cgpa: profile.cgpa || "",
            city: profile.city || "",
            skills: profile.skills || "",
            about: profile.about || "",
          });
        } else {
          setForm(f => ({ ...f, email: currentUser.email || "" }));
        }
      } catch (err) {
        console.error("Load error:", err);
        router.push("/login");
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError("");
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      college: form.college,
      degree: form.degree,
      year: form.year,
      cgpa: form.cgpa,
      city: form.city,
      skills: form.skills,
      about: form.about,
    }, { onConflict: "id" });
    if (error) {
      setSaveError("Error saving: " + error.message);
    } else {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const getInitial = () =>
    form.name?.charAt(0)?.toUpperCase() ||
    form.email?.charAt(0)?.toUpperCase() || "U";

  const skillList = form.skills
    ? form.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  // Profile strength calculation
  const fields = [form.name, form.email, form.phone, form.college, form.degree, form.year, form.cgpa, form.city, form.skills, form.about];
  const filled = fields.filter(Boolean).length;
  const strength = Math.round((filled / fields.length) * 100);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Success Toast */}
        {saved && (
          <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-medium">
            ✅ Profile saved successfully!
          </div>
        )}

        {/* Error Toast */}
        {saveError && (
          <div className="fixed top-20 right-6 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-medium">
            {saveError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 flex flex-col gap-4">

            {/* Avatar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">
                {getInitial()}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{form.name || "Your Name"}</h2>
              <p className="text-sm text-gray-500 mt-1">{form.degree || "Degree"}</p>
              <p className="text-sm text-gray-400">{form.college || "College"}</p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  Open to Work
                </span>
              </div>

              {/* Profile Strength */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Profile Strength</span>
                  <span className="font-bold">{strength}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      strength === 100 ? "bg-green-500" :
                      strength >= 60 ? "bg-blue-500" : "bg-orange-400"
                    }`}
                    style={{ width: strength + "%" }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => { setEditing(!editing); setSaveError(""); setActiveTab("Profile"); }}
                className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition ${
                  editing
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}>
                {editing ? "✕ Cancel Edit" : "✏️ Edit Profile"}
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Contact Info</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "📧", val: form.email },
                  { icon: "📞", val: form.phone },
                  { icon: "📍", val: form.city },
                  { icon: "🎓", val: form.year ? "Class of " + form.year : "" },
                  { icon: "⭐", val: form.cgpa ? "CGPA " + form.cgpa : "" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">{item.icon}</span>
                    <span className="truncate text-xs">{item.val || <span className="text-gray-300">Not added</span>}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest">Activity</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-blue-600">0</p>
                  <p className="text-xs text-gray-500">Applied</p>
                </div>
                <div className="bg-green-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-green-600">0</p>
                  <p className="text-xs text-gray-500">Listed</p>
                </div>
                <div className="bg-purple-50 rounded-xl py-3">
                  <p className="text-xl font-bold text-purple-600">{skillList.length}</p>
                  <p className="text-xs text-gray-500">Skills</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-2">
              <Link href="/jobs"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 text-center hover:opacity-90 transition shadow-md">
                <p className="font-bold text-sm">💼 Browse Jobs</p>
                <p className="text-xs text-blue-200 mt-0.5">5,000+ fresher jobs</p>
              </Link>
              <Link href="/match"
                className="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl p-4 text-center hover:opacity-90 transition shadow-md">
                <p className="font-bold text-sm">🤖 AI Job Match</p>
                <p className="text-xs text-purple-200 mt-0.5">Find best matches</p>
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-3 flex flex-col gap-4">

            {/* Tab Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2">
              {tabs.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}>
                  {tab === "Profile" ? "👤 " : tab === "Skills" ? "🛠️ " : "📋 "}{tab}
                </button>
              ))}
            </div>

            {/* PROFILE TAB */}
            {activeTab === "Profile" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                  {editing && (
                    <button onClick={handleSave} disabled={saving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-50 flex items-center gap-2">
                      {saving ? (
                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span> Saving...</>
                      ) : "💾 Save Changes"}
                    </button>
                  )}
                </div>

                {/* About Me */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">About Me</label>
                  {editing ? (
                    <textarea name="about" value={form.about} onChange={handleChange} rows={3}
                      placeholder="Tell employers about yourself, your goals and interests..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 bg-gray-50 resize-none" />
                  ) : (
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 min-h-[60px]">
                      {form.about || <span className="text-gray-400 italic">No bio added yet. Click Edit Profile to add one.</span>}
                    </div>
                  )}
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", name: "name", placeholder: "Your full name" },
                    { label: "Email Address", name: "email", placeholder: "your@email.com" },
                    { label: "Phone Number", name: "phone", placeholder: "+91 98765 43210" },
                    { label: "City", name: "city", placeholder: "Chennai" },
                    { label: "College / University", name: "college", placeholder: "Anna University" },
                    { label: "Degree", name: "degree", placeholder: "B.E Computer Science" },
                    { label: "Graduation Year", name: "year", placeholder: "2024" },
                    { label: "CGPA / Percentage", name: "cgpa", placeholder: "8.5" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">{field.label}</label>
                      {editing ? (
                        <input type="text" name={field.name} value={form[field.name]}
                          onChange={handleChange} placeholder={field.placeholder}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 bg-gray-50 transition" />
                      ) : (
                        <div className="text-sm text-gray-700 bg-gray-50 rounded-xl px-4 py-3 min-h-[46px]">
                          {form[field.name] || <span className="text-gray-400">—</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {editing && (
                  <button onClick={handleSave} disabled={saving}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50">
                    {saving ? "Saving..." : "💾 Save Profile"}
                  </button>
                )}
              </div>
            )}

            {/* SKILLS TAB */}
            {activeTab === "Skills" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Skills & Expertise</h2>
                  {editing && (
                    <button onClick={handleSave} disabled={saving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition">
                      {saving ? "Saving..." : "💾 Save"}
                    </button>
                  )}
                </div>

                {editing && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Skills <span className="text-gray-400 font-normal">(comma separated)</span>
                    </label>
                    <input type="text" name="skills" value={form.skills} onChange={handleChange}
                      placeholder="React, JavaScript, Python, SQL, Figma..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 bg-gray-50" />
                  </div>
                )}

                {skillList.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-400 mb-4">{skillList.length} skills added</p>
                    <div className="flex flex-wrap gap-3">
                      {skillList.map((skill, i) => (
                        <span key={i}
                          className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-100 transition">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-5xl mb-3">🛠️</p>
                    <p className="font-medium text-gray-600">No skills added yet</p>
                    <p className="text-sm mt-1 mb-4">Add your technical skills to improve job matches</p>
                    <button onClick={() => setEditing(true)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
                      + Add Skills
                    </button>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-600 mb-3">💡 Popular IT Skills to Add:</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Python", "Java", "SQL", "Node.js", "JavaScript", "Figma", "AWS", "Git", "MongoDB", "TypeScript", "Flutter"].map((s, i) => (
                      <button key={i}
                        onClick={() => {
                          const current = form.skills ? form.skills.split(",").map(x => x.trim()).filter(Boolean) : [];
                          if (!current.includes(s)) {
                            setForm(f => ({ ...f, skills: [...current, s].join(", ") }));
                            setEditing(true);
                          }
                        }}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-50 hover:text-blue-600 transition">
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* APPLIED JOBS TAB */}
            {activeTab === "Applied Jobs" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Applied Jobs</h2>
                <p className="text-sm text-gray-400 mb-8">Track your application status</p>

                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-xl font-black text-gray-700 mb-2">No Applications Yet</p>
                  <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                    Jobs you apply to will appear here so you can track their status.
                  </p>
                  <Link href="/jobs"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition inline-block">
                    Browse Jobs & Apply →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}