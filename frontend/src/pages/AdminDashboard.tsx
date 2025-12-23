import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">
        Admin Panel
      </h1>

      <div className="space-y-4">

        <Link
          to="/admin/create-event"
          className="block rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
        >
          <h2 className="font-medium text-slate-900">
            Create New Event
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Add a new event with details and cover image
          </p>
        </Link>

        <Link
          to="/admin/upload-photos"
          className="block rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
        >
          <h2 className="font-medium text-slate-900">
            Upload Photos
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Upload and manage event photo galleries
          </p>
        </Link>

        <Link
          to="/admin/pod"
          className="block rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
        >
          <h2 className="font-medium text-slate-900">
            Picture of the Day
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Regenerate today’s highlighted image
          </p>
        </Link>

      </div>
    </main>
  );
}
