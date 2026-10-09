import { fetchGithubContributions } from "../shared/githubContributions";

const GITHUB_USER = "GaneshKantle";

// Vercel serverless function: GET /api/github-contributions
export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json({ error: "GITHUB_TOKEN is not configured" }, { status: 500 });
  }

  try {
    const data = await fetchGithubContributions(GITHUB_USER, token);
    return Response.json(data, {
      headers: {
        // Cache at Vercel's edge for 1h, serve stale for up to a day while refreshing
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("github-contributions error:", err);
    return Response.json({ error: "Failed to load contributions" }, { status: 502 });
  }
}
