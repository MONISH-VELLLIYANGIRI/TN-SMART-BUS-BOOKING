import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { cancelBooking, getUserBookings } from "../services/bookingService";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const userId = localStorage.getItem("userId");
      const data = await getUserBookings(userId);
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to cancel booking");
    }
  };

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">My Bookings</h1>
        <p className="mt-1 text-sm text-slate-600">Manage upcoming trips, cancellations, and tracking.</p>
      </div>

      {loading && <LoadingSpinner label="Loading your bookings..." />}
      {!loading && error && <div className="panel border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      {!loading && !error && bookings.length === 0 && (
        <div className="panel p-6 text-center text-slate-600">No bookings found.</div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard key={booking.bookingId} booking={booking} onCancel={onCancel} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookingsPage;
