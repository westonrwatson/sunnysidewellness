import { useState, useEffect, useRef } from 'react';
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
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  const nameContainsNumbers = (s: string) => /\d/.test(s.trim());

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

  useEffect(() => {
    if (step === 'form') {
      nameInputRef.current?.focus();
    }
  }, [step]);

  const handleSeeResults = () => {
    const errors: { name?: string; email?: string } = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName && nameContainsNumbers(trimmedName)) {
      errors.name = 'Name cannot contain numbers';
    }
    if (trimmedEmail && !isValidEmail(trimmedEmail)) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep('results');

    submitToSheets({
      name: trimmedName,
      email: trimmedEmail,
      q1: answers.q1 ?? '',
      q2: answers.q2 ?? '',
      q3: answers.q3 ?? '',
      q4: answers.q4 ?? '',
    });
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
        <div className="quiz-container-glass rounded-2xl p-5 sm:p-8 md:p-10 min-h-[440px] sm:min-h-[500px] flex flex-col">
          <div className="flex-1 space-y-4 sm:space-y-5">
            <ProgressBar current={5} total={5} />
            <div className="space-y-1 sm:space-y-2">
              <h1 className="averia-serif-libre-bold-italic text-xl sm:text-2xl md:text-3xl text-white text-center">
                We would love to follow up with you!
              </h1>
              <p className="font-sans text-sm sm:text-base text-white text-center">
                We&apos;ll send you a quick survey in a week to see how you&apos;re doing.
              </p>
            </div>
            <div className="mt-1 sm:mt-2 space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block font-sans text-sm sm:text-base font-medium text-white mb-1">
                  Name
                </label>
                <input
                  ref={nameInputRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(ev) => {
                    setName(ev.target.value);
                    if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  onBlur={(e) => {
                    const t = (e.target as HTMLInputElement).value.trim();
                    if (t && nameContainsNumbers(t)) {
                      setFormErrors((prev) => ({ ...prev, name: 'Name cannot contain numbers' }));
                    } else {
                      setFormErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-2xl quiz-input-glass text-sm sm:text-base"
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 font-sans text-sm text-red-500" role="alert">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block font-sans text-sm sm:text-base font-medium text-white mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => {
                    setEmail(ev.target.value);
                    if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  onBlur={(e) => {
                    const t = (e.target as HTMLInputElement).value.trim();
                    if (t && !isValidEmail(t)) {
                      setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
                    } else {
                      setFormErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-2xl quiz-input-glass text-sm sm:text-base"
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="mt-1 font-sans text-sm text-red-500" role="alert">{formErrors.email}</p>
                )}
                <p className="mt-2 sm:mt-4 font-sans text-sm text-white font-medium text-center italic">
                  Optional: Share your contact info to receive a follow-up survey.
                </p>
              </div>
              <div className="min-h-[10px]" aria-live="polite">
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm" role="alert">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-7 grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
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
      </QuizShell>
    );
  }

  const progressStep = currentQ + 1;

  return (
    <QuizShell>
      <div className="quiz-container-glass rounded-2xl p-5 sm:p-8 md:p-10 min-h-[440px] sm:min-h-[500px] flex flex-col">
          <div className="flex-1 space-y-4 sm:space-y-8">
            <ProgressBar current={progressStep} total={questions.length} />
            <QuizQuestion data={q} selected={selected} onSelect={handleSelect} />
          </div>
          <div
            className={`mt-5 sm:mt-7 grid gap-3 sm:gap-4 shrink-0 ${currentQ > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}
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
