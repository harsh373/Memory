import EventCard from "../components/EventCard";
import { useEvents } from "../context/EventsContext";

export default function Events() {
  const { events, loading, search, year, category } = useEvents();
  const now = new Date();

  const filteredEvents = events.filter((event) => {
    const isPastEvent = new Date(event.date) <= now;

    const matchSearch =
      event.name.toLowerCase().includes(search.toLowerCase());

    const matchYear =
      year === null || event.year === year;

    const matchCategory =
      category === null || event.category === category;

    return isPastEvent && matchSearch && matchYear && matchCategory;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <header className="mb-8">
          <h1 className="text-2xl font-semibold">
            All Events
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Explore all recorded campus moments
          </p>
        </header>

        {loading && (
          <p className="text-slate-500">
            Loading events...
          </p>
        )}

        {!loading && sortedEvents.length === 0 && (
          <p className="text-slate-500">
            No events found.
          </p>
        )}

        {!loading && sortedEvents.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((event) => (
              <EventCard
                key={event._id}
                title={event.name}
                year={event.year}
                coverImageUrl={event.coverImageUrl}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
