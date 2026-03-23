import { useNavigate } from "react-router-dom";
import { ArrowRight, BusFront, Clock3, IndianRupee, Users } from "lucide-react";

function BusCard({ bus }) {
  const navigate = useNavigate();

  return (
    <article className="panel p-5 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{bus.busName}</h3>
          <p className="mt-1 text-sm text-slate-500">{bus.busNumber} · {bus.busType}</p>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{bus.busType}</span>
      </div>

      <p className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
        <BusFront className="h-4 w-4 text-sky-700" />
        <span>{bus.source}</span>
        <ArrowRight className="h-4 w-4 text-slate-400" />
        <span>{bus.destination}</span>
      </p>

      <div className="mb-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
        <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-sky-700" /> Departure {bus.departureTime}</p>
        <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-slate-500" /> Arrival {bus.arrivalTime}</p>
        <p className="flex items-center gap-2"><Users className="h-4 w-4 text-emerald-700" /> Seats {bus.availableSeats}/{bus.totalSeats}</p>
        <p className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-amber-700" /> Price {bus.price}</p>
      </div>

      <button
        type="button"
        className="primary-btn w-full"
        onClick={() => navigate(`/booking/${bus.busScheduleId}`, { state: { bus } })}
      >
        Book Now
      </button>
    </article>
  );
}

export default BusCard;
