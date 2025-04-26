import { ProjectCards } from "~/components/ProjectCards";

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col text-white p-8 md:p-16 lg:p-24 max-w-4xl mx-auto mt-5 md:mt-0">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-green-300">&gt;</span> projects
        </h2>
        <ProjectCards />
      </div>
    </main>
  );
}

export const metadata = {
  title: "Projects",
  description: "These are some projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.puang.in/og/home?title=projects",
      },
    ],
  },
};
