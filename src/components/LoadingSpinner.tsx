export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="border-r-transparent border-t-yellow-100 border-b-yellow-100 border-l-yellow-100 animate-spin inline-block w-12 h-12 border-4 rounded-full text-yellow-400"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
}
