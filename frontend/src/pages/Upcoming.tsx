import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../api/axios";

type Event = {
  _id: string;
  name: string;
  year: number;
  date: string;
  slug: string;
  coverImageUrl: string;
};

export default function Upcoming() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/events/upcoming");
        setEvents(res.data.events || []);
      } catch (err) {
        console.error("Failed to fetch upcoming events", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <header className="mb-8">
          <h1 className="text-2xl font-semibold">
            Upcoming Events
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Events scheduled in the future
          </p>
        </header>

        {loading && (
          <p className="text-slate-500">
            Loading upcoming events...
          </p>
        )}

        {!loading && events.length === 0 && (
          <p className="text-slate-500">
            No upcoming events.
          </p>
        )}

        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
