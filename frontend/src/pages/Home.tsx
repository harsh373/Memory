import HeaderSection from "../components/HeaderSection";

import ExploreSection from "../components/ExploreSection";
import EventsGrid from "../components/EventGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <HeaderSection />
     
      <ExploreSection />
      <EventsGrid />
    </main>
  );
}
