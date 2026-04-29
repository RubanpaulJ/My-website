"use client";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [search, setSearch] = useState("");

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 min-h-[90vh] flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center text-white">

        {/* Badge */}
        <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
          🎓 Exclusively for IT Freshers — 0 to 1 Year Experience
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Launch Your <span className="text-yellow-300">IT Career</span> <br />
          With Confidence
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Thousands of fresher-friendly IT jobs from top companies. No experience filters. Just opportunities built for you.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white rounded-2xl p-2 max-w-2xl mx-auto shadow-xl mb-10">
          <input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-xl text-base w-full"
          />
          <Link
            href="/jobs"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition w-full sm:w-auto text-center"
          >
            Search Jobs
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-white">
          <div>
            <p className="text-3xl font-bold">5,000+</p>
            <p className="text-blue-200 text-sm">Fresher Jobs</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1,200+</p>
            <p className="text-blue-200 text-sm">Companies</p>
          </div>
          <div>
            <p className="text-3xl font-bold">50,000+</p>
            <p className="text-blue-200 text-sm">Students Placed</p>
          </div>
        </div>

      </div>
    </section>
  );
}