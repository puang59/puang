export default function About() {
	return (
		<section className="mb-16 space-y-6">
			<div>
				<h2 className="mb-2 font-bold text-3xl">
					<span className="text-green-300">&gt;</span> about
				</h2>
				<p className="mb-4 text-gray-500 text-xs italic">
					[ break → understand → build ]
				</p>
			</div>

			<div className="space-y-5 text-sm">
				<p className="text-gray-300 leading-relaxed tracking-wide">
					21 y/o cs undergrad
					<br />i like building things that people genuinely enjoy using and
					that leave some kind of impact
				</p>

				<p className="text-gray-300 leading-relaxed tracking-wide">
					that ends up looking like an http server written from scratch in c, a
					self-hosted search engine in go, a terminal discord client, and a few
					ai tools that ship to real users
					<br />
					mostly code, sometimes hardware
				</p>

				<p className="text-gray-300 leading-relaxed tracking-wide">
					i like going a layer deeper than i need to — sockets, threads,
					crawlers, protocols — mostly to find out how the thing actually works
					instead of trusting the abstraction
				</p>

				<p className="text-gray-300 leading-relaxed tracking-wide">
					outside that: retro tech, cameras, books, and random tinkering that
					occasionally turns into a project
				</p>
			</div>
		</section>
	);
}
