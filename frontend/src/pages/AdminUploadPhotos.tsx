import UploadPhotosForm from "../components/UploadPhotosForm";

export default function AdminUploadPhotos() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Upload Photos
      </h1>

      <UploadPhotosForm />
    </main>
  );
}
