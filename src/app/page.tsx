import Image from "next/image";
import About from "~/components/About";
import Education from "~/components/Education";
import Experience from "~/components/Experience";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col text-white p-8 md:p-16 lg:p-24 max-w-3xl mx-auto">
      <div className="mb-16 flex flex-row items-center gap-5 border border-zinc-800 p-4 ">
        <div>
          <div className="overflow-hidden flex items-center justify-center">
            <Image
              src="https://avatars.githubusercontent.com/u/59052194?v=4"
              alt="Profile Image"
              width={60}
              height={60}
              className="object-cover w-full h-full "
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">karan</h1>
          <p className="text-sm text-gray-400">@puang59</p>
        </div>
      </div>

      <About />
      <Experience />
      <Education />
    </main>
  );
}
