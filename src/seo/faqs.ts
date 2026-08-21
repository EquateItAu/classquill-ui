// Single source of truth for the homepage FAQ.
//
// Both the rendered <FAQ> accordion AND the FAQPage JSON-LD in <StructuredData>
// read from this array, so the structured data can never drift from the visible
// copy (Google penalises FAQ markup that doesn't match on-page content).

export interface LandingFaq {
  question: string;
  answer: string;
}

// TODO i18n-nonreact
export const faqs: LandingFaq[] = [
  {
    question: "We already use Wise / TutorCruncher / Teachworks. Why switch?",
    answer:
      "They run your operations — scheduling, billing, payroll. We add the part they leave out: proof your students are actually learning. Keep your ops tool or replace it; either way you get a built-in learning platform, auto-marked homework, and outcomes you can show parents.",
  },
  {
    question: "Will my tutors actually use it, or resist it?",
    answer:
      "It saves them time. They set homework once and it auto-marks, and parent updates generate from real results — so it's less admin, not more. Tutors walk into each session already knowing where the student dropped marks.",
  },
  {
    question: "How does migration and data import work?",
    answer:
      "We help you bring students, tutors and your schedule across from your current tool or a spreadsheet. Most centres are up and running in days. Book a demo and we'll map your migration on the call.",
  },
  {
    question: "Can I brand it as my own?",
    answer:
      "Yes — white-label branding is included. Your students and parents see your centre name and logo, not ours.",
  },
  {
    question: "How does pricing work?",
    answer:
      "US$20/mo for your first tutor, then US$6/mo for each additional tutor — the full learning platform is included for every tutor. The AI Assistant add-on is optional and priced per active user, whether that's a student or a tutor — same price either way. See your total on the pricing page, or we'll size your quote on the demo.",
  },
  {
    question: "Is my data secure, and do I own it?",
    answer:
      "Your data is yours. We take minors' data seriously, payments run through Stripe, and accounting syncs to Xero. You can export your data at any time.",
  },
  {
    question: "What about invoicing and getting paid?",
    answer:
      "Invoices auto-draft when a session completes, with Stripe payment links and Xero sync. (Fully-automatic send and dunning is on the roadmap — drafts are reviewed and sent today.) Tutor payroll runs through Stripe Connect direct payouts.",
  },
  {
    question: "Does ClassQuill include a whiteboard for online lessons?",
    answer:
      "Yes — a live whiteboard is built into every session alongside our built-in video, with a maths-teacher stencil library included. You don't need a separate app like Pencil Spaces or Lessonspace.",
  },
  {
    question: "Can students ask their tutor about a specific question?",
    answer:
      "Yes. On any question, a student can bookmark it for revision or send it to their tutor with their draft answer and whiteboard working attached. The tutor gets it in chat and can reply or work through the question directly. Tutors also see which questions multiple students in a class have saved — a ready-made revision list for the next session.",
  },
];
