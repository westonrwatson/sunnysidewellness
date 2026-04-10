import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { id: 'intro', label: 'Introduction' },
  { id: 'control', label: 'Take back control' },
  { id: 'goals', label: 'Set clearer goals' },
  { id: 'confidence', label: 'Build your confidence' },
  { id: 'connect', label: 'Connect and grow' },
  { id: 'basics', label: 'Check your basics' },
  { id: 'support', label: 'When to seek help' },
];

export function Tips() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [barStyle, setBarStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const tocListRef = useRef<HTMLUListElement>(null);
  const ignoreScrollUntil = useRef(0);

  useLayoutEffect(() => {
    const list = tocListRef.current;
    if (!list) return;
    const activeLi = list.querySelector(`[data-section-id="${activeId}"]`) as HTMLElement | null;
    if (activeLi) {
      setBarStyle({ top: activeLi.offsetTop, height: activeLi.offsetHeight });
    }
  }, [activeId]);

  useEffect(() => {
    const updateActive = () => {
      if (Date.now() < ignoreScrollUntil.current) return;
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 20) {
        setActiveId(SECTIONS[SECTIONS.length - 1].id);
        return;
      }
      const offset = 120;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveId(SECTIONS[i].id);
          return;
        }
      }
      setActiveId(SECTIONS[0].id);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  const scrollTo = (id: string) => {
    setActiveId(id);
    ignoreScrollUntil.current = Date.now() + 800;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="lg:flex lg:gap-16">
          <article className="flex-1 min-w-0">
            <section id="intro" className="scroll-mt-28">
              <h1 className="averia-serif-libre-bold-italic text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
                Wellness tips and support
              </h1>
              <p className="mt-6 font-sans text-lg text-ink/90 leading-relaxed">
                Feeling overwhelmed, unmotivated, or stuck? The tips below come from research in
                psychology and organizational behavior. They’re small, concrete actions you can
                try—no therapy session required. Pick one or two that resonate and see what
                shifts. Each tip is backed by established theories like locus of control, SMART
                goals, self-efficacy, self-determination theory, and ERG theory. We’ve linked to
                sources so you can dig deeper when you’re ready.
              </p>
            </section>

            <section id="control" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-accent-orange">
                Take back control
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                When things go wrong, it’s easy to feel like nothing you do matters. Research on
                locus of control shows that people who believe outcomes depend on their actions
                tend to feel less stressed and more motivated than those who attribute results
                to luck or others. The good news: you can shift your mindset with practice.
              </p>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Start by noticing how you talk about setbacks. When you say &quot;That professor is so
                unfair&quot; or &quot;I just got unlucky,&quot; you’re placing control outside yourself.
                Try reframing: &quot;I didn’t prioritize the right material&quot; or &quot;I can ask for help
                next time.&quot; The words you use shape how much agency you feel. Another simple
                exercise: create a &quot;Control List.&quot; Write down what you can control—study hours,
                sleep, who you reach out to, how you prepare—and what you can’t—exam curves,
                other people’s choices, the weather. Focus your energy only on the first column.
              </p>
              <div className="mt-6 pl-4 border-l-4 border-accent-orange/50 font-sans text-ink/85 italic">
                Small wins reinforce that your actions matter. Set one manageable goal, achieve
                it, and acknowledge that your effort led to the result. Research links internal
                locus of control to better health outcomes and lower stress.
              </div>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                <a
                  href="https://www.youtube.com/watch?v=JaojNFyZKQk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-orange font-medium hover:underline"
                >
                  Learn more about locus of control →
                </a>
              </p>
            </section>

            <section id="goals" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-accent-lavender">
                Set clearer goals
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Vague goals like &quot;do better in class&quot; or &quot;get organized&quot; create ambiguity. You
                don’t know where to start, so you procrastinate. SMART goals—Specific,
                Measurable, Achievable, Relevant, and Time-bound—give you a clear target. Studies
                show that SMART goal interventions lead to greater goal attainment and need
                satisfaction among students, as well as increased positive affect.
              </p>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Turn &quot;do better in class&quot; into &quot;Study calculus for 40 minutes every weekday at 7
                PM in the library.&quot; Include when, where, and for how long. Break big tasks
                into measurable steps: &quot;Complete 3 practice problems,&quot; &quot;Draft 2 paragraphs.&quot;
                Checkpoints create momentum and reduce the stress of feeling stuck. And each
                morning, time-block your top priority. Put it in your calendar. Structure keeps
                work from piling up and minimizes last-minute panic.
              </p>
              <div className="mt-6 pl-4 border-l-4 border-accent-lavender/50 font-sans text-ink/85 italic">
                Time-bound goals create urgency and structure, which minimize procrastination
                and exam-period stress. When you know exactly what to do, it’s easier to start.
              </div>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                <a
                  href="https://positivepsychology.com/smart-goals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-lavender font-medium hover:underline"
                >
                  Learn more about SMART goals →
                </a>
              </p>
            </section>

            <section id="confidence" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-accent-teal">
                Build your confidence
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Self-efficacy—your belief that you can accomplish a task—is one of the strongest
                predictors of performance. Bandura showed that people with high self-efficacy
                view challenges as opportunities, recover faster from failure, and experience
                lower stress and depression. The good news: you can build it. Mastery experiences
                (actually doing something successfully) are the most powerful source.
              </p>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Break a daunting task into the smallest possible piece. Write one paragraph.
                Study for 10 minutes. Celebrate the small win—your brain learns &quot;I did it&quot;
                instead of &quot;I can’t.&quot; Reflect on past wins too: think of a time you did something
                similar well. Write down what you did and how you overcame obstacles. If you
                could do it then, you can do it now. And don’t underestimate feedback: reach out
                to a mentor, professor, or friend and ask for honest input. Hearing their
                confidence in you can boost your own. Verbal persuasion is one of Bandura’s key
                sources of self-efficacy.
              </p>
              <div className="mt-6 pl-4 border-l-4 border-accent-teal/50 font-sans text-ink/85 italic">
                People with high self-efficacy recover faster from failure and experience lower
                stress. Start small, succeed, and let the evidence stack up.
              </div>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                <a
                  href="https://www.simplypsychology.org/self-efficacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-teal font-medium hover:underline"
                >
                  Learn more about self-efficacy →
                </a>
              </p>
            </section>

            <section id="connect" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-accent-rose">
                Connect and grow
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Connection and growth aren’t luxuries—they’re psychological needs. Self-determination
                theory identifies three core needs: autonomy (feeling in control of your choices),
                belonging (connection with others), and competency (feeling capable). When these
                are satisfied, motivation and well-being improve. ERG theory similarly emphasizes
                relatedness and growth alongside basic existence needs.
              </p>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Each morning, set one clear priority. Let that choice—not external demands—drive
                your focus. That simple act satisfies autonomy and reduces the feeling that
                life is happening to you. Reach out to someone: call, text, or spend time with
                a friend or mentor. Connection meets the need for belonging and reminds you
                that you’re not facing challenges alone. And spend 15–20 minutes on something
                that helps you grow—a hobby, a new habit, or a skill. Small growth builds
                competency and carries over into other areas. When one need is frustrated,
                research shows we can often compensate by addressing another.
              </p>
              <div className="mt-6 pl-4 border-l-4 border-accent-rose/50 font-sans text-ink/85 italic">
                Research on self-determination theory suggests that when autonomy, belonging, and
                competency needs are met, people tend toward stronger motivation and better
                performance.
              </div>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                <a
                  href="https://selfdeterminationtheory.org/theory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-rose font-medium hover:underline"
                >
                  Learn more about self-determination theory →
                </a>
              </p>
            </section>

            <section id="basics" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-accent-orange">
                Check your basics
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Before you optimize your mindset or your goals, check the fundamentals. ERG theory
                reminds us that existence needs—food, safety, sleep—must be met before we can
                thrive. When they’re neglected, stress and burnout increase. Fixing basics often
                improves everything else.
              </p>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                Ask: Am I getting enough sleep? Am I eating regular, healthy meals? Am I in a
                safe environment? Make one small improvement today—set a sleep time, plan one
                nutritious meal, or create a calmer study space. Alderfer found that when one
                need is frustrated, we can compensate by addressing another. If work feels
                impossible, strengthening a relationship or taking care of your body can
                restore balance. Don’t underestimate the power of the basics.
              </p>
              <div className="mt-6 pl-4 border-l-4 border-accent-orange/50 font-sans text-ink/85 italic">
                ERG theory maps needs onto existence (food, safety, sleep), relatedness with
                others, and growth through learning and new skills. When one level is strained,
                shoring up another can help you rebalance—often starting with the basics.
              </div>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                <a
                  href="https://educationlibrary.org/alderfers-erg-theory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-orange font-medium hover:underline"
                >
                  Learn more about ERG theory →
                </a>
              </p>
            </section>

            <section id="support" className="mt-16 scroll-mt-28">
              <h2 className="averia-serif-libre-bold-italic text-2xl md:text-3xl text-ink">
                When to seek help
              </h2>
              <p className="mt-4 font-sans text-ink/90 leading-relaxed">
                These tips are not a replacement for professional mental health care. If you’re
                experiencing persistent sadness, anxiety, hopelessness, or thoughts of harm,
                please reach out. <a
                  href="https://caps.byu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-orange font-semibold hover:underline"
                >
                  BYU Counseling &amp; Psychological Services (CAPS)
                </a>{' '}
                offers confidential support for students. You don’t have to do this alone.
              </p>
            </section>

            {/* Back to top */}
            <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-left">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-sans text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                Back to top ↑
              </button>
              <span className="font-sans text-sm text-ink/40 hidden sm:inline" aria-hidden>
                |
              </span>
              <Link
                to="/about-this-site"
                className="font-sans text-sm font-medium text-ink/80 hover:text-ink transition-colors"
              >
                How this site was made
              </Link>
            </div>
          </article>

          {/* Desktop TOC - fixed in place from the start so it never moves on scroll */}
          <aside className="hidden lg:block flex-shrink-0 w-48">
            <nav
              className="fixed top-30 right-[max(1.5rem,calc((100vw-72rem)/2+1rem))] w-50"
              aria-label="Table of contents"
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink/60 mb-4 pl-3">
                In this article
              </p>
              <ul ref={tocListRef} className="space-y-2 relative pl-3">
                <span
                  className="absolute left-0 w-0.5 bg-ink rounded-full pointer-events-none"
                  style={{
                    top: barStyle.top,
                    height: barStyle.height,
                    transition: 'top 0.2s ease-out, height 0.2s ease-out',
                  }}
                  aria-hidden
                />
                {SECTIONS.map(({ id, label }) => (
                  <li key={id} data-section-id={id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(id)}
                      className={`text-left font-sans text-sm w-full py-1 transition-colors hover:text-ink ${
                        activeId === id ? 'font-bold text-ink' : 'text-ink/70'
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
