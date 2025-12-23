import { regeneratePictureOfDay } from "../api/pictureOfDay.api";

export default function AdminPOD() {

  const handleRegenerate = async () => {
    await regeneratePictureOfDay();
    alert("Picture of the Day regenerated");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Picture of the Day
      </h1>

      <button
        onClick={handleRegenerate}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Regenerate Picture of the Day
      </button>
    </main>
  );
}

