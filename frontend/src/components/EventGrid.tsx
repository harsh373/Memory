import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { useEvents } from "../context/EventsContext";

export default function EventsGrid() {
  const { events, loading, search, year, category } = useEvents();

 
  const filteredEvents = events.filter((event) => {
    const matchSearch =
      event.name.toLowerCase().includes(search.toLowerCase());

    const matchYear =
      year === null || event.year === year;

    const matchCategory =
      category === null || event.category === category;

    return matchSearch && matchYear && matchCategory;
  });

  
  const sortedEvents = [...filteredEvents].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  
  const visibleEvents = sortedEvents.slice(0, 12);

  return (
    <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-medium mb-4">
          Moments from Campus
        </h2>

        {loading && (
          <p className="text-slate-500">
            Loading events...
          </p>
        )}

        {!loading && visibleEvents.length === 0 && (
          <p className="text-slate-500">
            No events found.
          </p>
        )}

        {!loading && visibleEvents.length > 0 && (
          <>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleEvents.map((event) => (
                <EventCard
                  key={event._id}
                  title={event.name}
                  year={event.year}
                  coverImageUrl={event.coverImageUrl}
                />
              ))}
            </div>

            
            { (
              <div className="mt-10 flex justify-center">
                <Link
                  to="/all-event"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="
                        px-6 py-2
                        bg-black
                        border border-slate-300
                        rounded text-sm text-white hover:bg-white hover:text-black transition duration-200"
                >
                  View All Events
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
