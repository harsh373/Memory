import { usePictureOfDay } from "../context/PictureOfDayContext";

export default function Featured() {
  const { data, loading } = usePictureOfDay();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-20">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-slate-900">
            Featured Memory
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Each day, one photograph is randomly selected by the
            algorithm to represent a meaningful moment from campus life.
            This selection may reflect an important event, a shared
            memory, or a moment that captures the spirit of the college.
          </p>
        </header>

        
        <div
          className="
            group
            bg-white
            border border-slate-200
            rounded-xl
            shadow-sm
            overflow-hidden
            transition
            hover:shadow-md
          "
        >
        
          <div className="aspect-4/3 bg-slate-100 flex items-center justify-center overflow-hidden">
            {loading && (
              <span className="text-slate-500 text-sm">
                Loading featured memory...
              </span>
            )}

            {!loading && data && (
              <img
                src={data.imageUrl}
                alt="Featured memory"
                className="
                  w-full h-full
                  object-cover object-top
                  transition-transform duration-500 ease-out
                  group-hover:scale-[1.03]
                "
              />
            )}

            {!loading && !data && (
              <span className="text-slate-500 text-sm">
                No featured memory available today
              </span>
            )}
          </div>

         
          {data && (
            <div className="px-6 py-5 text-center">
              <p className="text-base font-medium text-slate-800">
                {data.eventName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {data.year}
              </p>
            </div>
          )}
        </div>

       
        <p className="mt-10 text-center text-xs text-slate-500">
          Featured memories are curated by the archive administrators
          to preserve and highlight moments of lasting significance.
        </p>

      </div>
    </main>
  );
}
