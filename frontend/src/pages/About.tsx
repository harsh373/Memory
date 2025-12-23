export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">

     
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-sky-50" />
        <div className="relative px-6 pt-28 pb-24 max-w-5xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-slate-900">
            About the Archive
          </h1>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Why this platform exists and what it represents.
          </p>

        </div>
      </section>

      
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-20">

          
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <span className="inline-block text-3xl font-5xl text-indigo-700 tracking-wide uppercase">
                Purpose
              </span>
            </div>

            <p className="md:col-span-3 text-lg text-slate-700 leading-relaxed">
              The IIIT Archive is a digital memory space created to preserve
              moments from campus life that often fade with time. College
              years are filled with events, friendships, celebrations, and
              experiences that shape who we become, yet most of these
              memories remain scattered across personal devices or are
              eventually forgotten.
            </p>
          </div>

         
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <span className="inline-block text-3xl font-medium text-indigo-700 tracking-wide uppercase">
                Idea
              </span>
            </div>

            <p className="md:col-span-3 text-lg text-slate-700 leading-relaxed">
              This archive brings those moments together in one place.
              Instead of being a social platform or a public feed, it is
              designed as a curated collection — a place to look back,
              reflect, and remember.
            </p>
          </div>

         
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <span className="inline-block text-3xl font-medium text-indigo-700 tracking-wide uppercase">
                Structure
              </span>
            </div>

            <p className="md:col-span-3 text-lg text-slate-700 leading-relaxed">
              Events featured here are carefully added and managed to
              maintain accuracy and relevance. Photographs are organized
              by events, allowing viewers to explore memories in context
              rather than as isolated images.
            </p>
          </div>

          
          <div className="grid md:grid-cols-5 gap-10 items-start">
            <div className="md:col-span-2">
              <span className="inline-block text-3xl font-medium text-indigo-700 tracking-wide uppercase">
                Goal
              </span>
            </div>

            <p className="md:col-span-3 text-lg text-slate-700 leading-relaxed">
              The goal of this project is simple: to create a lasting
              digital record of campus life that students can revisit
              long after their college years have passed.
            </p>
          </div>

        </div>
      </section>

      
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>
            This project is maintained as an internal college archive and
            is intended for memory preservation and documentation.
          </p>
        </div>
      </section>

    </main>
  );
}
