import { useEvents } from "../context/EventsContext";



export default function ExploreSection() {
  const {
    search,
    setSearch,
    year,
    setYear,
    category,
    setCategory,
    events,
  } = useEvents();

  const years = Array.from(new Set(events.map(e => e.year))).sort((a, b) => b - a);
  const categories = Array.from(new Set(events.map(e => e.category)));

  return (
    <section className="px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest text-slate-500 mb-4 text-center">
          EXPLORE MEMORIES
        </p>

        <div className="bg-white border border-slate-200 rounded-xl px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">

            
            <div className="relative flex-1">
              <img
                src="/icons/search.svg"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                alt=""
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by event name..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-300 text-sm focus:outline-none"
              />
            </div>

           
            <div className="relative">
              <img
                src="/icons/calender.svg"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                alt=""
              />
              <select
                value={year ?? ""}
                onChange={(e) =>
                  setYear(e.target.value ? Number(e.target.value) : null)
                }
                className="pl-10 pr-8 py-2 rounded-md border border-slate-300 text-sm bg-white focus:outline-none"
              >
                <option value="">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="relative">
              <img
                src="/icons/filter.svg"
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none"
                alt=""
              />
              <select
                value={category ?? ""}
                onChange={(e) => setCategory(e.target.value || null)}
                className="pl-10 pr-8 py-2 rounded-md border border-slate-300 text-sm bg-white focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
