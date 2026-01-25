export default function Shimmer() {
  return (
    <div className="relative h-4 w-64 overflow-hidden rounded bg-gray-200">
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
    </div>
  );
}