"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [jobTypes, setJobTypes] = useState([]);
  const [workModes, setWorkModes] = useState([]);

  const fetchJobs = async (force = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs${force ? "?force=true" : ""}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setLastFetched(data.lastFetched);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const timeAgo = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const mins = Math.floor((new Date() - d) / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return "Today";
    if (hrs < 48) return "Yesterday";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const toggleFilter = (value, list, setList) => {
    setList(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const clearAll = () => {
    setJobTypes([]);
    setWorkModes([]);
    setSearch("");
  };

  // Smart type matching — handles FULL_TIME, Full-time, Full Time etc.
  const normalizeType = (type) => {
    if (!type) return "";
    const t = type.toUpperCase().replace(/[-_\s]/g, "");
    if (t.includes("FULLTIME")) return "Full Time";
    if (t.includes("INTERN")) return "Internship";
    if (t.includes("PARTTIME")) return "Part Time";
    if (t.includes("CONTRACT")) return "Contractor";
    return type;
  };

  // Smart work mode detection from job data
  const getWorkMode = (job) => {
    const text = (job.title + " " + job.description + " " + job.location).toLowerCase();
    if (text.includes("remote")) return "Remote";
    if (text.includes("hybrid")) return "Hybrid";
    return "On-site";
  };

  const filtered = jobs.filter((job) => {
    const matchSearch =
      !search ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase()) ||
      job.location?.toLowerCase().includes(search.toLowerCase());

    const normalizedType = normalizeType(job.type);
    const matchType =
      jobTypes.length === 0 || jobTypes.includes(normalizedType);

    const workMode = getWorkMode(job);
    const matchMode =
      workModes.length === 0 || workModes.includes(workMode);

    return matchSearch && matchType && matchMode;
  });

  const activeFilterCount = jobTypes.length + workModes.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-1">IT Fresher Jobs in India</h1>
          <p className="text-gray-500 text-sm mb-5">Real-time listings from top tech companies</p>

          {/* Search + Refresh */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search by title, company, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
              )}
            </div>
            <button
              onClick={() => { setRefreshing(true); fetchJobs(true); }}
              disabled={refreshing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {refreshing ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              ) : "🔄"} Refresh Jobs
            </button>
          </div>

          {/* Status bar */}
          {lastFetched && (
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
              <p className="text-xs text-gray-400">
                Last updated: {timeAgo(lastFetched)} · Updates daily ·{" "}
                <span className="font-bold text-gray-600">{filtered.length} jobs found</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-6">

        {/* SIDEBAR FILTERS */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-gray-800">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearAll}
                  className="text-blue-600 text-xs font-semibold hover:underline">
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Job Type</p>
              {["Full Time", "Internship", "Part Time", "Contractor"].map((type) => {
                const count = jobs.filter(j => normalizeType(j.type) === type).length;
                return (
                  <label key={type}
                    className="flex items-center justify-between gap-2 py-2 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => toggleFilter(type, jobTypes, setJobTypes)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition ${
                          jobTypes.includes(type)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {jobTypes.includes(type) && (
                          <span className="text-white text-xs font-black">✓</span>
                        )}
                      </div>
                      <span
                        onClick={() => toggleFilter(type, jobTypes, setJobTypes)}
                        className={`text-sm transition ${
                          jobTypes.includes(type) ? "text-blue-600 font-bold" : "text-gray-600 group-hover:text-gray-800"
                        }`}
                      >
                        {type}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Work Mode */}
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Work Mode</p>
              {["On-site", "Remote", "Hybrid"].map((mode) => {
                const count = jobs.filter(j => getWorkMode(j) === mode).length;
                return (
                  <label key={mode}
                    className="flex items-center justify-between gap-2 py-2 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => toggleFilter(mode, workModes, setWorkModes)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition ${
                          workModes.includes(mode)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {workModes.includes(mode) && (
                          <span className="text-white text-xs font-black">✓</span>
                        )}
                      </div>
                      <span
                        onClick={() => toggleFilter(mode, workModes, setWorkModes)}
                        className={`text-sm transition ${
                          workModes.includes(mode) ? "text-blue-600 font-bold" : "text-gray-600 group-hover:text-gray-800"
                        }`}
                      >
                        {mode}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* JOB LISTINGS */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Fetching real-time jobs...</p>
              <p className="text-gray-400 text-sm mt-1">Searching Google Jobs & LinkedIn</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <div key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-100">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    {job.company_logo ? (
                      <img src={job.company_logo} alt={job.company}
                        className="w-12 h-12 rounded-xl object-contain border border-gray-100 p-1 flex-shrink-0" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-lg flex-shrink-0">
                        {job.company?.charAt(0)}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-black text-gray-900 text-base leading-tight">{job.title}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                          normalizeType(job.type) === "Internship"
                            ? "bg-orange-100 text-orange-700"
                            : normalizeType(job.type) === "Part Time"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {normalizeType(job.type)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm font-semibold mb-2">{job.company}</p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>📍 {job.location}</span>
                        <span>• 🕐 {timeAgo(job.posted_at)}</span>
                        <span>• via {job.source}</span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${
                          getWorkMode(job) === "Remote"
                            ? "bg-green-100 text-green-700"
                            : getWorkMode(job) === "Hybrid"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {getWorkMode(job)}
                        </span>
                      </div>

                      {job.description && (
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                          {job.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-green-600">{job.salary}</span>
                        <a href={job.apply_link} target="_blank" rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-xl transition font-bold">
                          Apply Now →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-black text-gray-800 mb-2">No jobs found</p>
              <p className="text-gray-400 text-sm mb-4">Try different search terms or clear filters</p>
              <button onClick={clearAll}
                className="text-blue-600 font-bold hover:underline text-sm">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}