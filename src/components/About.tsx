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
          19 y/o cs undergrad who learns best by breaking things and putting
          them back together. I build stuff—mostly with code, sometimes with
          hardware
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          i like making ideas real and seeing how far I can push them. I'm
          curious by default, and I get things done quietly
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          into retro tech, low-level systems, and tinkering. Also love media
          production and working with cameras
        </p>
      </div>
    </section>
  );
}
