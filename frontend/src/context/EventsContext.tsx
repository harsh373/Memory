import { createContext, useContext, useEffect, useState } from "react";
import { fetchEvents } from "../api/events.api";

type Event = {
  _id: string;
  name: string;
  category: string;
  year: number;
  date: string;
  coverImageUrl: string;
};

type EventsContextType = {
  events: Event[];
  loading: boolean;

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

  const [search, setSearch] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
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
