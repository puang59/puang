const experience = [
  {
    title: "devknit",
    position: "cofounder and cto",
    date: "(aug 2024 - present)",
    description:
      "building a platform for developers to share their projects and learn from each other",
    link: "https://devknit.com",
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
        <span className="text-green-300">&gt;</span> worked at
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
