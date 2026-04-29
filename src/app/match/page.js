"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Link from "next/link";

const loadingMessages = [
  "Reading your profile...",
  "Scanning live job listings...",
  "AI analyzing your skills...",
  "Calculating match scores...",
  "Preparing your results...",
];

export default function MatchPage() {
  const [profile, setProfile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const [step, setStep] = useState(1);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [jobLinks, setJobLinks] = useState({});

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
      if (data) setProfile(data);
    };
    load();
  }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      setResumeText(await file.text());
    } else {
      setResumeText("PDF: " + file.name);
    }
  };

  const handleMatch = async () => {
    if (!profile) return alert("Complete your profile first!");
    setLoading(true);
    setMatches(null);
    let idx = 0;
    setLoadingMsg(loadingMessages[0]);
    const t = setInterval(() => {
      idx = (idx + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[idx]);
    }, 1500);

    try {
      const { data: jobs } = await supabase.from("live_jobs").select("*").limit(20);
      const links = {};
      if (jobs) jobs.forEach((j) => { links[j.id] = j.apply_link; });
      setJobLinks(links);

      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, resumeText, jobs: jobs || [] }),
      });
      if (!res.ok) throw new Error("API failed");
      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setMatches(result);
      setStep(2);
    } catch (err) {
      alert("Error: " + err.message);
    }
    clearInterval(t);
    setLoading(false);
  };

  const scoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const scoreBarColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-400";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            🤖 Powered by Groq AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">AI Job Matcher</h1>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            Let AI analyze your profile and resume to find your best-matching IT jobs.
          </p>
        </div>

        {/* ── STEP 1: INPUT ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Profile Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">👤</div>
                  <h2 className="font-bold text-slate-900">Your Profile</h2>
                </div>

                {profile ? (
                  <div className="space-y-2.5">
                    {[
                      { label: "Name", value: profile.name },
                      { label: "Degree", value: profile.degree },
                      { label: "College", value: profile.college },
                      { label: "City", value: profile.city },
                      { label: "CGPA", value: profile.cgpa },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm py-1.5 border-b border-slate-50">
                        <span className="text-slate-400 font-medium">{item.label}</span>
                        <span className="font-semibold text-slate-700 text-right max-w-[55%] truncate">
                          {item.value || <span className="text-slate-300">Not added</span>}
                        </span>
                      </div>
                    ))}

                    <div className="pt-2">
                      <p className="text-xs text-slate-400 font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.skills
                          ? profile.skills.split(",").map((s, i) => (
                              <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-lg font-medium">
                                {s.trim()}
                              </span>
                            ))
                          : <span className="text-slate-400 text-xs">No skills added</span>
                        }
                      </div>
                    </div>

                    <Link href="/profile"
                      className="block text-center text-xs text-blue-600 font-semibold hover:underline mt-2 pt-2 border-t border-slate-100">
                      ✏️ Update Profile
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-4xl mb-3">🔒</p>
                    <p className="text-slate-500 text-sm mb-4">Sign in to load your profile</p>
                    <Link href="/login"
                      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-block hover:bg-blue-700 transition-colors">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>

              {/* Resume Upload Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-sm font-bold">📄</div>
                  <h2 className="font-bold text-slate-900">Resume</h2>
                </div>

                <label className="block border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-all group">
                  <input type="file" accept=".pdf,.txt" onChange={handleFile} className="hidden" />
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📂</div>
                  <p className="font-semibold text-slate-700 text-sm">Click to upload resume</p>
                  <p className="text-xs text-slate-400 mt-1">PDF or TXT file</p>
                </label>

                {resumeText && (
                  <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-sm font-semibold">
                    <span>✅</span> Resume loaded
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-xs text-slate-400 font-medium mb-2">Or paste resume text:</p>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    rows={5}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50 resize-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Match Button */}
            <button
              onClick={handleMatch}
              disabled={loading || !profile}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-5 rounded-2xl font-extrabold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {loadingMsg}
                </span>
              ) : "🤖 Find My Best Jobs with AI"}
            </button>

            {!profile && (
              <p className="text-center text-sm text-slate-500">
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
                {" "}and complete your profile to use AI matching.
              </p>
            )}
          </div>
        )}

        {/* ── STEP 2: RESULTS ── */}
        {step === 2 && matches && (
          <div className="space-y-5">

            {/* Back button */}
            <button
              onClick={() => { setStep(1); setMatches(null); }}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Match
            </button>

            {/* Score Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center shadow-lg">
              <p className="text-purple-200 text-xs font-bold uppercase tracking-widest mb-3">Your Overall Match Score</p>
              <div className="text-7xl font-extrabold mb-3 leading-none">{matches.overall_score}%</div>
              <div className="w-full bg-white/20 rounded-full h-2.5 mb-5 max-w-xs mx-auto">
                <div className="bg-white rounded-full h-2.5 transition-all duration-700" style={{ width: `${matches.overall_score}%` }}></div>
              </div>
              <p className="text-purple-100 text-sm max-w-md mx-auto leading-relaxed">{matches.summary}</p>
            </div>

            {/* Top Matches */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">🎯 Top Job Matches</h2>
              <div className="space-y-4">
                {matches.top_matches?.map((job, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className={`text-2xl font-extrabold ${scoreColor(job.match_score)}`}>
                            {job.match_score}%
                          </span>
                          <div>
                            <h3 className="font-bold text-slate-900">{job.title}</h3>
                            <p className="text-sm text-slate-500">{job.company}</p>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
                          <div className={`h-1.5 rounded-full transition-all ${scoreBarColor(job.match_score)}`}
                            style={{ width: `${job.match_score}%` }}></div>
                        </div>
                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">{job.match_reason}</p>
                        {job.missing_skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-xs font-bold text-orange-600">Missing skills:</span>
                            {job.missing_skills.map((s, j) => (
                              <span key={j} className="bg-orange-50 text-orange-600 border border-orange-200 text-xs px-2 py-0.5 rounded-lg font-medium">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <a href={jobLinks[job.job_id] || "#"} target="_blank" rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0">
                        Apply Now →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Advice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">💡 AI Career Advice</h2>
              <p className="text-slate-700 text-sm leading-relaxed">{matches.career_advice}</p>
            </div>

            {/* Skills to Learn */}
            {matches.recommended_skills?.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">📚 Recommended Skills to Learn</h2>
                <div className="flex flex-wrap gap-2">
                  {matches.recommended_skills.map((skill, i) => (
                    <span key={i} className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gaps */}
            {matches.skill_gaps?.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">⚠️ Skill Gaps to Address</h2>
                <div className="flex flex-wrap gap-2">
                  {matches.skill_gaps.map((skill, i) => (
                    <span key={i} className="bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 rounded-xl text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-4 pb-4">
              <Link href="/jobs"
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-center text-sm transition-colors">
                Browse All Jobs
              </Link>
              <Link href="/profile"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 py-4 rounded-xl font-bold text-center text-sm transition-colors">
                Update Profile
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
