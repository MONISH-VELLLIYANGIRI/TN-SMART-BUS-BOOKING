function SeatSelector({ totalSeats, selectedSeat, onChange }) {
  const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
      {seats.map((seat) => (
        <button
          key={seat}
          type="button"
          className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${
            selectedSeat === seat
              ? "border-sky-600 bg-sky-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50"
          }`}
          onClick={() => onChange(seat)}
        >
          {seat}
        </button>
      ))}
    </div>
  );
}

export default SeatSelector;
