import type { TheoryKey } from './questions';

export interface Recommendation {
  id: string;
  /** The action they can take */
  actionTitle: string;
  /** More detail on the action */
  description: string;
  /** Why this will help them personally */
  whyItHelps: string;
  theory: TheoryKey;
  theoryName: string;
  theoryBlurb: string;
  /** Link for further reading */
  link: string;
}

export const recommendations: Record<TheoryKey, Recommendation[]> = {
  locus: [
    {
      id: 'locus-1',
      actionTitle: 'Audit your language when describing setbacks',
      description:
        'Pay attention to how you describe setbacks. Instead of "That professor is so unfair," try "I didn\'t prioritize the right chapters." Notice when you use external attributions (blaming others, luck, circumstances) versus internal ones (your choices, effort, preparation).',
      whyItHelps:
        'Shifting toward an internal locus restores your sense of agency. When you recognize what you can control, you feel less helpless and more motivated to take action next time.',
      theory: 'locus',
      theoryName: 'Locus of Control',
      theoryBlurb:
        'Locus of Control describes whether you believe outcomes depend on your actions (internal) or external forces (luck, others). Moving toward internal locus increases motivation and reduces stress.',
      link: 'https://www.simplypsychology.org/locus-of-control.html',
    },
    {
      id: 'locus-2',
      actionTitle: 'Create a "Control List"',
      description:
        'Write down what you can control (study hours, asking for help, sleep, which tasks you tackle first) and what you cannot (exam difficulty, curves, other people\'s choices). Keep this list visible and focus your energy only on the first column.',
      whyItHelps:
        'When you distinguish between controllable and uncontrollable factors, you reduce anxiety by directing effort where it actually matters. You stop spinning on things you can\'t change.',
      theory: 'locus',
      theoryName: 'Locus of Control',
      theoryBlurb:
        'Focusing on controllables helps shift from helplessness to action. Research links internal locus to better health outcomes and lower stress.',
      link: 'https://www.psychologytoday.com/us/basics/locus-of-control',
    },
    {
      id: 'locus-3',
      actionTitle: 'Set and achieve one small goal this week',
      description:
        'Choose something manageable—finish one chapter, reach out to one classmate, or fix one habit. Write it down, do it, and then acknowledge that your effort led to the result.',
      whyItHelps:
        'Small wins reinforce that your actions matter. Each success builds confidence that you can influence outcomes, gradually shifting you toward a more empowered mindset.',
      theory: 'locus',
      theoryName: 'Locus of Control',
      theoryBlurb:
        'Mastery experiences strengthen internal locus. Evidence shows that repeated small successes can improve locus of control over time.',
      link: 'https://www.simplypsychology.org/locus-of-control.html',
    },
  ],
  smart: [
    {
      id: 'smart-1',
      actionTitle: 'Turn one vague goal into a specific plan',
      description:
        'Take something broad like "do better in class" and make it specific: "Study calculus for 40 minutes every weekday at 7 PM in the library." Include when, where, and for how long.',
      whyItHelps:
        'Specificity reduces ambiguity and decision fatigue. You know exactly what to do, which makes it easier to start and follow through instead of procrastinating.',
      theory: 'smart',
      theoryName: 'SMART Goals',
      theoryBlurb:
        'SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) direct attention, increase effort, and reduce the anxiety of uncertainty.',
      link: 'https://positivepsychology.com/smart-goals/',
    },
    {
      id: 'smart-2',
      actionTitle: 'Break one task into measurable steps',
      description:
        'Choose one task and define how you\'ll know you\'ve made progress. For example: "Complete 3 practice problems" or "Draft 2 paragraphs of my paper." Create checkpoints you can tick off.',
      whyItHelps:
        'Trackable progress increases motivation. Seeing concrete steps completed gives you a sense of momentum and reduces the stress of feeling stuck.',
      theory: 'smart',
      theoryName: 'SMART Goals',
      theoryBlurb:
        'Measurable milestones support motivation and help you adjust when needed. Research shows SMART goal interventions improve goal attainment and well-being.',
      link: 'https://positivepsychology.com/smart-goals/',
    },
    {
      id: 'smart-3',
      actionTitle: 'Time-block your top priority each morning',
      description:
        'Each day, choose one important task and schedule it: "I will complete my readings by 6 PM today" or "I will finish the lab report by Sunday at 4 PM." Put it in your calendar.',
      whyItHelps:
        'Time-bound goals create urgency and structure. This keeps work from piling up and minimizes last-minute stress and procrastination.',
      theory: 'smart',
      theoryName: 'SMART Goals',
      theoryBlurb:
        'Time-bound goals reduce procrastination and exam-period stress. Studies link structured goal-setting to greater need satisfaction.',
      link: 'https://positivepsychology.com/smart-goals/',
    },
  ],
  selfEfficacy: [
    {
      id: 'se-1',
      actionTitle: 'Practice one small part of a daunting task',
      description:
        'Break a task you\'re avoiding into the smallest possible piece. If it\'s a paper, write one paragraph. If it\'s studying, do 10 minutes. Celebrate that small win before expanding.',
      whyItHelps:
        'Success on small tasks builds belief that you can handle bigger ones. Your brain learns "I did it" instead of "I can\'t," which strengthens confidence for the next step.',
      theory: 'selfEfficacy',
      theoryName: 'Self-Efficacy',
      theoryBlurb:
        'Self-efficacy is your belief that you can accomplish a task. Mastery experiences—actually doing something successfully—are the strongest source of that belief.',
      link: 'https://www.simplypsychology.org/self-efficacy.html',
    },
    {
      id: 'se-2',
      actionTitle: 'Reflect on a past win',
      description:
        'Think of a time you did something similar—or any challenging task—well. Write down what you did and how you overcame obstacles. Remind yourself: if you could do it then, you can do it now.',
      whyItHelps:
        'Remembering past success reactivates your sense of capability. It counters the voice that says "I can\'t" by providing real evidence that you have succeeded before.',
      theory: 'selfEfficacy',
      theoryName: 'Self-Efficacy',
      theoryBlurb:
        'Bandura identified mastery experiences as the most powerful source of self-efficacy. Recalling past successes strengthens belief in future success.',
      link: 'https://www.simplypsychology.org/self-efficacy.html',
    },
    {
      id: 'se-3',
      actionTitle: 'Ask for feedback from someone you trust',
      description:
        'Reach out to a mentor, professor, or friend and ask for honest feedback on your work or approach. Listen for what you did well, not just what to improve.',
      whyItHelps:
        'Hearing someone else\'s confidence in you can boost your belief in yourself. Verbal persuasion is one of Bandura\'s key sources of self-efficacy.',
      theory: 'selfEfficacy',
      theoryName: 'Self-Efficacy',
      theoryBlurb:
        'Social persuasion from trusted others can increase self-efficacy. Positive feedback helps you take on challenges you might otherwise avoid.',
      link: 'https://www.simplypsychology.org/self-efficacy.html',
    },
  ],
  abc: [
    {
      id: 'abc-1',
      actionTitle: 'Set one clear priority for today',
      description:
        'Each morning, choose one important task you want to complete. Write it down. Let that choice—not external demands—drive your focus. Protect time for it.',
      whyItHelps:
        'Choosing your own priority satisfies the need for autonomy. Feeling in control of your choices reduces stress and makes work feel less like pressure and more like purpose.',
      theory: 'abc',
      theoryName: 'Self-Determination Theory (ABC)',
      theoryBlurb:
        'Autonomy, Belonging, and Competency are core psychological needs. Autonomy—feeling in control of your choices—reduces stress and supports motivation.',
      link: 'https://selfdeterminationtheory.org/theory/',
    },
    {
      id: 'abc-2',
      actionTitle: 'Reach out to someone you trust',
      description:
        'Call, text, or spend time with a friend, family member, or mentor. Share how you\'re doing. Ask for support or just connect. Be present with them.',
      whyItHelps:
        'Connection meets the need for belonging. Supportive relationships reduce stress, buffer against overwhelm, and remind you that you\'re not facing challenges alone.',
      theory: 'abc',
      theoryName: 'Self-Determination Theory (ABC)',
      theoryBlurb:
        'Belonging (relatedness) is a fundamental psychological need. Research shows that supportive relationships increase motivation and well-being.',
      link: 'https://selfdeterminationtheory.org/theory/',
    },
    {
      id: 'abc-3',
      actionTitle: 'Learn or improve one small skill',
      description:
        'Spend 15–20 minutes on something that helps you grow—a hobby, healthy habit, or work skill. Focus on progress, not perfection.',
      whyItHelps:
        'Building competency satisfies the need to feel capable. Small improvements create a sense of growth that carries over into other areas of your life.',
      theory: 'abc',
      theoryName: 'Self-Determination Theory (ABC)',
      theoryBlurb:
        'Competency—feeling capable—increases motivation. SDT shows that satisfying autonomy, belonging, and competency together supports flourishing.',
      link: 'https://selfdeterminationtheory.org/theory/',
    },
    {
      id: 'abc-4',
      actionTitle: 'Reflect on one thing you did well today',
      description:
        'At the end of the day, write down one thing you handled well or improved on. Be specific. Acknowledge your effort and progress.',
      whyItHelps:
        'Recognizing your own progress reinforces competency. It shifts your focus from what\'s left to do to what you\'ve already achieved.',
      theory: 'abc',
      theoryName: 'Self-Determination Theory (ABC)',
      theoryBlurb:
        'Acknowledging competency through reflection supports motivation and well-being according to self-determination theory.',
      link: 'https://selfdeterminationtheory.org/theory/',
    },
  ],
  erg: [
    {
      id: 'erg-1',
      actionTitle: 'Check your basics: sleep, meals, safety',
      description:
        'Ask: Am I getting enough sleep? Am I eating regular, healthy meals? Am I in a safe environment? Make one small improvement today—e.g., set a sleep time, plan one nutritious meal.',
      whyItHelps:
        'Existence needs (food, safety, sleep) must be met before you can thrive. When they\'re neglected, stress and burnout increase. Fixing basics often improves everything else.',
      theory: 'erg',
      theoryName: 'ERG Theory',
      theoryBlurb:
        'ERG Theory identifies Existence, Relatedness, and Growth needs. Existence needs—food, safety, shelter—are foundational. Neglecting them amplifies stress.',
      link: 'https://educationlibrary.org/alderfers-erg-theory/',
    },
    {
      id: 'erg-2',
      actionTitle: 'Strengthen one close relationship',
      description:
        'Pick one way to improve a relationship—call a friend, have lunch with a colleague, or spend quality time with family. Focus on connection, not productivity.',
      whyItHelps:
        'Relatedness needs (belonging, connection) are central to well-being. When frustrated in other areas, investing in relationships can restore balance and reduce isolation.',
      theory: 'erg',
      theoryName: 'ERG Theory',
      theoryBlurb:
        'Relatedness includes belonging, love, and relationships. Alderfer found that when one need is frustrated, we can compensate by addressing another.',
      link: 'https://educationlibrary.org/alderfers-erg-theory/',
    },
    {
      id: 'erg-3',
      actionTitle: 'Do one thing to grow or learn',
      description:
        'Pick something to learn or a goal to improve on—even something small like aiming for 8 hours of sleep, learning a new recipe, or practicing a skill for 15 minutes.',
      whyItHelps:
        'Growth needs (achievement, development) contribute to motivation. Addressing them helps you feel like you\'re moving forward, not just surviving.',
      theory: 'erg',
      theoryName: 'ERG Theory',
      theoryBlurb:
        'Growth needs include achievement and learning. ERG Theory shows that people can pursue multiple needs at once—existence, relatedness, and growth.',
      link: 'https://educationlibrary.org/alderfers-erg-theory/',
    },
  ],
};
