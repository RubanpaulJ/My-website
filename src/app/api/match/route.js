import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { profile, resumeText, jobs } = await request.json();

    const jobsList = jobs?.slice(0, 20).map(j =>
      `ID: ${j.id} | Title: ${j.title} | Company: ${j.company} | Location: ${j.location} | Type: ${j.type} | Info: ${j.description?.slice(0, 100)}`
    ).join("\n") || "No jobs available";

    const profileSummary = `
Name: ${profile.name || "Unknown"}
Degree: ${profile.degree || "Not specified"}
College: ${profile.college || "Not specified"}
Skills: ${profile.skills || "Not specified"}
City: ${profile.city || "Not specified"}
CGPA: ${profile.cgpa || "Not specified"}
About: ${profile.about || "Not specified"}
${resumeText ? `\nResume:\n${resumeText.slice(0, 500)}` : ""}
    `.trim();

    const prompt = `You are an expert IT job matcher for freshers in India.

Analyze this fresher profile and match to the best jobs.

FRESHER PROFILE:
${profileSummary}

AVAILABLE JOBS:
${jobsList}

Return ONLY valid JSON (no markdown, no backticks, no extra text):
{
  "overall_score": 85,
  "summary": "2-3 sentence career summary",
  "top_matches": [
    {
      "job_id": "id",
      "title": "title",
      "company": "company",
      "match_score": 92,
      "match_reason": "one sentence why",
      "missing_skills": ["skill1"]
    }
  ],
  "skill_gaps": ["skill1", "skill2"],
  "career_advice": "2-3 sentence personalized advice",
  "recommended_skills": ["skill1", "skill2", "skill3"]
}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful IT job matching assistant. Always respond with valid JSON only, no markdown.",
          },
          {
            role: "user",
            content: prompt,
          }
        ],
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    const text = data.choices?.[0]?.message?.content || "";
    const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);

  } catch (err) {
    console.error("Match API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}