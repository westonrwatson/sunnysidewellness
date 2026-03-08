import type { QuizQuestion as QuizQuestionType, QuizOption } from '../data/questions';

interface QuizQuestionProps {
  data: QuizQuestionType;
  selected: string | null;
  onSelect: (value: string) => void;
}

export function QuizQuestion({ data, selected, onSelect }: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <h2 className="averia-serif-libre-regular-italic text-2xl md:text-3xl text-white text-center leading-tight">
        {data.question}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.options.map((opt: QuizOption) => (
          <button
            key={opt.value}
            id={`${data.id}-${opt.value}`}
            name={data.id}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`min-h-[120px] px-5 py-4 rounded-2xl font-sans text-lg text-center text-ink
              ${selected === opt.value ? 'quiz-option-glass-selected' : 'quiz-option-glass'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
