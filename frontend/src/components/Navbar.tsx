import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Top bar */}
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/icons/logo1.png"
              alt="College Memory Archive"
              className="w-14 h-10 transition-transform group-hover:scale-105"
            />
            <span className="font-semibold text-slate-900 text-lg">
              IIITR Archive
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-base">
            {navItem("/", "Home", true)}
            {navItem("/all-event", "Events")}
            {navItem("/featured", "Featured")}
            {navItem("/upcoming", "Upcoming")}
            {navItem("/about", "About")}
          </nav>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden flex justify-center gap-6 pb-2 text-base">
          {navItem("/", "Home", true)}
          {navItem("/all-event", "Events")}
          {navItem("/featured", "Featured")}
          {navItem("/upcoming", "Upcoming")}
          {navItem("/about", "About")}
        </nav>

      </div>
    </header>
  );
}

function navItem(
  to: string,
  label: string,
  end: boolean = false
) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        relative pb-1
        transition-all duration-200
        active:scale-95
        ${
          isActive
            ? "text-black font-medium after:w-full"
            : "text-slate-600 hover:text-black after:w-0"
        }
        after:absolute after:left-0 after:-bottom-0.5
        after:h-0.5 after:bg-black
        after:transition-all after:duration-200
        hover:after:w-full
        `
      }
    >
      {label}
    </NavLink>
  );
}
