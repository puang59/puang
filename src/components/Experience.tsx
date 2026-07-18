import { RiArrowRightUpLine } from "@remixicon/react";

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
    title: "thinkdeck",
    position: "full stack developer",
    date: "(may 2025 - july 2025)",
    description:
      "built a scalable api architecture with failure fallbacks and ratelimits, ensuring high availability and performance",
    link: "https://thinkdeck.site",
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
      <h1 className="text-2xl font-bold text-white mb-8">
        <span className="text-green-300">&gt;</span> work
      </h1>
      <div className="grid grid-cols-1 gap-2">
        {experience.map((exp) => (
          <a
            key={exp.title}
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block -mx-6 p-6 hover:bg-zinc-900/50 hover:border-green-300/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="absolute top-5 right-5 text-gray-500 group-hover:text-green-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
              <RiArrowRightUpLine size={20} />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                {exp.title}
              </h2>
              <p className="text-gray-500 text-xs font-mono">
                {exp.position} <span className="mx-1 text-zinc-700">|</span>{" "}
                {exp.date}
              </p>
            </div>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-[95%]">
              {exp.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
