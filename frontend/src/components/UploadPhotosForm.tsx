import { useEffect, useState } from "react";
import { fetchEvents, type Event } from "../api/events.api";
import { uploadPhotos } from "../api/photos.api";
import api from "../api/axios";

export default function UploadForm() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [updatingCover, setUpdatingCover] = useState(false);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

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

      await api.put(
        `/events/${eventId}/cover`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Cover photo updated successfully");
      setCoverFile(null);
    } finally {
      setUpdatingCover(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Upload Event Photos
      </h1>

      <div className="space-y-6">

        {/* Select Event */}
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

        {/* Upload Gallery Photos */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Select Photos
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setFiles(Array.from(e.target.files || []))
            }
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

        {/* Update Cover Photo */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Update Cover Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverFile(e.target.files?.[0] || null)
            }
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
