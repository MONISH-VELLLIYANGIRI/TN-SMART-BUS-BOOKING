import { CalendarDays, Clock3, MapPin, Search } from "lucide-react";

function SearchForm({ formData, onChange, onSubmit, compact = false }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`panel ${compact ? "p-4" : "p-5 md:p-6"} grid gap-3 md:grid-cols-5`}
    >
      <label className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          className="input-control pl-9"
          name="source"
          type="text"
          placeholder="Source"
          value={formData.source}
          onChange={onChange}
          required
        />
      </label>

      <label className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          className="input-control pl-9"
          name="destination"
          type="text"
          placeholder="Destination"
          value={formData.destination}
          onChange={onChange}
          required
        />
      </label>

      <label className="relative">
        <CalendarDays className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          className="input-control pl-9"
          name="date"
          type="date"
          value={formData.date}
          onChange={onChange}
          required
        />
      </label>

      <label className="relative">
        <Clock3 className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          className="input-control pl-9"
          name="time"
          type="time"
          value={formData.time}
          onChange={onChange}
        />
      </label>

      <button type="submit" className="primary-btn h-[42px] w-full gap-2">
        <Search className="h-4 w-4" />
        Search Bus
      </button>
    </form>
  );
}

export default SearchForm;
