export default function BackgroundBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-petal/40 blur-3xl animate-blobFloat" />
      <div
        className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-plum/30 blur-3xl animate-blobFloat"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blush/60 blur-3xl animate-blobFloat"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
