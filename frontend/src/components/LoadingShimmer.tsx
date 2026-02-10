export default function LoadingShimmer() {
  return (
    <div className="rounded-2xl overflow-hidden  max-w-80 max-h-160 space-y-3">
      <div className="h-65 shimmer rounded-none" />
      <div className="px-2 pb-4">
        <div className="h-5 w-3/4 rounded shimmer mt-5" />
        <div className="h-5 w-3/6 rounded shimmer mt-4" />
        <div className="h-5 w-3/5 rounded shimmer mt-4" />
        <div className="h-10 w-full rounded shimmer mt-9" />
      </div>
    </div>
  );
}
