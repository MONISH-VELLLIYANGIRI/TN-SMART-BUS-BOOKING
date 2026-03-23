import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";

function SearchBusPage() {
  const [formData, setFormData] = useState({ source: "", destination: "", date: "", time: "" });
  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams({
      source: formData.source,
      destination: formData.destination,
      date: formData.date,
      time: formData.time
    });
    navigate(`/buses?${params.toString()}`);
  };

  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-slate-900 p-6 text-white md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">Smart Bus Booking</h1>
        <p className="mt-2 max-w-3xl text-sm text-sky-100 md:text-base">
          Search by source, destination, date, and preferred time. Book quickly and avoid long waiting at the stop.
        </p>
      </div>

      <SearchForm formData={formData} onChange={onChange} onSubmit={onSubmit} />
    </section>
  );
}

export default SearchBusPage;
