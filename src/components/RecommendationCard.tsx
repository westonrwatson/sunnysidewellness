import type { Recommendation } from '../data/recommendations';

interface RecommendationCardProps {
  recommendation: Recommendation;
  index?: number;
  compact?: boolean;
}

export function RecommendationCard({
  recommendation,
  index = 0,
  compact = false,
}: RecommendationCardProps) {
  const accentClasses = [
    'border-accent-orange/30 focus:ring-accent-orange',
    'border-accent-lavender/30 focus:ring-accent-lavender',
    'border-accent-teal/30 focus:ring-accent-teal',
  ];
  const borderClass = accentClasses[index % accentClasses.length];

  if (compact) {
    return (
      <div
        className={`rounded-2xl border-2 bg-white/95 p-6 md:p-8 shadow-[0px_2px_9.8px_0px_rgba(0,0,0,0.08)] ${borderClass}`}
      >
        <div className="space-y-4">
          <h3 className="averia-serif-libre-bold-italic text-xl md:text-2xl text-ink">
            {recommendation.actionTitle}
          </h3>
          <p className="font-sans text-ink/90 leading-relaxed">
            {recommendation.description}
          </p>
          <div className="rounded-xl bg-ink/5 p-4">
            <p className="font-sans text-sm font-medium text-ink/90">
              Why this helps you
            </p>
            <p className="mt-1 font-sans text-ink/85 leading-relaxed">
              {recommendation.whyItHelps}
            </p>
          </div>
          <div className="rounded-xl bg-ink/5 p-4">
            <p className="font-sans text-sm font-medium text-ink/90">
              Grounded in {recommendation.theoryName}
            </p>
            <p className="mt-1 font-sans text-ink/85 leading-relaxed">
              {recommendation.theoryBlurb}
            </p>
          </div>
          <a
            href={recommendation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-orange hover:underline"
          >
            Learn more
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border-2 bg-white/95 p-6 md:p-8 shadow-[0px_2px_9.8px_0px_rgba(0,0,0,0.08)] ${borderClass}`}
    >
      <div className="space-y-4">
        <h3 className="averia-serif-libre-bold-italic text-xl md:text-2xl text-ink">
          {recommendation.actionTitle}
        </h3>
        <p className="font-sans text-ink/90 leading-relaxed">
          {recommendation.description}
        </p>
        <div className="rounded-xl bg-ink/5 p-4">
          <p className="font-sans text-sm font-medium text-ink/90">
            Why this helps you
          </p>
          <p className="mt-1 font-sans text-ink/85 leading-relaxed">
            {recommendation.whyItHelps}
          </p>
        </div>
        <div className="rounded-xl bg-ink/5 p-4">
          <p className="font-sans text-sm font-medium text-ink/90">
            Grounded in {recommendation.theoryName}
          </p>
          <p className="mt-1 font-sans text-ink/85 leading-relaxed">
            {recommendation.theoryBlurb}
          </p>
        </div>
        <a
          href={recommendation.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-orange hover:underline"
        >
          Learn more
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
