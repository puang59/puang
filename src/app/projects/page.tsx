import { ProjectCards } from "~/components/ProjectCards";

export default function Projects() {
  return (
    <main className="mx-auto mt-5 flex min-h-screen max-w-[1800px] flex-col p-8 text-white md:mt-0 md:p-16 lg:px-12 lg:py-24 xl:px-16">
      <div className="flex-1">
        <h2 className="mb-2 font-bold text-3xl">
          <span className="text-green-300">&gt;</span> projects
        </h2>
        <p className="max-w-2xl text-gray-400 text-sm leading-relaxed">
          most of these come with demo videos and X posts, so you can see how
          they actually work and the impact they had. where there's a live site,
          source code, or a write-up, the links are right there on the card if
          you want to dig deeper.
        </p>
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
