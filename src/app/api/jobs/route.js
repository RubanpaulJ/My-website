import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const searchQueries = [
  "fresher software developer India",
  "entry level IT jobs India",
  "junior developer fresher India",
  "fresher web developer India",
];

async function fetchJobsForQuery(query) {
  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&num_pages=3&page=1`,
    {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  return data.data || [];
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    // Check last fetch time
    let lastFetched = null;
    try {
      const { data: meta } = await supabase
        .from("job_meta")
        .select("*")
        .eq("key", "last_fetched")
        .single();
      lastFetched = meta?.value ? new Date(meta.value) : null;
    } catch (e) {}

    const now = new Date();
    const hoursSince = lastFetched ? (now - lastFetched) / (1000 * 60 * 60) : 999;

    // Return cached if less than 24 hours
    if (!force && hoursSince < 24) {
      const { data: cachedJobs } = await supabase
        .from("live_jobs")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(50);

      return NextResponse.json({
        jobs: cachedJobs || [],
        cached: true,
        lastFetched: lastFetched?.toISOString(),
      });
    }

    // Fetch from ALL 4 queries to get more jobs
    console.log("Fetching fresh jobs from JSearch...");
    const allResults = [];

    for (const query of searchQueries) {
      try {
        const results = await fetchJobsForQuery(query);
        allResults.push(...results);
        // Small delay between requests
        await new Promise(r => setTimeout(r, 200));
      } catch (e) {
        console.error(`Failed query: ${query}`, e);
      }
    }

    if (allResults.length === 0) {
      // API failed — fall back to cached data rather than showing empty
      const { data: cachedJobs } = await supabase
        .from("live_jobs")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(50);
      return NextResponse.json({
        jobs: cachedJobs || [],
        cached: true,
        lastFetched: lastFetched?.toISOString(),
        warning: "Live fetch failed — showing cached jobs",
      });
    }

    // Remove duplicates by job_id
    const seen = new Set();
    const unique = allResults.filter(job => {
      if (seen.has(job.job_id)) return false;
      seen.add(job.job_id);
      return true;
    });

    // Format jobs
    const jobs = unique.map((job) => ({
      id: job.job_id,
      title: job.job_title || "Untitled",
      company: job.employer_name || "Unknown Company",
      location: job.job_city
        ? `${job.job_city}, ${job.job_country || "India"}`
        : (job.job_country || "India"),
      type: job.job_employment_type
        ? job.job_employment_type.replace(/_/g, " ")
        : "Full Time",
      salary: job.job_min_salary && job.job_max_salary
        ? `₹${Math.round(job.job_min_salary / 1000)}K - ₹${Math.round(job.job_max_salary / 1000)}K`
        : "Competitive",
      apply_link: job.job_apply_link || "#",
      description: job.job_description
        ? job.job_description.slice(0, 200) + "..."
        : "Click Apply to see full details.",
      company_logo: job.employer_logo || null,
      posted_at: job.job_posted_at_datetime_utc || new Date().toISOString(),
      source: job.job_publisher || "Google Jobs",
    }));

    // Upsert new jobs FIRST (no empty-table gap), then delete stale ones
    for (let i = 0; i < jobs.length; i += 20) {
      const batch = jobs.slice(i, i + 20);
      await supabase.from("live_jobs").upsert(batch, { onConflict: "id" });
    }
    const newIds = jobs.map(j => j.id);
    await supabase.from("live_jobs").delete().not("id", "in", `(${newIds.join(",")})`);


    // Update last fetched
    await supabase.from("job_meta").upsert({
      key: "last_fetched",
      value: now.toISOString(),
    }, { onConflict: "key" });

    return NextResponse.json({
      jobs,
      cached: false,
      lastFetched: now.toISOString(),
      total: jobs.length,
    });

  } catch (err) {
    console.error("Job fetch error:", err);
    try {
      const { data: cachedJobs } = await supabase
        .from("live_jobs")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(50);
      if (cachedJobs?.length > 0) {
        return NextResponse.json({ jobs: cachedJobs, cached: true, warning: "Error — showing cached jobs" });
      }
    } catch (e) {}
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}