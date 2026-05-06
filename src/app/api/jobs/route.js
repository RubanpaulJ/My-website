import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function fetchAdzunaJobs() {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const response = await fetch(
    `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=50&what=software+developer+fresher&content-type=application/json`,
    { signal: AbortSignal.timeout(8000) }
  );
  const data = await response.json();
  return data.results || [];
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

    // Return cached if less than 7 days
    if (!force && hoursSince < 168) {
      const { data: cachedJobs } = await supabase
        .from("live_jobs")
        .select("*")
        .order("posted_at", { ascending: false })
        .limit(50);

      if (cachedJobs?.length > 0) {
        return NextResponse.json({
          jobs: cachedJobs,
          cached: true,
          lastFetched: lastFetched?.toISOString(),
        });
      }
    }

    // Fetch fresh jobs from Adzuna
    console.log("Fetching fresh jobs from Adzuna...");
    let results = [];
    try {
      results = await fetchAdzunaJobs();
    } catch (e) {
      console.error("Adzuna fetch failed:", e);
    }

    if (results.length === 0) {
      // Fall back to cached data
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

    // Format jobs
    const jobs = results.map((job) => ({
      id: String(job.id),
      title: job.title || "Untitled",
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || "India",
      type: job.contract_time === "part_time" ? "Part Time" : "Full Time",
      salary:
        job.salary_min && job.salary_max
          ? `₹${Math.round(job.salary_min / 1000)}K - ₹${Math.round(job.salary_max / 1000)}K`
          : "Competitive",
      apply_link: job.redirect_url || "#",
      description: job.description
        ? job.description.slice(0, 200) + "..."
        : "Click Apply to see full details.",
      company_logo: null,
      posted_at: job.created || new Date().toISOString(),
      source: "Adzuna",
    }));

    // Upsert to Supabase cache
    for (let i = 0; i < jobs.length; i += 20) {
      const batch = jobs.slice(i, i + 20);
      await supabase.from("live_jobs").upsert(batch, { onConflict: "id" });
    }
    const newIds = jobs.map((j) => j.id);
    if (newIds.length > 0) {
      await supabase.from("live_jobs").delete().not("id", "in", `(${newIds.join(",")})`);
    }

    // Update last fetched
    await supabase.from("job_meta").upsert(
      { key: "last_fetched", value: now.toISOString() },
      { onConflict: "key" }
    );

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
