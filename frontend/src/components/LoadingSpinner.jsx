function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="panel mt-6 flex items-center justify-center gap-3 p-6 text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-700" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
