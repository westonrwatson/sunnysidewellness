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
        <div className="mt-10 grid gap-4 grid-cols-1">
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
      <div className="quiz-container-glass rounded-2xl p-8 md:p-10 min-h-[520px]">
        <div className="space-y-8">
          <ProgressBar current={1} total={questions.length} />
          <QuizQuestion data={q} selected={selected} onSelect={handleSelect} />
        </div>
        <div className="mt-10 grid gap-4 grid-cols-1">
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
