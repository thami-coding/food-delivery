export default function Loading({ text = "Loading" }: { text?: string }) {
  return (
    <div className="text-zinc-950">
      {text}
      <span className="inline-flex ml-1">
        <span className="animate-dot [animation-delay:0s]">.</span>
        <span className="animate-dot [animation-delay:0.2s]">.</span>
        <span className="animate-dot [animation-delay:0.4s]">.</span>
      </span>
    </div>
  );
}