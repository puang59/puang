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
          hi im 21 y/o cs undergrad student currently based in chennai, india. i
          have a deep interest in working with web technologies and AI agent
          pipelines. you can find some of my work on my{" "}
          <a
            href="https://puang.in/projects"
            className="text-green-300 hover:underline"
          >
            projects page
          </a>
          . i build anything that interests me, from web apps to cli tools and
          even some hardware tinkering.
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          sometimes abstractions annoys me so i often dive deep into the
          internals of things to understand how they work. i would rather spend
          hours understanding something as basic as websockets than allowing
          myself to use a library that abstracts it away.
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          other than building and shipping things, i enjoy writings blogs around
          personal experiences and philosophy, reading books and obsessing over
          retro tech and vintange computers.
        </p>

        <p className="text-gray-300 leading-relaxed tracking-wide">
          im open to new roles, collaborations and opportunities so feel free to
          reach out to me on{" "}
          <a
            href="https://x.com/notpuang"
            className="text-green-300 hover:underline"
          >
            X
          </a>{" "}
          or
          <a
            href="mailto:hello@puang.in"
            className="text-green-300 hover:underline"
          >
            {" "}
            email
          </a>
          . you can refer to my{" "}
          <a
            href="https://puang.in/resume.pdf"
            className="text-green-300 hover:underline"
          >
            resume
          </a>{" "}
          for more details or checkout what im upto on my{" "}
          <a
            href="https://github.com/puang59"
            className="text-green-300 hover:underline"
          >
            github
          </a>
          .
        </p>
      </div>
    </section>
  );
}
