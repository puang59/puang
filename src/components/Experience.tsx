const experience = [
  {
    title: "ploglabs",
    position: "cofounder",
    date: "(june 2025 - present)",
    description:
      "a lab where we turn ai into practical tools that solve real problems for real people — fast, useful, and built for everyone.",
    link: "https://ploglabs.com",
  },
  {
    title: "devdoq",
    position: "cofounder",
    date: "(july 2025 - present)",
    description:
      "a tool that turns your codebase into living, ai generated docs synced to your repo. never outdated, always clear, and ready to onboard newcomers effortlessly",
    link: "https://devdoq.com",
  },
  {
    title: "aizonics",
    position: "full stack developer",
    date: "(may 2025 - july 2025)",
    description:
      "built a scalable api architecture with failure fallbacks and ratelimits, ensuring high availability and performance",
    link: "https://aizonics.com",
  },
  {
    title: "greendot aviation",
    position: "chief vfx artist",
    date: "(sep 2022 - aug 2023)",
    description:
      "worked on creating visual effects for air crash investigation documentaries",
    link: "https://www.youtube.com/@GreenDotAviation/",
  },
];

export default function Experience() {
  return (
    <div className="text-white mb-16">
      <h1 className="text-2xl font-bold text-white">
        <span className="text-green-300">&gt;</span> work
      </h1>
      <div className="mt-10">
        {experience.map((exp) => (
          <div key={exp.title} className="mt-10 group">
            <a
              href={exp.link}
              className="text-xl font-bold transition-all duration-300 ease-in-out group-hover:text-green-300"
            >
              {exp.title}
            </a>
            <p className="text-gray-500 text-xs mt-2">
              {exp.position} | {exp.date}
            </p>
            <p className="text-gray-400 mt-5 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
