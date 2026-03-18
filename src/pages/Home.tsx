import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { questions } from '../data/questions';
import { QuizQuestion } from '../components/QuizQuestion';
import { ProgressBar } from '../components/ProgressBar';
import { QuizShell } from '../components/QuizShell';
import { RecommendationCard } from '../components/RecommendationCard';
import type { QuizAnswers } from '../utils/scoring';
import type { Recommendation } from '../data/recommendations';

const STORAGE_KEY = 'sunnySideResults';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { answers?: Partial<QuizAnswers>; hasGoneBack?: boolean } | null;
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(state?.answers ?? {});

  let recommendations: Recommendation[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const stored = JSON.parse(raw) as { recommendations: Recommendation[] };
      recommendations = stored?.recommendations ?? [];
    }
  } catch {
    recommendations = [];
  }

  useEffect(() => {
    if (recommendations.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [recommendations.length]);

  if (recommendations.length > 0) {
    return (
      <QuizShell variant="results">
        <div className="space-y-6">
            {recommendations.map((rec, i) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={i} compact />
            ))}
        </div>

        <div className="mt-10 rounded-2xl border-2 border-accent-orange/30 bg-white/95 p-6 md:p-8 shadow-[0px_2px_9.8px_0px_rgba(0,0,0,0.08)]">
          <div className="space-y-4">
            <h3 className="averia-serif-libre-bold-italic text-xl md:text-2xl text-ink">
              Take your next steps with you
            </h3>
            <p className="font-sans text-ink/90 leading-relaxed">
              Download our guide for reflection prompts, simple practices, and reminders you can revisit anytime—on or off screen.
            </p>
            <a
              href="/find-your-path-to-peace-today.pdf"
              download="Find your path to peace today!.pdf"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-orange hover:underline"
            >
              Download PDF
              <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 grid-cols-1">
          <Link
            to="/quiz"
            onClick={() => {
              try {
                localStorage.removeItem(STORAGE_KEY);
              } catch {
                // ignore
              }
            }}
            className="w-full py-4 rounded-2xl font-sans font-semibold text-ink quiz-back-button text-center"
          >
            Retake Quiz
          </Link>
        </div>
      </QuizShell>
    );
  }

  const noAutoAdvance = state?.hasGoneBack ?? false;
  const q = questions[0];
  const selected = (answers[q.id as keyof QuizAnswers] as string) ?? null;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (!noAutoAdvance) {
      navigate('/quiz', { state: { answers: newAnswers } });
    }
  };

  const handleContinue = () => {
    navigate('/quiz', { state: { answers, hasGoneBack: noAutoAdvance } });
  };

  return (
    <QuizShell>
      <div className="quiz-container-glass rounded-2xl p-5 sm:p-8 md:p-10 min-h-[440px] sm:min-h-[500px] flex flex-col">
        <div className="flex-1 space-y-4 sm:space-y-8">
          <ProgressBar current={1} total={questions.length} />
          <QuizQuestion data={q} selected={selected} onSelect={handleSelect} />
        </div>
        <div className="mt-5 sm:mt-7 grid gap-3 sm:gap-4 grid-cols-1 shrink-0">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected}
            className="w-full py-4 rounded-2xl font-sans font-semibold text-white btn-orange-glass disabled:opacity-100 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </QuizShell>
  );
}
