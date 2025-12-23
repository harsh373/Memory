import { useState } from "react";
import { createEvent } from "../api/events.api";

export default function AdminCreateEvent() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    year: "",
    date: "",
    description: "",
    coverImage: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({
        ...prev,
        coverImage: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.coverImage) {
      alert("Cover image is required");
      return;
    }

    await createEvent({
      name: form.name,
      category: form.category,
      year: Number(form.year),
      date: form.date,
      description: form.description,
      coverImage: form.coverImage,
    });

    alert("Event created successfully");

    setForm({
      name: "",
      category: "",
      year: "",
      date: "",
      description: "",
      coverImage: null,
    });
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Create New Event
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="category"
          placeholder="Category (e.g. Cultural, Sports)"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="year"
          type="number"
          placeholder="Year (e.g. 2024)"
          value={form.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Event description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={4}
        />

       
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Create Event
        </button>

      </form>
    </main>
  );
}
