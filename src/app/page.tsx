import Image from "next/image";
import About from "~/components/About";
import BlogPreview from "~/components/BlogPreview";
import Education from "~/components/Education";
import Experience from "~/components/Experience";
import GithubChart from "~/components/GithubChart";
import ProjectPreview from "~/components/ProjectPreview";
import Socials from "~/components/Socials";

export default function HomePage() {
	return (
		<main className="mx-auto flex min-h-screen max-w-5xl flex-col p-8 text-white md:p-16 lg:p-24">
			<div className="-mx-4 mt-10 mb-10 flex flex-row items-center gap-5 border border-zinc-800 p-4 md:mt-0">
				<div>
					<div className="flex items-center justify-center overflow-hidden">
						<Image
							// src="https://avatars.githubusercontent.com/u/59052194?v=4"
							src="/puang2.jpg"
							alt="Profile Image"
							width={60}
							height={60}
							className="h-full w-full object-cover grayscale"
						/>
					</div>
				</div>
				<div>
					<h1 className="font-bold text-2xl">karan</h1>
					<a
						href="https://x.com/notpuang"
						target="_blank"
						className="text-gray-400 text-sm transition-all duration-300 hover:text-green-300"
						rel="noreferrer"
					>
						@puang59
					</a>
				</div>
			</div>

			<About />
			<GithubChart />
			<Experience />
			<ProjectPreview />
			<BlogPreview />
			<Education />
			<Socials />
		</main>
	);
}
