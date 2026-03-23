import { Bus, Calendar, Armchair, Route } from "lucide-react";
import { Link } from "react-router-dom";

function BookingCard({ booking, onCancel }) {
  const isCancelled = booking.bookingStatus === "CANCELLED";

  return (
    <article className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{booking.busName}</h3>
          <p className="text-sm text-slate-500">{booking.busNumber || "Service"}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isCancelled ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
          {booking.bookingStatus}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-700">
        <p className="flex items-center gap-2"><Route className="h-4 w-4 text-sky-600" /> {booking.source} to {booking.destination}</p>
        <p className="flex items-center gap-2"><Armchair className="h-4 w-4 text-sky-600" /> Seat {booking.seatNumber}</p>
        <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-sky-600" /> {booking.travelDate}</p>
        <p className="flex items-center gap-2"><Bus className="h-4 w-4 text-sky-600" /> {booking.departureTime} to {booking.arrivalTime}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="danger-btn" onClick={() => onCancel(booking.bookingId)} disabled={isCancelled}>
          Cancel Booking
        </button>
        <Link className="primary-btn" to={`/track/${booking.busId}`}>
          Track Bus
        </Link>
      </div>
    </article>
  );
}

export default BookingCard;
