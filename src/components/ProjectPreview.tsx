import Link from "next/link";
import { projectList } from "./Projects";

export default function ProjectPreview() {
  // Take top 4 projects
  const projects = projectList.slice(0, 4);

  return (
    <div className="text-white mb-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-green-300">&gt;</span> projects
        </h1>
        <Link 
          href="/projects" 
          className="text-sm text-gray-500 hover:text-green-300 transition-all duration-300 flex items-center gap-1"
        >
          view all <span className="text-xs">→</span>
        </Link>
      </div>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.title} className="group">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-200 group-hover:text-green-300 transition-colors duration-300 truncate">
                  {project.title}
                </h2>
                <p className="text-gray-500 text-xs font-mono whitespace-nowrap">
                  {project.technologies.join(", ")}
                </p>
              </div>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-[95%]">
                {project.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
