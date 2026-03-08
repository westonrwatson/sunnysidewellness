export type TheoryKey = 'locus' | 'smart' | 'selfEfficacy' | 'abc' | 'erg';

export interface QuizOption {
  label: string;
  value: string;
  theories: TheoryKey[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What feels most overwhelming right now?',
    options: [
      { label: 'Schoolwork & deadlines', value: 'schoolwork', theories: ['erg'] },
      { label: 'Relationships & feeling alone', value: 'relationships', theories: ['erg', 'abc'] },
      { label: 'My health & daily basics', value: 'health', theories: ['erg'] },
      { label: 'Not sure where to start', value: 'unsure', theories: ['smart', 'abc'] },
    ],
  },
  {
    id: 'q2',
    question: 'When things go wrong, how do you usually see it?',
    options: [
      { label: 'I could have done something different', value: 'internal', theories: ['locus'] },
      { label: 'It was out of my control', value: 'external', theories: ['locus'] },
      { label: 'A mix of both', value: 'mixed', theories: ['locus'] },
      { label: 'I focus on what I can do next', value: 'forward', theories: ['locus'] },
    ],
  },
  {
    id: 'q3',
    question: 'What would help you feel more motivated?',
    options: [
      { label: 'Clear goals and a plan', value: 'goals', theories: ['smart'] },
      { label: 'More belief in myself', value: 'belief', theories: ['selfEfficacy'] },
      { label: 'Better connections with others', value: 'connections', theories: ['abc', 'erg'] },
      { label: 'Feeling more capable', value: 'capable', theories: ['selfEfficacy', 'abc'] },
    ],
  },
  {
    id: 'q4',
    question: 'When stressed, what do you tend to put off first?',
    options: [
      { label: 'Sleep, meals, or self-care', value: 'existence', theories: ['erg'] },
      { label: 'Time with friends or family', value: 'relatedness', theories: ['erg', 'abc'] },
      { label: 'Learning or improving something', value: 'growth', theories: ['erg', 'abc'] },
      { label: 'Work or school tasks', value: 'tasks', theories: ['erg', 'smart'] },
    ],
  },
];
