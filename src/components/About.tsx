export default function About() {
  return (
    <section className="mb-16 space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-green-300">&gt;</span> about
        </h2>
        <p className="text-gray-500 italic text-xs mb-4">
          [ break → understand → build ]
        </p>
      </div>

      <div className="space-y-5 text-sm">
        <p className="text-gray-300 leading-relaxed tracking-wide">
          19 y/o cs undergrad. i build things—mostly with code, sometimes
          hardware
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          i like taking ideas and pushing them till they turn into something
          real. curious by default, get things done without much noise
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          into retro tech, low-level systems, and random tinkering. also into
          books, media stuff, and working with cameras
        </p>
      </div>
    </section>
  );
}
