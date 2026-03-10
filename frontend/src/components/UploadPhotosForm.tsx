import { useEffect, useState } from "react";
import { fetchEvents, updateGdriveLink, type Event } from "../api/events.api";
import { uploadPhotos } from "../api/photos.api";
import api from "../api/axios";

export default function UploadForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [updatingCover, setUpdatingCover] = useState(false);

  // ─── NEW: gdrive link state ───────────────────────────────────────────────
  const [gdriveLink, setGdriveLink] = useState("");
  const [savingLink, setSavingLink] = useState(false);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  // ─── NEW: pre-fill the gdrive input when admin selects an event ──────────
  useEffect(() => {
    if (!eventId) {
      setGdriveLink("");
      return;
    }
    const selected = events.find((e) => e._id === eventId);
    setGdriveLink(selected?.gdriveLink ?? "");
  }, [eventId, events]);
  // ─────────────────────────────────────────────────────────────────────────

  const handleUploadPhotos = async () => {
    if (!eventId || files.length === 0) return;
    try {
      setUploading(true);
      await uploadPhotos(eventId, files);
      alert("Photos uploaded successfully");
      setFiles([]);
    } finally {
      setUploading(false);
    }
  };

  const handleCoverUpload = async () => {
    if (!eventId || !coverFile) return;
    const formData = new FormData();
    formData.append("cover", coverFile);
    try {
      setUpdatingCover(true);
      await api.put(`/events/${eventId}/cover`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cover photo updated successfully");
      setCoverFile(null);
    } finally {
      setUpdatingCover(false);
    }
  };

  // ─── NEW: save gdrive link ────────────────────────────────────────────────
  const handleSaveGdriveLink = async () => {
    if (!eventId) return;
    try {
      setSavingLink(true);
      const updated = await updateGdriveLink(eventId, gdriveLink);
      // update local cache so the pre-fill stays in sync
      setEvents((prev) =>
        prev.map((e) => (e._id === eventId ? { ...e, gdriveLink: updated.gdriveLink } : e))
      );
      alert(
        gdriveLink
          ? "Google Drive link saved!"
          : "Google Drive link removed."
      );
    } finally {
      setSavingLink(false);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Upload Event Photos</h1>

      <div className="space-y-6">
      
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select Event
          </label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded"
          >
            <option value="">Choose an event</option>
            {events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Google Drive Link{" "}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="url"
            placeholder="https://drive.google.com/drive/folders/..."
            value={gdriveLink}
            onChange={(e) => setGdriveLink(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded"
          />
          <p className="mt-1 text-xs text-slate-400">
            Visitors will see a "More Photos →" button linking here.
          </p>
          <button
            onClick={handleSaveGdriveLink}
            disabled={!eventId || savingLink}
            className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded disabled:opacity-50 hover:bg-blue-50 transition-colors"
          >
            {savingLink ? "Saving..." : "Save Drive Link"}
          </button>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select Photos
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full p-2 border border-slate-300 rounded"
          />
          {files.length > 0 && (
            <p className="mt-1 text-sm text-slate-600">
              {files.length} photo(s) selected
            </p>
          )}
          <button
            onClick={handleUploadPhotos}
            disabled={!eventId || files.length === 0 || uploading}
            className="mt-3 w-full bg-black text-white py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Photos"}
          </button>
        </div>

     
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Update Cover Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-slate-300 rounded"
          />
          <button
            onClick={handleCoverUpload}
            disabled={!eventId || !coverFile || updatingCover}
            className="mt-3 w-full border border-black text-black py-2 rounded disabled:opacity-50"
          >
            {updatingCover ? "Updating Cover..." : "Update Cover Photo"}
          </button>
        </div>
      </div>
    </main>
  );
}