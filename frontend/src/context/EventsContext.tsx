import { createContext, useContext, useEffect, useState } from "react";
import { fetchEvents,fetchUpcomingEvents } from "../api/events.api";

type Event = {
  _id: string;
  name: string;
  category: string;
  year: number;
  date: string;
  coverImageUrl: string;
};

type UpcomingEvent = {
  _id: string;
  name: string;
  date: string;
  slug: string;
  coverImageUrl: string;
  description?: string;
} | null;


type EventsContextType = {
  events: Event[];
  loading: boolean;

  upcomingEvent: UpcomingEvent

  search: string;
  setSearch: (v: string) => void;

  year: number | null;
  setYear: (v: number | null) => void;

  category: string | null;
  setCategory: (v: string | null) => void;
};

const EventsContext = createContext<EventsContextType | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEvent>(null);


  const [search, setSearch] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
  (async () => {
    try {
      const [eventsData, upcoming] = await Promise.all([
        fetchEvents(),
        fetchUpcomingEvents()
      ]);
      setEvents(eventsData);
      setUpcomingEvent(upcoming);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        upcomingEvent,
        search,
        setSearch,
        year,
        setYear,
        category,
        setCategory,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEvents must be used inside EventsProvider");
  }
  return ctx;
}
