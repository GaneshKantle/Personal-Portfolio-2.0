export type ContributionDay = {
  date: string;
  count: number;
};

export type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

const GRAPHQL_URL = "https://api.github.com/graphql";

const YEARS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection { contributionYears }
    }
  }
`;

const CALENDAR_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

async function graphql<T>(
  token: string,
  query: string,
  variables: Record<string, string>,
): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-contributions",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL failed (${res.status})`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length || !json.data) {
    throw new Error(json.errors?.[0]?.message ?? "GitHub GraphQL returned no data");
  }
  return json.data;
}

/** Full contribution history (all years) via GitHub's GraphQL API. */
export async function fetchGithubContributions(
  login: string,
  token: string,
): Promise<ContributionsResponse> {
  const { user } = await graphql<{
    user: { contributionsCollection: { contributionYears: number[] } } | null;
  }>(token, YEARS_QUERY, { login });
  if (!user) throw new Error(`GitHub user "${login}" not found`);

  const years = user.contributionsCollection.contributionYears;

  const calendars = await Promise.all(
    years.map(async (year) => {
      const data = await graphql<{
        user: {
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: number;
              weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
            };
          };
        };
      }>(token, CALENDAR_QUERY, {
        login,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      });
      return { year, calendar: data.user.contributionsCollection.contributionCalendar };
    }),
  );

  const total: Record<string, number> = {};
  const contributions: ContributionDay[] = [];
  for (const { year, calendar } of calendars) {
    total[year] = calendar.totalContributions;
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        contributions.push({ date: day.date, count: day.contributionCount });
      }
    }
  }
  contributions.sort((a, b) => a.date.localeCompare(b.date));

  return { total, contributions };
}
