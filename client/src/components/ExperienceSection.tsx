import React, { useMemo } from "react";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

const experiences = [
  // {
  //   title: "AI Web Developer",
  //   company: "@WI Thinkers",
  //   period: "July 2025 – Present",
  //   description:
  //     "I manage multiple production websites end-to-end, from development to deployment, and recently delivered a new production project that improved performance by 30% and reduced downtime to under 1%.",
  //   skills: [
  //     "TypeScript",
  //     "Cursor",
  //     "REST API",
  //     "Production",
  //     "WIX",
  //     "Tailwind CSS",
  //   ],
  // },
  {
    title: "Freelance Frontend Developer",
    company: "@Self-Employed",
    period: "Nov 2024 – July 2025",
    description:
      "Built and maintained multiple responsive client websites, including a video editor portfolio that increased engagement 60%. Integrated WhatsApp API chatbot, cutting response time by 70%, deployed via Vercel.",
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "API Integration",
    ],
  },
  {
    title: "Web Development Intern",
    company: "@Motion Cut",
    period: "Oct 2023 – Nov 2023",
    description:
      "Developed a Netflix clone and Weather UI with 30% faster load times. Designed and launched a portfolio that boosted visitor engagement by 40%.",
    skills: ["JavaScript", "HTML5/CSS3", "GitHub", "Responsive Design"],
  },
];


// 🔥 Convert months → "X yr Y months"
function formatDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = "";

  if (years > 0) {
    result += years + (years === 1 ? " yr " : " yrs ");
  }

  if (months > 0) {
    result += months + (months === 1 ? " month" : " months");
  }

  return result.trim() || "0 months";
}


// 🔥 Calculate months between dates
function calculateMonths(period) {
  const monthsMap = {
    Jan: 0, January: 0,
    Feb: 1, February: 1,
    Mar: 2, March: 2,
    Apr: 3, April: 3,
    May: 4,
    Jun: 5, June: 5,
    Jul: 6, July: 6,
    Aug: 7, August: 7,
    Sep: 8, September: 8,
    Oct: 9, October: 9,
    Nov: 10, November: 10,
    Dec: 11, December: 11,
  };

  const now = new Date();
  const [start, end] = period.split(" – ");

  // START
  const [startMonthStr, startYearStr] = start.split(" ");
  const startMonth = monthsMap[startMonthStr];
  const startYear = parseInt(startYearStr);

  let endMonth, endYear;

  // END
  if (end === "Present") {
    endMonth = now.getMonth();
    endYear = now.getFullYear();
  } else {
    const parts = end.split(" ");

    if (parts.length === 2) {
      endMonth = monthsMap[parts[0]];
      endYear = parseInt(parts[1]);
    } else {
      endMonth = monthsMap[parts[0]];
      endYear = startYear;
    }
  }

  let totalMonths =
    (endYear - startYear) * 12 + (endMonth - startMonth);

  if (totalMonths <= 0) totalMonths = 1;

  return totalMonths;
}

function getPrimaryExperience(experiences) {
  // filter only non-freelance + present roles
  const validRoles = experiences.filter(
    (exp) =>
      exp.period.includes("Present") &&
      !exp.company.toLowerCase().includes("self")
  );

  if (validRoles.length === 0) return "0 months";

  // pick the most recent (first one usually)
  const latest = validRoles[0];

  const months = calculateMonths(latest.period);
  return formatDuration(months);
}

export default function ExperienceSection() {

  const totalExperience = useMemo(() => {
    return getPrimaryExperience(experiences);
  }, []);


  const timelineData = useMemo(() => {
    return experiences.map((exp) => {
      const duration = formatDuration(calculateMonths(exp.period));

      const yearMatch = exp.period.match(/\d{4}/);
      const year = yearMatch ? yearMatch[0] : exp.period.split(" ")[0];

      return {
        title: year,
        content: (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">
              {exp.title}
            </h3>

            <p className="text-blue-600 font-mono mb-3 text-sm md:text-base">
              {exp.company}
            </p>

            <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {exp.skills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 text-xs md:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <span className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-mono inline-block text-xs md:text-sm border border-gray-200">
                {exp.period} • {duration}
              </span>
            </div>
          </div>
        ),
      };
    });
  }, []);


  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* 🔥 Total Experience */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Total Experience</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {totalExperience}
          </h3>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Work <span className="text-blue-600">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <Timeline data={timelineData} />
      </div>
    </section>
  );
}