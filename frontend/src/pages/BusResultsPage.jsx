import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BusCard from "../components/BusCard";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchForm from "../components/SearchForm";
import { searchBuses } from "../services/busService";

function BusResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formData = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      source: params.get("source") || "",
      destination: params.get("destination") || "",
      date: params.get("date") || "",
      time: params.get("time") || ""
    };
  }, [location.search]);

  useEffect(() => {
    const fetchBuses = async () => {
      if (!formData.source || !formData.destination || !formData.date) {
        setBuses([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await searchBuses(formData);
        setBuses(data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch buses");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [formData]);

  const onChange = (event) => {
    const params = new URLSearchParams(location.search);
    params.set(event.target.name, event.target.value);
    navigate(`/buses?${params.toString()}`, { replace: true });
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Available Buses</h1>
        <p className="mt-1 text-sm text-slate-600">
          Route {formData.source || "-"} to {formData.destination || "-"} on {formData.date || "-"}
          {formData.time ? ` around ${formData.time}` : ""}
        </p>
      </div>

      <SearchForm formData={formData} onChange={onChange} onSubmit={onSubmit} compact />

      {loading && <LoadingSpinner label="Fetching buses..." />}
      {!loading && error && (
        <div className="panel border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
      )}
      {!loading && !error && buses.length === 0 && (
        <div className="panel p-6 text-center">
          <p className="text-base font-semibold text-slate-800">No buses available for selected route</p>
          <p className="mt-1 text-sm text-slate-500">Try a different time or date to see more results.</p>
        </div>
      )}

      {!loading && !error && buses.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {buses.map((bus) => (
            <BusCard key={bus.busScheduleId} bus={bus} />
          ))}
        </div>
      )}
    </section>
  );
}

export default BusResultsPage;
