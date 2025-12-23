import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchEventBySlug, type Event } from "../api/events.api";
import { fetchPhotosByEventId, type Photo } from "../api/photos.api";

import Lightbox from "../components/LightBox";

export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadEvent = async () => {
      try {
        const eventData = await fetchEventBySlug(slug);
        setEvent(eventData);

        const photosData = await fetchPhotosByEventId(eventData._id);
        setPhotos(photosData);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [slug]);

  
  if (loading) {
    return (
      <main className="px-4 py-12 text-center text-slate-500">
        Loading event...
      </main>
    );
  }

  if (!event) {
    return (
      <main className="px-4 py-12 text-center text-slate-500">
        Event not found
      </main>
    );
  }

  const imageUrls = photos.map((p) => p.imageUrl);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="max-w-6xl mx-auto">

       
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-2">
            {event.name}
          </h1>

          <p className="text-slate-600 mb-1">
            {event.category} • {event.year}
          </p>

          <p className="text-slate-600 max-w-3xl">
            {event.description}
          </p>
        </section>

        
        <section>
          {photos.length === 0 ? (
            <p className="text-slate-500">
              No photos available for this event.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <div
                  key={photo._id}
                  onClick={() => setLightboxIndex(index)}
                  className="
                    cursor-pointer bg-white rounded-lg overflow-hidden
                    border border-slate-200
                    transition
                    hover:border-black hover:shadow-md
                    group
                  "
                >
                  
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt="Event memory"
                      className="
                        w-full h-full object-cover object-top
                        transition-transform duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

       
        {lightboxIndex !== null && (
          <Lightbox
            images={imageUrls}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((i) =>
                i !== null && i > 0 ? i - 1 : i
              )
            }
            onNext={() =>
              setLightboxIndex((i) =>
                i !== null && i < imageUrls.length - 1 ? i + 1 : i
              )
            }
          />
        )}

      </div>
    </main>
  );
}
