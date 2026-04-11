import { Link } from 'react-router-dom';

export function AboutThisSite() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="averia-serif-libre-bold-italic text-3xl md:text-4xl text-ink leading-tight">
          How this site was made
        </h1>
        <p className="mt-6 font-sans text-lg text-ink/90 leading-relaxed">
          Sunny Side Wellness is a student-facing project. This page explains how it was built and
          how the wellness ideas relate to research—so you know what you&apos;re reading.
        </p>

        <section className="mt-12">
          <h2 className="averia-serif-libre-bold-italic text-xl md:text-2xl text-accent-orange">
            Use of AI
          </h2>
          <p className="mt-4 font-sans text-ink/90 leading-relaxed">
            Generative AI tools (for example, coding assistants and writing support) helped draft
            and refine parts of the website: layout, wording, accessibility tweaks, and routine
            engineering tasks. That being said, some information may not be accurate.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="averia-serif-libre-bold-italic text-xl md:text-2xl text-accent-orange">
            Research behind the topics
          </h2>
          <p className="mt-4 font-sans text-ink/90 leading-relaxed">
            The{' '}
            <Link to="/tips" className="text-accent-orange font-medium hover:underline">
              Tips
            </Link>{' '}
            page summarizes concepts from organizational behavior and psychology that appear in many
            textbooks and courses: locus of control, SMART-style goal setting, self-efficacy,
            self-determination theory (autonomy, competence, relatedness), and Alderfer&apos;s ERG
            theory (existence, relatedness, growth). Each section includes links to further reading
            so you can go deeper. The quiz matches you to sample recommendations tied to those same
            ideas—it is illustrative, not a clinical assessment.
          </p>
          <p className="mt-4 font-sans text-ink/90 leading-relaxed">
            This site is for education and self-reflection only. It is not a substitute for
            professional mental health care. If you need support, please use resources such as{' '}
            <a
              href="https://caps.byu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-orange font-medium hover:underline"
            >
              BYU CAPS
            </a>
            .
          </p>
        </section>

        <p className="mt-12">
          <Link
            to="/tips"
            className="font-sans text-sm font-medium text-ink/80 hover:text-ink transition-colors"
          >
            ← Back to Tips
          </Link>
        </p>
      </div>
    </main>
  );
}
