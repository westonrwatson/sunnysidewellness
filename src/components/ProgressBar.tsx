interface ProgressBarProps {
  current: number;
  total: number;
  chunks?: number;
}

export function ProgressBar({ current, total, chunks = 5 }: ProgressBarProps) {
  const filled = Math.max(0, current - 1);
  return (
    <div
      className="flex gap-1 w-full h-2"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Question ${current} of ${total}`}
    >
      {Array.from({ length: chunks }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-full rounded-lg transition-all duration-300 ease-out ${
            i < filled
              ? 'bg-accent-orange shadow-[0px_2px_9.8px_-2px_rgba(0,0,0,0.13)]'
              : 'bg-white/60 shadow-[0px_2px_9.8px_-2px_rgba(0,0,0,0.13)]'
          }`}
        />
      ))}
    </div>
  );
}
