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
					mostly working with code, sometimes hardware
					<br />i like building things that people genuinely enjoy using and
					that leave some kind of impact
				</p>

				<p className="text-gray-300 leading-relaxed tracking-wide">
					into low-level systems, retro tech, and random tinkering. also into
					books, media, cameras, and understanding how things work under the
					hood
				</p>
			</div>
		</section>
	);
}
