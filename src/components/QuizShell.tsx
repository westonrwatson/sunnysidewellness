interface QuizShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'results';
  centerVertical?: boolean;
}

export function QuizShell({ children, variant = 'default', centerVertical = true }: QuizShellProps) {
  return (
    <main
      className={`min-h-screen pt-24 pb-20 px-6 ${
        centerVertical ? 'flex flex-col justify-center' : ''
      }`}
    >
      <div className="w-full max-w-3xl mx-auto">
        {variant === 'results' ? (
          <div className="text-center mb-10">
            <h1 className="averia-serif-libre-bold-italic text-4xl text-cream leading-tight">
            Start With One Small Step
            </h1>
            <p className="mt-2 font-sans text-lg md:text-xl text-cream leading-snug max-w-2xl mx-auto">
            Based on your answers, these simple actions can help you feel more connected, capable, and in control.
            </p>
          </div>
        ) : (
          <div className="text-center mb-10">
            <h1 className="averia-serif-libre-bold-italic text-4xl text-cream leading-tight">
              Find your path to peace today!
            </h1>
            <p className="mt-6 font-sans text-lg md:text-xl text-cream leading-snug max-w-2xl mx-auto">
              Take a quick wellness quiz to get personalized recommendations based on
              proven principles from organizational behavior and psychology.
            </p>
          </div>
        )}
        {children}
        <p className="mt-12 text-center font-sans text-sm text-white">
          This should not be a replacement for professional help. <br></br>If you&apos;re struggling, reach out
          to{' '}
          <a
            href="https://caps.byu.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream font-bold underline"
          >
            BYU Counseling & Psychological Services
          </a>
          .
        </p>
      </div>
    </main>
  );
}
