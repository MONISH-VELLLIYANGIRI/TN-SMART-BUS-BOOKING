import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Clock3, MapPin } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { getBusLocation } from "../services/busService";

function TrackBusPage() {
  const { busId } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getBusLocation(busId);
        setLocation(data);
      } catch (err) {
        setError(err.response?.data?.message || "Location unavailable");
      }
    };

    fetchLocation();
  }, [busId]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Track Bus</h1>

      {error && <div className="panel border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      {!error && !location && <LoadingSpinner label="Fetching live location..." />}
      {location && (
        <div className="panel p-5">
          <p className="text-lg font-semibold text-slate-900">{location.busName}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-sky-700" />
            Current Location: {location.latitude}, {location.longitude}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-700">
            <Clock3 className="h-4 w-4 text-sky-700" />
            Estimated Arrival: based on latest update at {location.lastUpdated}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Live Map: {" "}
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-700 underline-offset-2 hover:underline"
            >
              Open Live Location
            </a>
          </p>
        </div>
      )}
    </section>
  );
}

export default TrackBusPage;
