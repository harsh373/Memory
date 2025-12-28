import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

type UpcomingEvent = {
  _id: string;
  name: string;
  slug: string;
  date: string;
  coverImageUrl: string;
};

export default function AdminUpcoming() {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/events/upcoming");
        setEvents(res.data.events || []);
      } catch (error) {
        console.error("Failed to fetch upcoming events", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <p className="text-slate-600">Checking upcoming events…</p>
      </main>
    );
  }

  /* ---------- NO UPCOMING EVENTS ---------- */
  if (events.length === 0) {
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Upcoming Events
        </h1>

        <p className="text-slate-600 mb-6">
          No upcoming events are scheduled.
        </p>

        <Link
          to="/admin/create-event"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Create Event
        </Link>
      </main>
    );
  }

  /* ---------- UPCOMING EVENTS LIST ---------- */
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="rounded-lg border border-slate-200 bg-white overflow-hidden"
          >
            <img
              src={event.coverImageUrl}
              alt={event.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="font-medium text-slate-900">
                {event.name}
              </h2>

              <p className="text-sm text-slate-600">
                {new Date(event.date).toDateString()}
              </p>

              <div className="pt-3 flex flex-col gap-2">
                <Link
                  to="/admin/upload-photos"
                  className="block text-center border border-black text-black py-1.5 rounded"
                >
                  Upload Photos / Update Cover
                </Link>

                <Link
                  to={`/events/${event.slug}`}
                  className="block text-center text-sm text-blue-600 hover:underline"
                >
                  View Public Page →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
