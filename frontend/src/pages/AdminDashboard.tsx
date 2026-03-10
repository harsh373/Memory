import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">
          Admin Panel
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm border border-slate-800 rounded hover:bg-slate-800 hover:text-white transition"
        >
          Logout
        </button>
      </div>

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

        <Link
          to="/admin/upcoming"
          className="block rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 transition"
        >
          <h2 className="font-medium text-slate-900">
            Upcoming Event
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            View or manage the next upcoming event
          </p>
        </Link>

      </div>
    </main>
  );
}