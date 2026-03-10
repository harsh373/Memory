import api from "./axios";

export type Event = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  year: number;
  date: string;
  description: string;
  coverImageUrl: string;
  gdriveLink?: string | null; 
  createdAt?: string;
};

export const fetchEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events");
  return res.data;
};

export const fetchEventBySlug = async (slug: string): Promise<Event> => {
  const res = await api.get(`/events/${slug}`);
  return res.data;
};

export type CreateEventPayload = {
  name: string;
  category: string;
  year: number;
  date: string;
  description: string;
  coverImage: File;
  gdriveLink?: string; // ← NEW
};

export const createEvent = async (
  payload: CreateEventPayload
): Promise<Event> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("category", payload.category);
  formData.append("year", String(payload.year));
  formData.append("date", payload.date);
  formData.append("description", payload.description);
  formData.append("coverImage", payload.coverImage);
  if (payload.gdriveLink) {
    formData.append("gdriveLink", payload.gdriveLink); // ← NEW
  }
  const res = await api.post("/events", formData);
  return res.data;
};

export const fetchUpcomingEvents = async () => {
  const res = await api.get("/events/upcoming");
  return res.data.event;
};


export const updateGdriveLink = async (
  eventId: string,
  gdriveLink: string
): Promise<Event> => {
  const res = await api.patch(`/events/${eventId}/gdrive`, { gdriveLink });
  return res.data;
};