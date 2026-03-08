import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { questions } from '../data/questions';
import { QuizQuestion } from '../components/QuizQuestion';
import { ProgressBar } from '../components/ProgressBar';
import { QuizShell } from '../components/QuizShell';
import { RecommendationCard } from '../components/RecommendationCard';
import { computeRecommendations, buildOptionsByQuestion } from '../utils/scoring';
import type { QuizAnswers } from '../utils/scoring';
import type { Recommendation } from '../data/recommendations';
import { submitToSheets } from '../utils/sheets';

const STORAGE_KEY = 'sunnySideResults';

type Step = 'quiz' | 'results' | 'form';

interface LocationState {
  answers?: Partial<QuizAnswers>;
  hasGoneBack?: boolean;
}

export function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [step, setStep] = useState<Step>('quiz');
  const [currentQ, setCurrentQ] = useState(state?.answers?.q1 ? 1 : 0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(state?.answers ?? {});
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(() => new Set());
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const q = questions[currentQ];
  const selected = q ? (answers[q.id as keyof QuizAnswers] as string) ?? null : null;

  const advance = (effectiveAnswers?: Partial<QuizAnswers>) => {
    const a = effectiveAnswers ?? answers;
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      const fullAnswers: QuizAnswers = {
        q1: a.q1 ?? '',
        q2: a.q2 ?? '',
        q3: a.q3 ?? '',
        q4: a.q4 ?? '',
      };
      const optionsByQuestion = buildOptionsByQuestion();
      const computed = computeRecommendations(fullAnswers, optionsByQuestion);
      setRecs(computed);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ recommendations: computed, answers: fullAnswers }));
      } catch {
        // ignore
      }
      setStep('form');
    }
  };

  const handleSelect = (value: string) => {
    if (!q) return;
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    const isFirstVisit = !visitedQuestions.has(currentQ);
    if (isFirstVisit) {
      setVisitedQuestions((v) => new Set(v).add(currentQ));
      advance(newAnswers);
    }
  };

  const handleNext = () => {
    setVisitedQuestions((v) => new Set(v).add(currentQ));
    advance();
  };

  const handleBack = () => {
    if (currentQ === 1) {
      navigate('/', { state: { answers, hasGoneBack: true } });
    } else if (currentQ > 0) {
      setCurrentQ((c) => c - 1);
    }
  };

  const handleFormBack = () => {
    setCurrentQ(questions.length - 1);
    setStep('quiz');
  };

  const handleRetakeQuiz = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setStep('quiz');
    setCurrentQ(0);
    setAnswers({});
    setRecs([]);
    setVisitedQuestions(new Set());
  };

  useEffect(() => {
    if (step === 'results') {
      window.scrollTo(0, 0);
    }
  }, [step]);

  const handleSeeResults = async () => {
    setSubmitStatus('loading');
    const result = await submitToSheets({
      name: name.trim(),
      email: email.trim(),
      q1: answers.q1 ?? '',
      q2: answers.q2 ?? '',
      q3: answers.q3 ?? '',
      q4: answers.q4 ?? '',
    });
    setSubmitStatus(result.success ? 'idle' : 'error');
    setStep('results');
  };

  if (step === 'results') {
    return (
      <QuizShell variant="results">
        <div className="space-y-6">
            {recs.map((rec, i) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={i} compact />
            ))}
        </div>
        <div className="mt-10 grid gap-4 grid-cols-1">
          <button
            type="button"
            onClick={handleRetakeQuiz}
            className="w-full py-4 rounded-2xl font-sans font-semibold text-ink quiz-back-button text-center"
          >
            Retake Quiz
          </button>
        </div>
      </QuizShell>
    );
  }

  if (step === 'form') {
    return (
      <QuizShell>
        <div className="quiz-container-glass rounded-2xl p-8 md:p-10 min-h-[520px]">
          <div className="space-y-7">
            <ProgressBar current={5} total={5} />
            <div className="space-y-2">
              <h1 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-white text-center">
                We would love to follow up with you!
              </h1>
              <p className="font-sans text-white text-center">
                We&apos;ll send you a quick survey in a week to see how you&apos;re doing.
              </p>
            </div>
            <div className="mt-2 space-y-5">
              <div>
                <label htmlFor="name" className="block font-sans text-base font-medium text-white mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl quiz-input-glass"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-sans text-base font-medium text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl quiz-input-glass"
                  placeholder="your@email.com"
                />
                <p className="mt-4 font-sans text-sm text-white font-medium text-center italic">
                  Optional: Share your contact info to receive a follow-up survey.
                </p>
              </div>
              <div className="min-h-[10px]" aria-live="polite">
                {submitStatus === 'error' && (
                  <p className="text-accent-rust text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleFormBack}
                  className="w-full py-4 rounded-2xl font-sans font-medium text-ink quiz-back-button"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSeeResults}
                  disabled={submitStatus === 'loading'}
                  className="w-full py-4 rounded-2xl font-sans font-semibold text-white btn-orange-glass disabled:opacity-70 disabled:pointer-events-none"
                >
                  {submitStatus === 'loading' ? 'Submitting...' : 'See my results'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </QuizShell>
    );
  }

  const progressStep = currentQ + 1;

  return (
    <QuizShell>
      <div className="quiz-container-glass rounded-2xl p-8 md:p-10 min-h-[520px]">
          <div className="space-y-8">
            <ProgressBar current={progressStep} total={questions.length} />
            <QuizQuestion data={q} selected={selected} onSelect={handleSelect} />
          </div>
          <div
            className={`mt-10 grid gap-4 ${currentQ > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            {currentQ > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="w-full py-4 rounded-2xl font-sans font-medium text-ink quiz-back-button"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!selected}
              className="w-full py-4 rounded-2xl font-sans font-semibold text-white btn-orange-glass disabled:opacity-100 disabled:cursor-not-allowed"
            >
              {currentQ === 0 ? 'Continue' : 'Next'}
            </button>
          </div>
        </div>
    </QuizShell>
  );
}
