import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  year: number;
  coverImageUrl: string;
};

export default function EventCard({
  title,
  year,
  coverImageUrl,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/events/${title.toLowerCase().replace(/\s+/g, "-")}`)
      }
      className="
        group
        bg-white rounded-lg overflow-hidden
         border-black
        border-3
        cursor-pointer
        transition
        hover:shadow-lg hover:-translate-y-0.5
      "
    >
     
      <div className="aspect-16/10 bg-slate-200 overflow-hidden">
        <img
          src={coverImageUrl}
          alt={title}
          className="
            w-full h-full
            object-cover
            transition-transform duration-300 ease-out
            group-hover:scale-105
          "
        />
      </div>

     
      <div className="p-4">
        <h3 className="font-medium text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-600">
          {year}
        </p>
      </div>
    </div>
  );
}
