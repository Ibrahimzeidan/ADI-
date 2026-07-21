// Shown instantly while a page server-renders — prevents the blank-screen flash on navigation.
export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-light pt-24 flex items-start justify-center">
      <div className="animate-pulse flex flex-col items-center gap-3 pt-20">
        <div className="w-16 h-16 rounded-full bg-brand-primary/20" />
        <div className="h-3 w-32 rounded-full bg-stone-200" />
        <div className="h-2 w-24 rounded-full bg-stone-100" />
      </div>
    </div>
  );
}
