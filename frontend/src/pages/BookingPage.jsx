import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BusFront, Clock3, IndianRupee, Route } from "lucide-react";
import SeatSelector from "../components/SeatSelector";
import { createBooking } from "../services/bookingService";

function BookingPage() {
  const { busScheduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bus = location.state?.bus;
  const [travelDate, setTravelDate] = useState("");
  const [seatNumber, setSeatNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalSeats = useMemo(() => bus?.totalSeats || 40, [bus]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const payload = {
        userId: Number(localStorage.getItem("userId")),
        busScheduleId: Number(busScheduleId),
        seatNumber,
        travelDate
      };
      const data = await createBooking(payload);
      setMessage(`Booking confirmed with ID #${data.bookingId}`);
      setTimeout(() => navigate("/my-bookings"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Book Your Seat</h1>

      {bus && (
        <div className="panel p-5">
          <h2 className="text-lg font-bold text-slate-900">{bus.busName}</h2>
          <p className="text-sm text-slate-500">{bus.busNumber} · {bus.busType}</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <p className="flex items-center gap-2"><Route className="h-4 w-4 text-sky-700" /> {bus.source} to {bus.destination}</p>
            <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-sky-700" /> Departure {bus.departureTime}</p>
            <p className="flex items-center gap-2"><BusFront className="h-4 w-4 text-sky-700" /> Arrival {bus.arrivalTime}</p>
            <p className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-amber-700" /> Price {bus.price}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="panel grid gap-4 p-5">
        <label htmlFor="travelDate" className="text-sm font-semibold text-slate-700">Travel Date</label>
        <input
          className="input-control"
          id="travelDate"
          type="date"
          value={travelDate}
          onChange={(event) => setTravelDate(event.target.value)}
          required
        />

        <label className="text-sm font-semibold text-slate-700">Select Seat</label>
        <SeatSelector totalSeats={totalSeats} selectedSeat={seatNumber} onChange={setSeatNumber} />

        {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
        {message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}
        <button type="submit" className="primary-btn">Confirm Booking</button>
      </form>
    </section>
  );
}

export default BookingPage;
