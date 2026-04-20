/**
 * ─── Specialty landing page content ────────────────────────────────
 * One entry per clinical specialty + hospitals. Drives the
 * /clinics/[specialty] dynamic route and the /hospitals page.
 *
 * Content rules (so we don't invent stats or get Semrush-flagged):
 *   - Product claims mirror verified site-wide copy (47+ clinics,
 *     <15s pickup, 7 languages, 14-day trial, Meta-verified WhatsApp,
 *     AWS Mumbai hosting, DPDP-aligned).
 *   - Patient-behaviour copy stays qualitative — no invented
 *     percentages, industry averages, or specialty case-study numbers.
 *   - Pricing mirrors PRICING_TIERS in constants.ts.
 * ──────────────────────────────────────────────────────────────────
 */

export type SpecialtyQA = { q: string; a: string };

export type Specialty = {
  slug: string;
  label: string;
  /** Short label used in breadcrumbs + cards. */
  shortLabel: string;
  /** Whether this page lives under /clinics/[slug] or /hospitals. */
  kind: 'clinic' | 'hospital';
  /** Metadata title — aim ~60 chars. */
  metaTitle: string;
  /** Metadata description — aim ~155 chars. */
  metaDescription: string;
  /** Keyword-rich H1. */
  heroTitle: string;
  /** Sub-heading below H1. */
  heroSubhead: string;
  /** Optional primary keyword for the section-label eyebrow. */
  eyebrow: string;
  /** 3–4 pain-point statements — specialty-specific, qualitative. */
  painPoints: readonly { title: string; body: string }[];
  /** 3–4 use-cases describing what the AI handles for this specialty. */
  useCases: readonly { title: string; body: string }[];
  /** 4–5 specialty-specific FAQs. */
  faqs: readonly SpecialtyQA[];
};

export const SPECIALTIES: readonly Specialty[] = [
  /* ─────────────────── Dental ─────────────────── */
  {
    slug: 'dental',
    label: 'Dental Clinics',
    shortLabel: 'Dental',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Dental Clinics in India | Engageo',
    metaDescription:
      'AI receptionist + WhatsApp automation for dental clinics in India. Recover every missed call about implants, braces, root canal, and aligners in 15 seconds, 7 languages.',
    heroTitle:
      'AI Missed Call Recovery for Dental Clinics in India',
    heroSubhead:
      'Implant and aligner patients rarely call once. They dial three dental clinics, pick the one that picks up. Engageo answers the ones your front desk can\u2019t — in the patient\u2019s language, within 15 seconds, and books them onto your calendar before they move on.',
    eyebrow: 'Dental',
    painPoints: [
      {
        title: 'Quote-shopping across clinics',
        body: 'Implants, aligners, and orthodontic work are high-value decisions. A patient comparing three quotes will book the first clinic that actually answers their first call — not the one they liked on Instagram.',
      },
      {
        title: 'Emergency calls out of hours',
        body: 'Broken tooth, abscess, crown fallen out — these calls come at 9pm or 7am when the front desk is shut. Most clinics lose the patient to the next Google result.',
      },
      {
        title: 'Front desk already mid-consult',
        body: 'When your assistant is chairside helping the doctor, the phone rings unanswered. The patient hears voicemail, hangs up, and searches again.',
      },
      {
        title: 'WhatsApp follow-ups never go out',
        body: 'Post-RCT aftercare, 6-month cleaning reminders, aligner check-ups — reminders that should be automatic often don\u2019t happen when you\u2019re running a busy clinic.',
      },
    ],
    useCases: [
      {
        title: 'Answer implant and aligner pricing calls',
        body: 'The AI receptionist explains consultation fees, treatment stages, and timelines — whatever your clinic has trained it on. Qualified patients are booked directly into the dentist\u2019s calendar.',
      },
      {
        title: 'Handle after-hours dental emergencies',
        body: 'Missed calls at night get answered, triaged, and a next-morning slot is confirmed on WhatsApp. You wake up to a filled emergency slot, not a voicemail.',
      },
      {
        title: 'Automate post-procedure aftercare',
        body: 'After an RCT, extraction, or implant placement, WhatsApp messages go out with do\u2019s and don\u2019ts, pain-medication schedule, and follow-up booking links — without your team touching a thing.',
      },
      {
        title: 'Bring back dormant patients',
        body: 'Six-month cleaning reminders, annual check-ups, and ortho review visits go out automatically. Patients who\u2019d drift away come back.',
      },
    ],
    faqs: [
      {
        q: 'Can Engageo quote implant or aligner prices on the call?',
        a: 'Yes — the AI only quotes ranges and scenarios your clinic has trained it on. If a patient wants an exact number, it offers to book a consultation with the dentist so the final quote comes from a qualified clinician, not a bot.',
      },
      {
        q: 'Does it integrate with dental HMS like Practo or ClinicSoft?',
        a: 'Bookings sync in real time to Google Calendar, iCal, or Outlook. For Practo and other HMS platforms, we set up one-way sync so the appointment lands in your HMS automatically — ask us about your specific setup on the demo call.',
      },
      {
        q: 'How does it handle emergency dental calls at night?',
        a: 'Every forwarded call is answered in under 15 seconds, 24/7. For genuine emergencies, the patient is given the on-call dentist\u2019s guidance and the first available morning slot, with a WhatsApp confirmation. No more lost 9pm toothaches.',
      },
      {
        q: 'Is it compliant with DCI advertising norms?',
        a: 'Engageo is a call-handling and booking system, not an ad platform. It doesn\u2019t make claims about treatment outcomes or prices beyond what your clinic explicitly authorises. You stay in full control of what the system tells patients.',
      },
    ],
  },

  /* ─────────────────── Dermatology ─────────────────── */
  {
    slug: 'dermatology',
    label: 'Dermatology Clinics',
    shortLabel: 'Dermatology',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Dermatology Clinics in India | Engageo',
    metaDescription:
      'AI receptionist for Indian dermatology clinics. Recover missed calls about laser hair removal, acne, PRP, and cosmetic consults in 15s. 7 languages + WhatsApp.',
    heroTitle:
      'AI Missed Call Recovery for Dermatology Clinics in India',
    heroSubhead:
      'Laser, PRP, and cosmetic patients shop aggressively. If you don\u2019t answer the first call, the next clinic does. Engageo answers every missed call in the patient\u2019s language and books the consult before they price-compare elsewhere.',
    eyebrow: 'Dermatology',
    painPoints: [
      {
        title: 'Cosmetic patients compare three clinics',
        body: 'For laser hair removal, PRP, and aesthetic procedures, patients book the first clinic that responds — not the cheapest. Speed of response decides your conversion rate.',
      },
      {
        title: 'Weekends and evenings drive enquiries',
        body: 'Aesthetic research happens after work. Calls come at 8pm and on Sundays when most clinics run on reduced coverage.',
      },
      {
        title: 'Repetitive questions burn front-desk time',
        body: '\u201CIs laser safe?\u201D \u201CHow many sessions for acne scars?\u201D \u201CDo you do PRP?\u201D Your team answers the same questions 40 times a week.',
      },
      {
        title: 'No-shows hurt hourly laser slots',
        body: 'Laser and procedure slots are expensive to leave empty. Without automated reminders and rebooking, no-show rates erode margin.',
      },
    ],
    useCases: [
      {
        title: 'Qualify laser, PRP, and aesthetic enquiries',
        body: 'The AI receptionist explains procedures, number of sessions, and expected recovery based on what your clinic has trained it on — then books qualified patients onto the dermatologist\u2019s calendar.',
      },
      {
        title: 'Answer repetitive questions at 2am',
        body: 'Your FAQs — timings, fees, pre-procedure instructions, what to avoid before a session — are all available in 7 Indian languages, any hour of the day.',
      },
      {
        title: 'Cut no-shows with layered WhatsApp reminders',
        body: '24-hour and 3-hour reminders go out automatically. If a patient doesn\u2019t confirm, a rebooking nudge follows. Empty laser slots fill up instead of going to waste.',
      },
      {
        title: 'Run post-procedure aftercare on autopilot',
        body: 'Post-laser care, post-peel do\u2019s and don\u2019ts, PRP follow-up — all sent on WhatsApp without your receptionist lifting a finger.',
      },
    ],
    faqs: [
      {
        q: 'Will the AI tell patients laser is \u201Csafe for them\u201D?',
        a: 'No. The system answers factual questions (procedure description, session count, timings, fees) but defers anything clinical — candidacy, side-effect risk, outcomes — to the dermatologist at consultation. It\u2019s trained to book a consult, not give medical advice.',
      },
      {
        q: 'Does it handle both medical and aesthetic dermatology?',
        a: 'Yes. Whether the patient is calling about acne, eczema, vitiligo, or PRP and laser, the same system answers. Your training data controls which services the clinic offers and at what fee tier.',
      },
      {
        q: 'Can it route specific procedures to specific doctors?',
        a: 'Yes. Doctor-specific availability rules mean laser queries go to whoever runs laser hours, PRP to the right doctor, and medical derm to the consulting dermatologist. Your scheduling logic, automated.',
      },
      {
        q: 'How does it help with procedure-day reminders?',
        a: 'Pre-procedure instructions (no shaving 24 hours before laser, no retinoids for 7 days, etc.) go out on WhatsApp automatically at the right time before the slot. Post-procedure aftercare follows.',
      },
    ],
  },

  /* ─────────────────── IVF & Fertility ─────────────────── */
  {
    slug: 'ivf',
    label: 'IVF & Fertility Clinics',
    shortLabel: 'IVF & Fertility',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for IVF & Fertility Clinics in India | Engageo',
    metaDescription:
      'Private, respectful AI call handling for Indian IVF and fertility clinics. Every missed enquiry answered in 15s, 7 languages, with WhatsApp reminders that fit a treatment cycle.',
    heroTitle:
      'AI Missed Call Recovery for IVF & Fertility Clinics in India',
    heroSubhead:
      'Fertility enquiries are private, emotional, and high-value. A patient finally ready to call will hang up if voicemail answers — and may not try again for weeks. Engageo answers every call with warmth, in their own language, and books the first consultation before the doubt returns.',
    eyebrow: 'IVF & Fertility',
    painPoints: [
      {
        title: 'Enquiries are one-shot and emotional',
        body: 'Many IVF callers dial once after months of consideration. A voicemail or busy tone doesn\u2019t get a second attempt.',
      },
      {
        title: 'Patients compare clinics silently',
        body: 'Couples research multiple centres, compare success-rate claims, and commit to whichever clinic treats the first call with respect and clarity.',
      },
      {
        title: 'Cycle calendars are complex',
        body: 'Stimulation injections, monitoring scans, retrieval, transfer — each step has a window. Missed reminders can delay a cycle by a month.',
      },
      {
        title: 'Weekend and late-evening calls are common',
        body: 'Discussions happen after the working day, on Sundays, when the clinic is closed or running a skeleton team.',
      },
    ],
    useCases: [
      {
        title: 'Handle first-consultation enquiries with respect',
        body: 'The AI receptionist answers in the patient\u2019s preferred language — Hindi, Marathi, Tamil, Kannada, Telugu, Bengali, or English — explains your first-consultation process, and books a slot without pressure.',
      },
      {
        title: 'Keep cycle reminders on track',
        body: 'Stimulation-day WhatsApp nudges, monitoring-scan reminders, retrieval-day logistics, transfer-day do\u2019s and don\u2019ts — all timed to each patient\u2019s protocol.',
      },
      {
        title: 'Answer factual questions privately',
        body: 'Fees, documentation required, timings, and how to start — answered on WhatsApp so patients can read in their own time without putting it on speaker.',
      },
      {
        title: 'Bridge the counsellor gap',
        body: 'When counsellors are with patients, the system takes the call, captures the question, and alerts your team to follow up — no enquiry lost.',
      },
    ],
    faqs: [
      {
        q: 'Will the AI discuss success rates or medical advice?',
        a: 'No. It sticks strictly to logistics — what the first consultation covers, fees, timings, required documents. Anything clinical is deferred to the clinician at consultation. We don\u2019t advertise outcomes or success-rate numbers on our patients\u2019 behalf.',
      },
      {
        q: 'Is the conversation private and stored in India?',
        a: 'Yes. All calls and WhatsApp chats are encrypted in transit and at rest. Data is hosted on AWS Mumbai (ap-south-1) and never leaves the country. Your clinic owns the data and can export or delete it within 72 hours on request.',
      },
      {
        q: 'Can it run reminders tied to a patient\u2019s cycle?',
        a: 'Yes. You configure the cycle template once — stimulation, monitoring, trigger, retrieval, transfer — and reminders fire in the right window for each patient, on WhatsApp, in their language.',
      },
      {
        q: 'What if a patient is distressed on the call?',
        a: 'The system is trained to recognise distress cues. When it does, it responds with empathy, offers a same-day human callback from a counsellor, and flags the conversation to your team immediately. No patient is left talking to a machine in a hard moment.',
      },
    ],
  },

  /* ─────────────────── Hair Transplant ─────────────────── */
  {
    slug: 'hair-transplant',
    label: 'Hair Transplant Clinics',
    shortLabel: 'Hair Transplant',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Hair Transplant Clinics in India | Engageo',
    metaDescription:
      'AI receptionist for Indian hair transplant clinics. Recover FUE/FUT enquiry calls, answer graft-count questions in 15s, and book consultations before quote-shopping begins.',
    heroTitle:
      'AI Missed Call Recovery for Hair Transplant Clinics in India',
    heroSubhead:
      'Hair transplant is a high-ticket decision driven by how you handle the very first call. Patients compare quotes across three or four clinics — the one that answers first, in their language, with clarity, wins the consultation.',
    eyebrow: 'Hair Transplant',
    painPoints: [
      {
        title: 'Quote-shopping is the norm',
        body: 'Patients dial several clinics and pick the one that answers fastest with a clear process. Voicemail kills the lead.',
      },
      {
        title: 'Most enquiries ask the same five questions',
        body: 'Graft count, FUE vs. FUT, cost per graft, recovery time, and before/after availability — answered a hundred times a month, manually.',
      },
      {
        title: 'Evening calls dominate',
        body: 'Research and enquiries peak after work hours when the front desk has closed.',
      },
      {
        title: 'No-show risk is high for consultations',
        body: 'Free or low-cost consultations get booked easily and skipped just as easily without reminder discipline.',
      },
    ],
    useCases: [
      {
        title: 'Handle FUE/FUT enquiries at 10pm',
        body: 'The AI explains your clinic\u2019s technique preferences, typical graft ranges, recovery, and consultation process — in whichever Indian language the patient is comfortable with.',
      },
      {
        title: 'Book qualified consultations, not window-shoppers',
        body: 'Enquiry is pre-qualified on the call (expected graft count, male/female pattern, prior procedures). Only serious patients land in the doctor\u2019s calendar.',
      },
      {
        title: 'Reduce consultation no-shows',
        body: 'Two WhatsApp reminders pre-consult, rebooking nudge for no-shows, and easy rescheduling on the same message thread.',
      },
      {
        title: 'Run post-procedure follow-ups',
        body: 'Day-1, day-7, day-30, and month-3 care messages go out automatically — including photo-capture prompts for your records.',
      },
    ],
    faqs: [
      {
        q: 'Will the AI quote a final price per graft?',
        a: 'No. It explains the range your clinic has authorised and why the final number depends on a physical consultation (scalp condition, donor density, goal). The doctor quotes the final figure.',
      },
      {
        q: 'Can it handle FUE vs. FUT queries accurately?',
        a: 'Yes — based entirely on what your clinic has trained it on. If you only offer FUE, it explains FUE. If you offer both, it gives a clear comparison and books the consultation.',
      },
      {
        q: 'Does it help with before/after photo sharing?',
        a: 'On WhatsApp, yes. The system can share a pre-approved before/after gallery link when patients ask — no manual sending, no pictures leaking into wrong chats.',
      },
      {
        q: 'How does it reduce consultation no-shows?',
        a: 'Two layered WhatsApp reminders (24h + 3h), a rebooking message if the patient goes silent, and one-tap reschedule on the same chat. The no-show becomes a shifted slot, not a lost one.',
      },
    ],
  },

  /* ─────────────────── Orthopaedics ─────────────────── */
  {
    slug: 'orthopaedics',
    label: 'Orthopaedics Clinics',
    shortLabel: 'Orthopaedics',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Orthopaedic Clinics in India | Engageo',
    metaDescription:
      'AI receptionist for Indian orthopaedic clinics. Triage injury calls, book post-op follow-ups, and send physio reminders on WhatsApp — in 7 languages, 15-second pickup.',
    heroTitle:
      'AI Missed Call Recovery for Orthopaedic Clinics in India',
    heroSubhead:
      'Orthopaedic calls mix urgency (fractures, sprains, sudden pain) with scheduled follow-ups (post-op, physio). Engageo handles both — triaging the urgent, booking the routine, and keeping physio adherence on track.',
    eyebrow: 'Orthopaedics',
    painPoints: [
      {
        title: 'Pain emergencies don\u2019t wait for office hours',
        body: 'Twisted ankles, back spasms, post-fall calls — these happen at night, on holidays, and need a clear next step within minutes.',
      },
      {
        title: 'Physio adherence is low without reminders',
        body: 'Patients skip physio sessions when follow-up discipline is weak, prolonging recovery and hurting outcomes.',
      },
      {
        title: 'Post-op follow-up calls pile up',
        body: '\u201CCan I start walking yet?\u201D \u201CWhen do stitches come off?\u201D \u201CIs this swelling normal?\u201D — the same questions, every patient, every week.',
      },
      {
        title: 'X-ray / MRI reporting causes delays',
        body: 'Patients call repeatedly asking if their report is ready. Your team spends hours on status-update calls.',
      },
    ],
    useCases: [
      {
        title: 'Triage injury calls round the clock',
        body: 'Urgent calls get clear guidance on whether to come to OPD tomorrow, go to ER now, or wait with ice and elevation — all based on what your orthopaedist has authorised.',
      },
      {
        title: 'Keep physio sessions on schedule',
        body: 'Daily or alternate-day physio reminders, rebooking for skipped sessions, and progress nudges — all on WhatsApp.',
      },
      {
        title: 'Automate post-op timelines',
        body: 'Day-1, day-3, day-7, week-2, week-6 post-op messages with what to watch for, when to resume activity, and when to come back for review.',
      },
      {
        title: 'Notify patients when reports are ready',
        body: 'X-ray and MRI report-ready notifications go out on WhatsApp automatically — cutting inbound \u201Cis it ready yet\u201D calls to near zero.',
      },
    ],
    faqs: [
      {
        q: 'Can the AI decide if a call is an emergency?',
        a: 'It doesn\u2019t diagnose. It asks clarifying questions you\u2019ve authorised (loss of consciousness, open wound, inability to bear weight, etc.) and routes according to your clinic\u2019s triage protocol — either OPD booking, urgent callback, or ER advisory.',
      },
      {
        q: 'Does it replace the physiotherapist?',
        a: 'No. It handles scheduling, reminders, adherence nudges, and logistics — so your physio spends their time with patients, not on the phone chasing no-shows.',
      },
      {
        q: 'Can it handle workers-compensation / insurance documentation queries?',
        a: 'For standard questions (what documents you\u2019ll need, where to submit), yes. For case-specific claims, it captures the query and hands off to your billing team by WhatsApp or callback.',
      },
      {
        q: 'How does it handle post-op emergencies overnight?',
        a: 'The system is trained to recognise red-flag post-op symptoms (uncontrolled pain, fever, wound issues) and immediately escalates with an on-call callback request — no patient left waiting till morning.',
      },
    ],
  },

  /* ─────────────────── Ophthalmology ─────────────────── */
  {
    slug: 'ophthalmology',
    label: 'Ophthalmology Clinics',
    shortLabel: 'Ophthalmology',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Ophthalmology Clinics in India | Engageo',
    metaDescription:
      'AI receptionist for Indian eye clinics and LASIK / cataract centres. Handle enquiries in 15s, 7 languages, with automated post-surgery WhatsApp follow-ups.',
    heroTitle:
      'AI Missed Call Recovery for Ophthalmology Clinics in India',
    heroSubhead:
      'LASIK and cataract patients research deeply before calling. Routine check-up patients dial impulsively. Engageo handles both the considered enquiry and the quick check-up booking — in the patient\u2019s language, without voicemail ever kicking in.',
    eyebrow: 'Ophthalmology',
    painPoints: [
      {
        title: 'LASIK enquiries are comparison-heavy',
        body: 'Candidates research, compare clinics, and book the first one that answers clearly. Your front desk can\u2019t always be there.',
      },
      {
        title: 'Cataract appointments drift without reminders',
        body: 'Pre-op counselling, biometry day, surgery slot, next-day review, one-week review, one-month review — each step needs a nudge.',
      },
      {
        title: 'Routine check-ups compete with emergencies',
        body: 'When a red-eye emergency arrives, the phone goes unanswered for thirty minutes. Routine enquiries leak out.',
      },
      {
        title: 'Annual follow-ups get forgotten',
        body: 'Patients come in for cataract surgery, never get recalled for their annual check, and drift to another clinic.',
      },
    ],
    useCases: [
      {
        title: 'Qualify LASIK enquiries around the clock',
        body: 'Candidate screening questions (age, current prescription, prior surgery, dry-eye history) gathered on the call — only viable candidates land in the surgeon\u2019s consultation slot.',
      },
      {
        title: 'Run cataract surgery timelines on WhatsApp',
        body: 'Biometry-day instructions, pre-op do\u2019s and don\u2019ts, drops schedule, next-day review, and all follow-up windows — automated.',
      },
      {
        title: 'Handle emergency red-eye / vision calls',
        body: 'Flashes, floaters, sudden vision loss — red-flag calls trigger an immediate callback from the on-call ophthalmologist, not a voicemail.',
      },
      {
        title: 'Recall patients for annual check-ups',
        body: 'Patients who had cataract surgery or are on glaucoma follow-up get an automatic annual WhatsApp recall — no manual list-making.',
      },
    ],
    faqs: [
      {
        q: 'Will the AI screen LASIK candidates accurately?',
        a: 'It asks the qualifying questions your surgeon has specified (age, stable prescription, dry-eye history, etc.) and books a consultation for those who pass. It doesn\u2019t clear patients for surgery — that\u2019s the surgeon\u2019s decision at consultation.',
      },
      {
        q: 'Can it handle drops-schedule reminders for glaucoma patients?',
        a: 'Yes. Daily drop reminders, monthly review nudges, and IOP check-up recalls are all configurable per patient. Lowers drop-compliance failures and repeat emergency visits.',
      },
      {
        q: 'How does it route sudden vision-loss calls?',
        a: 'Red-flag symptoms (flashes, floaters, curtain in vision, sudden loss) trigger an immediate escalation path — on-call ophthalmologist callback, ER advisory, or urgent OPD slot, based on your clinic protocol.',
      },
      {
        q: 'Does it integrate with my EMR for vision records?',
        a: 'Bookings sync to Google Calendar / iCal. For specific EMR integrations (Bayfront, eye-specific platforms), we set up one-way sync so the appointment appears in your EMR. Discuss your setup on the demo call.',
      },
    ],
  },

  /* ─────────────────── Gynaecology ─────────────────── */
  {
    slug: 'gynaecology',
    label: 'Gynaecology & Maternity Clinics',
    shortLabel: 'Gynaecology',
    kind: 'clinic',
    metaTitle:
      'AI Missed Call Recovery for Gynaecology Clinics in India | Engageo',
    metaDescription:
      'Private, warm AI call handling for Indian gynaecology and maternity clinics. Every missed call answered in 15s, 7 languages, with antenatal WhatsApp reminders built-in.',
    heroTitle:
      'AI Missed Call Recovery for Gynaecology & Maternity Clinics in India',
    heroSubhead:
      'Gynaecology calls are private, sometimes urgent, and often in the patient\u2019s own language rather than English. Engageo handles the first-trimester enquiry, the period-concern call, and the 3am antenatal worry — with warmth, in the right language, without voicemail.',
    eyebrow: 'Gynaecology',
    painPoints: [
      {
        title: 'Patients dial in their mother tongue',
        body: 'Comfort with gynaecological topics is much higher in Hindi, Marathi, Tamil, Kannada, Telugu, or Bengali than in English. An English-only front desk leaves many patients hesitant.',
      },
      {
        title: 'Antenatal schedules are dense',
        body: 'Monthly scans in the first two trimesters, fortnightly in the third, vaccination dates, glucose screening, growth-scan windows — a lot to keep on track.',
      },
      {
        title: 'Private enquiries want privacy',
        body: 'Period concerns, PCOS, contraception, pregnancy confirmation — patients want to ask privately, not through a crowded front desk.',
      },
      {
        title: 'Labour-related queries happen at any hour',
        body: '\u201CIs this a contraction?\u201D \u201CWater just broke at 3am — do I come in?\u201D — the calls that matter most rarely come during office hours.',
      },
    ],
    useCases: [
      {
        title: 'Answer in the patient\u2019s language, privately',
        body: 'Voice and WhatsApp conversations in 7 Indian languages — the patient asks in Marathi, gets answered in Marathi, and never has to put the call on speaker.',
      },
      {
        title: 'Automate antenatal milestones',
        body: 'Trimester-specific scan reminders, vaccination-day nudges, glucose-test windows, fetal-kick-count instructions, and labour-signs education — all on WhatsApp, timed to each patient\u2019s due date.',
      },
      {
        title: 'Handle labour / emergency calls round the clock',
        body: 'The AI is trained to recognise urgency cues (water breaking, heavy bleeding, reduced fetal movement) and triggers an on-call obstetrician callback immediately — not a voicemail.',
      },
      {
        title: 'Discreet post-delivery follow-up',
        body: 'Post-partum check-up reminders, contraception counselling invitations, newborn-care messages — all private, timed, on WhatsApp.',
      },
    ],
    faqs: [
      {
        q: 'Can it handle labour calls properly?',
        a: 'Yes. The system is trained to recognise labour cues (contractions, water-breaking, heavy bleeding) and triggers an immediate callback from the on-call obstetrician while guiding the patient on what to do until then. No 3am voicemails.',
      },
      {
        q: 'Does it support regional language pregnancy terms?',
        a: 'Seven languages — Hindi, Marathi, Tamil, Kannada, Telugu, Bengali, and English. Patients ask in their own language and are answered in the same language. No awkward switching.',
      },
      {
        q: 'Is it private and compliant with patient-data norms?',
        a: 'All conversations encrypted in transit and at rest, hosted on AWS Mumbai (ap-south-1), never leaves India. Aligned with the DPDP Act 2023 from day one. Your clinic owns the data and controls what is retained.',
      },
      {
        q: 'Can it run antenatal reminder schedules personalised to each patient?',
        a: 'Yes. You set the antenatal template once; each patient\u2019s reminders fire against their own LMP / due date. Scan windows, vaccination days, and labour-signs education — all automated per patient.',
      },
    ],
  },

  /* ─────────────────── Hospitals ─────────────────── */
  {
    slug: 'hospitals',
    label: 'Hospitals',
    shortLabel: 'Hospitals',
    kind: 'hospital',
    metaTitle:
      'AI Missed Call Recovery for Hospitals in India | Engageo',
    metaDescription:
      'AI switchboard + WhatsApp automation for Indian hospitals. Route calls to the right department, book OPD slots, and run discharge follow-ups in 7 languages, 15-second pickup.',
    heroTitle:
      'AI Missed Call Recovery for Hospitals in India',
    heroSubhead:
      'Hospital switchboards drop calls no matter how well you staff them. Engageo sits behind your existing number as a second line — picking up missed calls, routing to the right department, booking OPD slots, and running discharge follow-ups without adding headcount.',
    eyebrow: 'Hospitals',
    painPoints: [
      {
        title: 'Switchboards go busy at peak',
        body: 'OPD mornings and post-lunch windows flood the switchboard. Even a well-staffed hospital loses callers to busy tones.',
      },
      {
        title: 'Wrong-department transfers lose patients',
        body: 'Callers transferred between three desks often hang up. Patients who wanted a cardiology slot end up going somewhere else.',
      },
      {
        title: 'Discharge follow-ups are inconsistent',
        body: 'Post-discharge medication reminders, suture-removal appointments, and review visits depend on which team discharged the patient — not on a reliable system.',
      },
      {
        title: 'Emergency-department directory calls clog the line',
        body: 'Visitor directions, admission-status enquiries, attendant queries — useful calls that shouldn\u2019t tie up the main line.',
      },
    ],
    useCases: [
      {
        title: 'Route calls to the right department',
        body: 'The AI asks a single clarifying question ("OPD booking, admission enquiry, visitor directions, or patient-status update?") and handles or transfers accordingly — in the patient\u2019s language.',
      },
      {
        title: 'Book OPD slots across specialties',
        body: 'Specialty-aware booking — the system knows which doctor runs OPD on which days, which specialties have waiting lists, and confirms a slot in real time.',
      },
      {
        title: 'Automate discharge-day logistics',
        body: 'Medication schedule on WhatsApp, suture-removal reminder, first follow-up OPD slot, dietary instructions — all sent on the day of discharge, in the patient\u2019s language.',
      },
      {
        title: 'Handle directory and status enquiries',
        body: 'Visitor directions, OT status queries, admission-bill status — handled automatically so the main switchboard stays free for clinical calls.',
      },
    ],
    faqs: [
      {
        q: 'Does Engageo replace our hospital switchboard?',
        a: 'No. It sits behind it. Your main number stays the same. Only calls that your switchboard can\u2019t pick up within your chosen ring-window (commonly 15 seconds) route to Engageo. Your staff keeps their existing workflow.',
      },
      {
        q: 'Can it integrate with our HIS / HMS?',
        a: 'Bookings sync in real time to Google Calendar and iCal. For hospital HIS/HMS platforms, we set up one-way sync so OPD slots appear in your system automatically. Specifics depend on your HIS — we scope this on the demo call.',
      },
      {
        q: 'Is it HIPAA-equivalent compliant for Indian hospitals?',
        a: 'We operate under ISO 27001 controls and are aligned with the DPDP Act 2023 — India\u2019s primary data-protection framework. All data is hosted on AWS Mumbai (ap-south-1) and never leaves the country. Hospital owns the data and governs retention.',
      },
      {
        q: 'Will it handle emergency / ambulance-dispatch calls?',
        a: 'True emergency calls (ambulance, active chest pain, trauma) are flagged within seconds and routed immediately to your emergency desk — no booking flow, no hold music. The AI is built to recognise urgency cues and escalate, not delay.',
      },
      {
        q: 'Can we use it across multiple hospital locations?',
        a: 'Yes. Multi-location setups get per-location numbers, per-location departments, and per-location doctor calendars — with centralised reporting across the group. Useful for hospital chains and multi-city setups.',
      },
    ],
  },
] as const;

export function getSpecialtyBySlug(slug: string): Specialty | null {
  return SPECIALTIES.find((s) => s.slug === slug) ?? null;
}

export function getClinicSpecialties(): readonly Specialty[] {
  return SPECIALTIES.filter((s) => s.kind === 'clinic');
}

export function getHospitalSpecialty(): Specialty {
  const hospital = SPECIALTIES.find((s) => s.kind === 'hospital');
  if (!hospital) {
    throw new Error('Hospital specialty missing from SPECIALTIES data');
  }
  return hospital;
}
