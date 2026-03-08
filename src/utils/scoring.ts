import type { TheoryKey } from '../data/questions';
import { questions } from '../data/questions';
import { recommendations } from '../data/recommendations';
import type { Recommendation } from '../data/recommendations';

export interface QuizAnswers {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}

export interface AnswerWithTheories {
  value: string;
  theories: TheoryKey[];
}

/**
 * Picks one recommendation from each of the top 3 different theories,
 * so the user gets diverse, theory-informed suggestions that fit their answers.
 */
export function computeRecommendations(
  answers: QuizAnswers,
  optionsByQuestion: Record<string, AnswerWithTheories[]>
): Recommendation[] {
  const theoryScores: Record<TheoryKey, number> = {
    locus: 0,
    smart: 0,
    selfEfficacy: 0,
    abc: 0,
    erg: 0,
  };

  const answerArray: [string, string][] = [
    ['q1', answers.q1],
    ['q2', answers.q2],
    ['q3', answers.q3],
    ['q4', answers.q4],
  ];

  for (const [qId, value] of answerArray) {
    const options = optionsByQuestion[qId];
    if (!options) continue;
    const selected = options.find((o) => o.value === value);
    if (selected) {
      for (const t of selected.theories) {
        theoryScores[t] = (theoryScores[t] || 0) + 1;
      }
    }
  }

  // Sort by score desc, then pick one rec from each of the top 3 *different* theories
  const sorted = (Object.entries(theoryScores) as [TheoryKey, number][])
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  const result: Recommendation[] = [];

  for (const [theory] of sorted) {
    if (result.length >= 3) break;
    const recs = recommendations[theory];
    if (!recs || recs.length === 0) continue;
    // Pick one at random from this theory
    const pick = recs[Math.floor(Math.random() * recs.length)];
    result.push(pick);
  }

  // If we have fewer than 3 (e.g. few answers selected), fill from next-best theories
  const usedTheories = new Set(result.map((r) => r.theory));
  const remaining = (Object.entries(theoryScores) as [TheoryKey, number][])
    .filter(([t]) => !usedTheories.has(t))
    .sort((a, b) => b[1] - a[1]);

  for (const [theory] of remaining) {
    if (result.length >= 3) break;
    const recs = recommendations[theory];
    if (!recs || recs.length === 0) continue;
    const pick = recs[Math.floor(Math.random() * recs.length)];
    result.push(pick);
  }

  return result.slice(0, 3);
}

export function buildOptionsByQuestion(): Record<string, AnswerWithTheories[]> {
  const optionsByQuestion: Record<string, AnswerWithTheories[]> = {};
  for (const q of questions) {
    optionsByQuestion[q.id] = q.options.map((o) => ({
      value: o.value,
      theories: o.theories,
    }));
  }
  return optionsByQuestion;
}
