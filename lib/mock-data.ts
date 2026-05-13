export type EntryType = "role" | "topic";

export interface IdealSTAR {
  s: string;
  t: string;
  a: string;
  r: string;
}

export interface QuestionDetail {
  id: string;
  question: string;
  suggestion: string;
  idealSTAR: IdealSTAR
}

export interface ConversationTurn {
  id: string;
  aiQuestion: string;
  userMockAnswer: string;
  idealSTAR: IdealSTAR; // Added benchmark
  suggestion: string;   // Added coach's suggestion
  feedback: {
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    starAnalysis: {
      s: "detected" | "missing";
      t: "detected" | "missing";
      a: "detected" | "missing";
      r: "detected" | "missing";
    };
  };
}

export interface InterviewEntry {
  slug: string;
  title: string;
  type: EntryType;
  category: string;
  skills: string[];
  description: string;
  commonQuestions: QuestionDetail[];
  mockConversation: ConversationTurn[];
}

export const INTERVIEW_DATA: InterviewEntry[] = [
  {
    slug: "education-coordinator",
    title: "Education Coordinator",
    type: "role",
    category: "Education",
    skills: ["Curriculum Development", "Scheduling", "Compliance", "LMS"],
    description: "Expertise in managing academic programs and coordinating faculty workflows.",
    commonQuestions: [
      { id: "ed-1", question: "How do you handle a curriculum change that faculty is resisting?", suggestion: "Focus on stakeholder engagement and data-backed benefits.", idealSTAR: { s: "A transition to a new digital literacy framework.", t: "Onboard 50 skeptical faculty members.", a: "Created pilot groups and peer-mentoring sessions.", r: "100% adoption within 3 months." }},
      { id: "ed-2", question: "Describe your experience with managing complex academic schedules.", suggestion: "Emphasize resource optimization and conflict resolution.", idealSTAR: { s: "Managing a multi-campus university schedule.", t: "Reduce room conflicts by 40%.", a: "Automated scheduling via a new LMS module.", r: "Zero overlaps in the next semester." }},
      { id: "ed-3", question: "How do you ensure a program meets state education standards?", suggestion: "Discuss auditing processes and documentation.", idealSTAR: { s: "Annual accreditation review approaching.", t: "Audit 12 program modules for compliance.", a: "Mapped every lesson plan to state rubric codes.", r: "Achieved full accreditation with no revisions." }},
      { id: "ed-4", question: "Tell me about a time you improved student engagement through coordination.", suggestion: "Focus on extracurricular or inter-departmental projects.", idealSTAR: { s: "Student participation in events was at an all-time low.", t: "Increase seminar attendance by 50%.", a: "Coordinated with student unions to gamify attendance.", r: "Attendance grew by 80%." }},
      { id: "ed-5", question: "How do you manage budgets for educational supplies?", suggestion: "Focus on fiscal responsibility and prioritization.", idealSTAR: { s: "Mid-year budget cut of 15%.", t: "Keep essential programs running.", a: "Negotiated new vendor contracts and cut luxury supplies.", r: "Program targets met without staff layoffs." }},
      { id: "ed-6", question: "How do you handle disputes between students and faculty?", suggestion: "Emphasize mediation and institutional policy.", idealSTAR: { s: "A grade dispute that escalated to the Dean.", t: "Resolve fairly while upholding academic integrity.", a: "Mediated a blind re-evaluation of the student's work.", r: "Resolved without further escalation." }},
      { id: "ed-7", question: "What role does technology play in your coordination workflow?", suggestion: "Discuss specific LMS or Project Management tools.", idealSTAR: { s: "Manual tracking led to frequent errors.", t: "Digitize the coordinator's dashboard.", a: "Implemented Airtable for real-time faculty tracking.", r: "Admin time reduced by 10 hours/week." }},
      { id: "ed-8", question: "How do you evaluate the effectiveness of a curriculum?", suggestion: "Discuss assessment metrics and feedback loops.", idealSTAR: { s: "New math curriculum launched.", t: "Determine if it's working better than the old one.", a: "Analyzed test scores vs. the previous 3 years.", r: "Found a 12% increase in comprehension scores." }},
      { id: "ed-9", question: "How do you stay updated with educational trends?", suggestion: "Mention professional development or networking.", idealSTAR: { s: "Post-pandemic shift to hybrid learning.", t: "Pivot the current program to hybrid model.", a: "Attended EdTech summit and trained faculty on Zoom.", r: "High satisfaction rating from hybrid students." }},
      { id: "ed-10", question: "Describe a successful collaboration with an external partner.", suggestion: "Focus on industry or community partnerships.", idealSTAR: { s: "Lack of internship opportunities for seniors.", t: "Secure 5 local corporate partners.", a: "Pitched our curriculum value to local tech firms.", r: "Secured 8 recurring internship placements." }}
    ],
    mockConversation: [
      {
        id: "mt-1",
        aiQuestion: "What is your philosophy on modern curriculum design?",
        userMockAnswer: "I believe it should be student-centered and flexible to adapt to changing standards.",
        suggestion: "Connect philosophy to measurable learning outcomes.",
        idealSTAR: { s: "Outdated passive learning model.", t: "Redesign 3 core modules.", a: "Implemented project-based learning assessments.", r: "Student satisfaction scores rose by 25%." },
        feedback: { overallScore: 70, strengths: ["Modern approach", "Clarity"], weaknesses: ["Needs a specific example"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "mt-2",
        aiQuestion: "How do you use data to inform your decisions?",
        userMockAnswer: "I look at test scores and student feedback surveys every month to find trends.",
        suggestion: "Mention specific analytics tools or LMS reporting features.",
        idealSTAR: { s: "Declining math scores in Q1.", t: "Identify the root cause of the drop.", a: "Performed cohort analysis on digital homework completion.", r: "Intervention led to 15% recovery in Q2." },
        feedback: { overallScore: 85, strengths: ["Metric focused"], weaknesses: ["Could specify tools"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "mt-3",
        aiQuestion: "Tell me about a time you had to lead a difficult team meeting.",
        userMockAnswer: "Last week we had to announce budget cuts. People were upset but I was transparent.",
        suggestion: "Explain exactly how you managed the negative emotions of the faculty.",
        idealSTAR: { s: "Emergency budget meeting.", t: "Announce 15% cuts to department supplies.", a: "Provided a transparent audit of non-essential spending.", r: "Faculty accepted the cuts without formal grievance." },
        feedback: { overallScore: 75, strengths: ["Transparency", "Directness"], weaknesses: ["Needs more detail on mediation"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "mt-4",
        aiQuestion: "How do you manage multiple deadlines simultaneously?",
        userMockAnswer: "I use Trello and prioritize tasks based on their urgency and impact on students.",
        suggestion: "Give an example of a time when two 'High Urgency' tasks overlapped.",
        idealSTAR: { s: "Simultaneous accreditation audit and graduation prep.", t: "Submit 50 compliance docs while coordinating event logistics.", a: "Delegated logistic checks and focused personally on compliance data.", r: "Audit passed and graduation ran smoothly." },
        feedback: { overallScore: 88, strengths: ["Tool usage", "Prioritization logic"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "mt-5",
        aiQuestion: "Where do you see education coordination in 5 years?",
        userMockAnswer: "I think it will be heavily driven by AI and personalized learning paths.",
        suggestion: "Focus on how the human element of coordination evolves alongside AI.",
        idealSTAR: { s: "Shift toward hybrid EdTech models.", t: "Maintain institutional standards in a digital world.", a: "Upskilled staff on AI-proctoring and adaptive learning tech.", r: "Achieved 95% faculty tech-readiness rating." },
        feedback: { overallScore: 80, strengths: ["Future-proof mindset"], weaknesses: ["Specify the role's evolution"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      }
    ]
  },
  {
    slug: "3d-modeler",
    title: "3D Modeler",
    type: "role",
    category: "Creative",
    skills: ["Maya", "ZBrush", "Topology", "PBR Texturing"],
    description: "Asset creation for game engines and high-fidelity cinematic rendering.",
    commonQuestions: [
      { id: "3d-1", question: "How do you optimize a high-poly sculpt for a real-time game engine?", suggestion: "Discuss retopology, baking normals, and LODs.", idealSTAR: { s: "Character sculpt with 20M polygons.", t: "Bake into a 15k tri game-ready asset.", a: "Used manual retopology and high-to-low baking in Marmoset.", r: "Maintained 95% detail at 0.1% the polycount." }},
      { id: "3d-2", question: "What is your workflow for creating realistic textures?", suggestion: "Mention PBR standards and Substance Suite.", idealSTAR: { s: "Photorealistic environment prop (old lamp).", t: "Create textures with realistic wear and tear.", a: "Used anchor points in Substance Painter for procedural rust.", r: "Asset passed first-time review by the Lead Artist." }},
      { id: "3d-3", question: "How do you handle complex topology for characters that need to deform?", suggestion: "Focus on edge flow around joints.", idealSTAR: { s: "Character shoulder deformation was pinching.", t: "Fix topology for a wide range of motion.", a: "Implemented a diamond edge-flow pattern on the deltoids.", r: "Smooth animation deformation achieved." }},
      { id: "3d-4", question: "Describe a time you had to troubleshoot a baking error.", suggestion: "Discuss cages, offsets, and ray-distance.", idealSTAR: { s: "Severe artifacting on a hard-surface bake.", t: "Clean up the normal map without re-sculpting.", a: "Adjusted the cage and softened hard edges on the low-poly.", r: "Perfect bake on the second attempt." }},
      { id: "3d-5", question: "How do you manage your asset library and naming conventions?", suggestion: "Mention pipelines and scalability.", idealSTAR: { s: "Project with 200+ unique assets.", t: "Maintain a searchable and clean library.", a: "Standardized suffix system (_LOD0, _BC, _N).", r: "Reduced asset searching time by 30% for the dev team." }},
      { id: "3d-6", question: "Tell me about a time you missed a polygon budget. How did you fix it?", suggestion: "Focus on optimization and trade-offs.", idealSTAR: { s: "Environment asset was 5k over budget.", t: "Optimized without losing the silhouette.", a: "Dissolved edges in flat areas and reused UV space.", r: "Asset came in 500 tris under budget." }},
      { id: "3d-7", question: "What is your approach to lighting and rendering a portfolio piece?", suggestion: "Discuss 3-point lighting and post-processing.", idealSTAR: { s: "Portfolio piece looked flat and dull.", t: "Enhance visual storytelling through light.", a: "Used rim lighting to pop the silhouette and ACES color space.", r: "Piece was featured on ArtStation Trending." }},
      { id: "3d-8", question: "How do you stay current with software updates (e.g., Blender 4.0)?", suggestion: "Mention community involvement and experimentation.", idealSTAR: { s: "New geometry node workflow introduced.", t: "Speed up environment scattering.", a: "Learned nodes via documentation and applied to a new scene.", r: "Reduced manual placement time by 70%." }},
      { id: "3d-9", question: "Describe working with an Art Director who had a different vision.", suggestion: "Focus on adaptation and professional feedback.", idealSTAR: { s: "AD wanted a more 'stylized' look mid-project.", t: "Pivot textures from realistic to hand-painted.", a: "Adjusted color palettes and exaggerated silhouettes.", r: "AD was highly satisfied with the final pivot." }},
      { id: "3d-10", question: "How do you handle tight deadlines in a production environment?", suggestion: "Mention blocking out and prioritization.", idealSTAR: { s: "Week-long task required in 2 days.", t: "Deliver high-quality props for a vertical slice.", a: "Used kitbashing for secondary details and focused on hero areas.", r: "Delivered on time with full engine integration." }}
    ],
    mockConversation: [
      {
        id: "mc-1",
        aiQuestion: "Which software do you prefer for sculpting and why?",
        userMockAnswer: "ZBrush, because its brush engine handles millions of polys better than anything else.",
        suggestion: "Mention how you integrate ZBrush into a pipeline (e.g., GoZ to Maya).",
        idealSTAR: { s: "Highly detailed character sculpt required.", t: "Sculpt 40 million polygons for high-poly bake.", a: "Used DynaMesh and ZRemesher for optimized workflow.", r: "Asset completed 2 days ahead of schedule." },
        feedback: { overallScore: 88, strengths: ["Technical justification"], weaknesses: ["Missing pipeline context"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "mc-2",
        aiQuestion: "How do you approach UV unwrapping for complex objects?",
        userMockAnswer: "I try to hide seams in natural crevices and keep texel density consistent.",
        suggestion: "Discuss how you handle overlapping UVs or UDIMs for hero assets.",
        idealSTAR: { s: "Hero asset with complex mechanical parts.", t: "Ensure 4k texture clarity without visible seams.", a: "Used RizomUV for automated packing and manual seam placement.", r: "Achieved perfect texel density across 4 UDIMs." },
        feedback: { overallScore: 92, strengths: ["Industry best practices"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "mc-3",
        aiQuestion: "Tell me about a project where you had to use a specific technical constraint.",
        userMockAnswer: "I did a mobile game once where I could only use one 512 texture for a whole car.",
        suggestion: "Explain the 'Trick' used (e.g., mirrored UVs) to maximize that small texture.",
        idealSTAR: { s: "Mobile racing game memory limits.", t: "Fit high-detail car model into 512px texture space.", a: "Used mirrored UV shells and vertex coloring for detail.", r: "Visual quality matched competitors with 1k textures." },
        feedback: { overallScore: 82, strengths: ["Constraint awareness"], weaknesses: ["Explain the technical solution better"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "mc-4",
        aiQuestion: "How do you handle feedback on your work?",
        userMockAnswer: "I take it professionally and usually ask for clear examples if I'm confused.",
        suggestion: "Discuss a specific time feedback led to a better final asset.",
        idealSTAR: { s: "Lead artist requested 'more grit' on a sci-fi prop.", t: "Revise textures to meet art direction.", a: "Used Substance Painter anchor points to proceduralize grime.", r: "Final asset approved and used in marketing trailer." },
        feedback: { overallScore: 85, strengths: ["Maturity", "Communication"], weaknesses: ["Needs a specific success story"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "mc-5",
        aiQuestion: "Why do you want to work for our studio?",
        userMockAnswer: "I love the art style of your last game and I think my sculpting skills fit.",
        suggestion: "Identify a specific technical challenge the studio has (e.g., open world optimization).",
        idealSTAR: { s: "Studio's recent shift to Unreal Engine 5.", t: "Adapt high-poly workflow for Nanite.", a: "Developed a workflow to skip low-poly retopology for hero props.", r: "Proved a 30% reduction in environment asset turnaround." },
        feedback: { overallScore: 78, strengths: ["Style alignment"], weaknesses: ["Lack of technical specificity"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      }
    ]
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    type: "role",
    category: "Business",
    skills: ["Prospecting", "Negotiation", "CRM", "Closing"],
    description: "Focus on value-based selling and exceeding revenue targets.",
    commonQuestions: [
      { id: "sa-1", question: "How do you handle a prospect who says your price is too high?", suggestion: "Pivot to value and ROI.", idealSTAR: { s: "Enterprise lead hesitant over $50k contract.", t: "Overcome the price objection.", a: "Demonstrated 3x ROI through our automation tools.", r: "Closed the deal at full price." }},
      { id: "sa-2", question: "Tell me about your prospecting strategy.", suggestion: "Discuss multi-channel outreach and research.", idealSTAR: { s: "Territory with zero leads.", t: "Build a $1M pipeline.", a: "Used LinkedIn Sales Navigator and cold calling sequences.", r: "Generated 25 qualified meetings in month one." }},
      { id: "sa-3", question: "Describe your most difficult close.", suggestion: "Emphasize persistence and creative problem solving.", idealSTAR: { s: "Legal department blocked a deal for 4 months.", t: "Push the contract through by EOQ.", a: "Worked with our legal team to draft a custom SLA.", r: "Contract signed on the last day of the quarter." }},
      { id: "sa-4", question: "How do you manage your sales pipeline using CRM?", suggestion: "Mention data integrity and forecasting.", idealSTAR: { s: "Messy data was causing lost leads.", t: "Standardize Salesforce usage.", a: "Implemented mandatory field checks and weekly pipeline reviews.", r: "Forecast accuracy increased to 95%." }},
      { id: "sa-5", question: "What is your approach to cold calling?", suggestion: "Focus on the first 10 seconds and the hook.", idealSTAR: { s: "Low response rate on cold outreach.", t: "Increase call-to-meeting conversion.", a: "Switched to a 'problem-first' opening hook.", r: "Conversion rate tripled." }},
      { id: "sa-6", question: "How do you research a prospect before a discovery call?", suggestion: "Mention financial reports, LinkedIn, and pain points.", idealSTAR: { s: "Entering a new vertical (FinTech).", t: "Establish authority in the first call.", a: "Read the prospect's 10-K and identified a security gap.", r: "Lead fast-tracked to the demo stage." }},
      { id: "sa-7", question: "Tell me about a time you lost a deal. What did you learn?", suggestion: "Focus on post-mortem and resilience.", idealSTAR: { s: "Lost a $100k deal to a competitor.", t: "Analyze the failure.", a: "Asked for a candid exit interview with the prospect.", r: "Discovered our UI was the bottleneck; fed back to Product." }},
      { id: "sa-8", question: "How do you build rapport with a high-level executive?", suggestion: "Discuss business acumen and brevity.", idealSTAR: { s: "Meeting with the CEO of a Fortune 500.", t: "Secure a pilot program.", a: "Skipped the fluff and spoke directly to their revenue growth goals.", r: "CEO personally signed the pilot agreement." }},
      { id: "sa-9", question: "What motivates you beyond commission?", suggestion: "Mention competition, problem-solving, or impact.", idealSTAR: { s: "Slow Q3 across the team.", t: "Stay motivated during a slump.", a: "Set personal daily activity goals to maintain momentum.", r: "Ended the quarter as the #1 performer." }},
      { id: "sa-10", question: "How do you handle rejection?", suggestion: "Focus on the 'numbers game' and learning.", idealSTAR: { s: "Got 20 'no's' in a single afternoon.", t: "Maintain energy for the 21st call.", a: "Took a 5-minute break and refined my rebuttal script.", r: "Booked a meeting on the very next call." }}
    ],
    mockConversation: [
      {
        id: "sac-1",
        aiQuestion: "How do you handle a prospect who says your price is too high?",
        userMockAnswer: "I ask them what their budget is and see if I can match it.",
        suggestion: "Never lead with price matching. Defend value by comparing the cost of the problem vs. the price of the fix.",
        idealSTAR: { s: "Mid-market lead stalled on a $20k quote.", t: "Close the deal without discounting.", a: "Quantified that their current manual error rate cost them $100k/year.", r: "Deal closed at full price within 48 hours." },
        feedback: { overallScore: 55, strengths: ["Directness"], weaknesses: ["Immediate discounting", "Low value defense"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "sac-2",
        aiQuestion: "Tell me about your prospecting strategy.",
        userMockAnswer: "I do 50 cold calls and 100 emails every single morning.",
        suggestion: "Quality over quantity. Mention how you research a prospect before hitting 'Send'.",
        idealSTAR: { s: "Entering a saturated market for CRM tools.", t: "Build a $500k pipeline from scratch.", a: "Used 'Hyper-personalization' based on recent news about the leads.", r: "30% meeting-book rate, highest on the team." },
        feedback: { overallScore: 82, strengths: ["Work ethic", "Persistence"], weaknesses: ["Needs more strategic research focus"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "sac-3",
        aiQuestion: "Describe your typical discovery call structure.",
        userMockAnswer: "I ask about their current setup, their pain, and then I show them a demo.",
        suggestion: "Spend 80% of discovery on the 'Impact' of the pain. The demo should only show the fix for that pain.",
        idealSTAR: { s: "Discovery call with a skeptical CTO.", t: "Uncover a deep enough pain to justify a purchase.", a: "Used 'The Gap' technique to compare today vs. the future.", r: "CTO asked for a proposal on the first call." },
        feedback: { overallScore: 88, strengths: ["Logical flow", "Customer centric"], weaknesses: ["Spend more time on 'Why now?'"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "sac-4",
        aiQuestion: "How do you handle gatekeepers?",
        userMockAnswer: "I try to be as polite as possible and ask for the manager.",
        suggestion: "Treat the gatekeeper as a 'Coach'. Give them value so they *want* to help you.",
        idealSTAR: { s: "Receptionist blocked all calls to the HR Director.", t: "Get the HR Director on the phone.", a: "Sent a physical coffee voucher to the receptionist with a hand-written note.", r: "Was put through to the Director the next morning." },
        feedback: { overallScore: 75, strengths: ["Professionalism"], weaknesses: ["Needs a more creative bypass strategy"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "sac-5",
        aiQuestion: "What motivates you beyond the commission check?",
        userMockAnswer: "I love winning and being at the top of the leaderboard.",
        suggestion: "Good. Also mention the satisfaction of solving a business problem for a customer.",
        idealSTAR: { s: "Slow Q4 with team morale low.", t: "Stay productive during a market dip.", a: "Gamified my personal daily activity and focused on closing smaller 'quick wins'.", r: "Finished as the #1 rep for the fiscal year." },
        feedback: { overallScore: 90, strengths: ["Competitive spirit", "Self-starter"], weaknesses: ["None"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "detected" }}
      }
    ]
  },
  {
    slug: "software-engineer",
    title: "Software Engineer",
    type: "role",
    category: "Engineering",
    skills: ["TypeScript", "Node.js", "System Design", "Unit Testing"],
    description: "Building resilient, type-safe, and scalable applications.",
    commonQuestions: [
      { id: "swe-1", question: "How would you optimize a slow-performing database query?", suggestion: "Discuss EXPLAIN ANALYZE, indexing, and caching.", idealSTAR: { s: "Search query taking 5 seconds.", t: "Reduce latency under 200ms.", a: "Added composite index and implemented Redis caching.", r: "Query time reduced to 50ms." }},
      { id: "swe-2", question: "What are the benefits of TypeScript over JavaScript?", suggestion: "Focus on type-safety, maintainability, and DX.", idealSTAR: { s: "Large codebase had frequent runtime errors.", t: "Improve code stability.", a: "Migrated the core modules to TypeScript.", r: "Runtime exceptions dropped by 40%." }},
      { id: "swe-3", question: "Describe a complex bug you solved in production.", suggestion: "Emphasize your debugging process and root cause analysis.", idealSTAR: { s: "Race condition in the payment gateway.", t: "Identify the cause of duplicate charges.", a: "Analyzed logs and added idempotency keys.", r: "Resolved the issue and prevented future duplicates." }},
      { id: "swe-4", question: "How do you approach unit testing in a large project?", suggestion: "Mention test coverage, Jest, and TDD.", idealSTAR: { s: "Feature regressions were common.", t: "Increase confidence in new deployments.", a: "Integrated Jest with Husky for pre-commit testing.", r: "Regression bugs decreased by 60%." }},
      { id: "swe-5", question: "Explain the difference between REST and GraphQL.", suggestion: "Discuss over-fetching, under-fetching, and flexibility.", idealSTAR: { s: "Mobile app was slow due to large API responses.", t: "Reduce data usage for mobile users.", a: "Implemented GraphQL to allow selective data fetching.", r: "Average payload size reduced by 70%." }},
      { id: "swe-6", question: "How do you ensure your code is clean and maintainable?", suggestion: "Discuss SOLID principles and code reviews.", idealSTAR: { s: "Technical debt was slowing down the team.", t: "Standardize code quality.", a: "Introduced ESlint rules and a strict code review rubric.", r: "Onboarding time for new devs reduced by 2 weeks." }},
      { id: "swe-7", question: "Describe your experience with CI/CD pipelines.", suggestion: "Focus on automation and safety checks.", idealSTAR: { s: "Manual deployments were error-prone.", t: "Automate the release process.", a: "Built a GitHub Actions pipeline with automated staging.", r: "Deployment frequency increased from weekly to daily." }},
      { id: "swe-8", question: "How do you handle state management in a large React app?", suggestion: "Discuss Context vs Redux vs Zustand.", idealSTAR: { s: "Prop drilling was making components brittle.", t: "Centralize the application state.", a: "Implemented Zustand for a lightweight global state.", r: "Component re-renders reduced by 25%." }},
      { id: "swe-9", question: "What is your approach to system security?", suggestion: "Mention OAuth, Sanitization, and HTTPS.", idealSTAR: { s: "Security audit found XSS vulnerabilities.", t: "Harden the application against attacks.", a: "Implemented Content Security Policy and input sanitization.", r: "Passed the follow-up audit with zero high-risk items." }},
      { id: "swe-10", question: "How do you balance speed and quality in development?", suggestion: "Discuss MVP approach and technical debt management.", idealSTAR: { s: "Tight deadline for a high-priority feature.", t: "Deliver on time without compromising core stability.", a: "Used feature flags to launch early and iterate.", r: "Launched on time; technical debt was paid off in the next sprint." }}
    ],
    mockConversation: [
      {
        id: "swc-1",
        aiQuestion: "What is your favorite design pattern?",
        userMockAnswer: "I really like the Factory pattern because it makes object creation more flexible.",
        suggestion: "Give an example where you used a Factory to handle complex conditional logic.",
        idealSTAR: { s: "Managing 15 different payment gateway integrations.", t: "Clean up messy conditional instantiation logic.", a: "Implemented a PaymentProcessorFactory.", r: "Reduced controller complexity by 60%." },
        feedback: { overallScore: 85, strengths: ["Technical accuracy"], weaknesses: ["Needs real project example"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "swc-2",
        aiQuestion: "How do you handle disagreements in code reviews?",
        userMockAnswer: "I focus on the code, not the person, and try to refer to style guides.",
        suggestion: "Explain how you resolve architectural disagreements where no style guide exists.",
        idealSTAR: { s: "Conflict over choosing Redux vs. Context.", t: "Resolve to maintain sprint velocity.", a: "Organized a 15-min spike to compare boilerplate and performance.", r: "Team agreed on Context for simplicity; finished on time." },
        feedback: { overallScore: 90, strengths: ["Professionalism"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "swc-3",
        aiQuestion: "Explain 'Closures' in JavaScript.",
        userMockAnswer: "It's when a function remembers the variables from its outer scope.",
        suggestion: "Mention a practical use case, like data privacy or memoization.",
        idealSTAR: { s: "Need to create private counters for a library.", t: "Prevent external modification of internal state.", a: "Used a closure to wrap the state variable.", r: "Achieved secure data encapsulation." },
        feedback: { overallScore: 95, strengths: ["Technical precision"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "swc-4",
        aiQuestion: "Tell me about a time you learned a new technology quickly.",
        userMockAnswer: "I learned Golang in a weekend to help with a backend migration project.",
        suggestion: "Quantify how that fast learning impacted the project's success.",
        idealSTAR: { s: "Critical bottleneck in microservice performance.", t: "Migrate Ruby service to Go.", a: "Studied Go concurrency and rewrote the ingestion engine.", r: "Service latency dropped by 80% within the week." },
        feedback: { overallScore: 88, strengths: ["Initiative", "Adaptability"], weaknesses: ["Quantify the outcome"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "swc-5",
        aiQuestion: "Why should we hire you over other developers?",
        userMockAnswer: "I'm passionate about clean code and I have a proven track record.",
        suggestion: "Speak to this specific company's mission or stack (e.g., 'Your focus on Fintech').",
        idealSTAR: { s: "Hiring for a high-security banking API role.", t: "Ensure zero-defect deployments.", a: "Brought experience in SOC2 compliance and unit testing.", r: "Matched the exact risk-profile of the engineering team." },
        feedback: { overallScore: 75, strengths: ["Confidence"], weaknesses: ["Lack of company specificity"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      }
    ]
  },
  {
    slug: "customer-success-manager",
    title: "Customer Success Manager",
    type: "role",
    category: "Business",
    skills: ["Churn Reduction", "Account Management", "Onboarding", "NPS"],
    description: "Driving long-term value and retention for key client accounts.",
    commonQuestions: [
      { id: "cs-1", question: "How do you manage a high-value customer who is at risk of churning?", suggestion: "Discuss root cause analysis and a success plan.", idealSTAR: { s: "Top-tier client stopped using the platform.", t: "Save the $100k account.", a: "Conducted an executive business review to realign goals.", r: "Contract renewed for 2 more years." }},
      { id: "cs-2", question: "Describe your onboarding process for new clients.", suggestion: "Focus on time-to-value (TTV) and milestones.", idealSTAR: { s: "Onboarding was taking 60 days on average.", t: "Reduce TTV to 30 days.", a: "Created an automated checklist and milestone tracking.", r: "Average onboarding time dropped to 25 days." }},
      { id: "cs-3", question: "How do you handle a customer who demands a feature we don't have?", suggestion: "Focus on the underlying need, not the feature.", idealSTAR: { s: "Client wanted a custom API integration.", t: "Address the need without engineering resources.", a: "Showed them how to achieve the same result using existing webhooks.", r: "Client was happy and became an advocate." }},
      { id: "cs-4", question: "How do you prioritize your time across multiple accounts?", suggestion: "Mention health scores and expansion potential.", idealSTAR: { s: "Managing 50 accounts with high workload.", t: "Ensure high-risk accounts get attention.", a: "Used a health-score dashboard to prioritize daily outreach.", r: "Zero churn in the highest-risk segment." }},
      { id: "cs-5", question: "Tell me about a time you successfully upsold a client.", suggestion: "Focus on identified pain points and expanded value.", idealSTAR: { s: "Client reached their usage limit.", t: "Move them to the enterprise tier.", a: "Pitched the ROI of the higher-tier advanced analytics.", r: "Increased account value by 40%." }},
      { id: "cs-6", question: "What metrics do you track to measure your success?", suggestion: "Mention NRR, Churn, NPS, and CSAT.", idealSTAR: { s: "NPS scores were trending downwards.", t: "Identify the source of dissatisfaction.", a: "Analyzed feedback and found a gap in training docs.", r: "NPS increased from 20 to 45." }},
      { id: "cs-7", question: "How do you deal with a difficult point of contact?", suggestion: "Focus on professionalism and finding common ground.", idealSTAR: { s: "POC was unresponsive to emails.", t: "Get the project back on track.", a: "Reached out to their manager to confirm alignment.", r: "Project resumed and successfully launched." }},
      { id: "cs-8", question: "Describe your approach to an Executive Business Review (EBR).", suggestion: "Focus on outcomes, not activity.", idealSTAR: { s: "EBRs were seen as boring by clients.", t: "Make EBRs a value-add event.", a: "Refocused slides on their specific revenue impact.", r: "100% attendance rate from C-suite clients." }},
      { id: "cs-9", question: "How do you stay calm under pressure with an angry client?", suggestion: "Discuss de-escalation and empathy.", idealSTAR: { s: "System outage affected a major client.", t: "Calm the client and provide updates.", a: "Stayed on the phone for an hour and gave transparent timelines.", r: "Client appreciated the transparency and stayed loyal." }},
      { id: "cs-10", question: "Tell me about your best customer success story.", suggestion: "Focus on transformation and long-term partnership.", idealSTAR: { s: "Client was using the tool for only 10% of its capability.", t: "Drive full adoption.", a: "Implemented a series of tailored training sessions.", r: "Client saved $1M/year using the advanced features." }}
    ],
    mockConversation: [
      {
        id: "csc-1",
        aiQuestion: "How do you manage a high-value customer who is at risk of churning?",
        userMockAnswer: "I set up a call to hear their problems and offer a discount.",
        suggestion: "Focus on the 'Value Gap' rather than the price—discounts don't fix bad product-fit.",
        idealSTAR: { s: "Top account stopped using the platform after a re-org.", t: "Save the $200k ARR account.", a: "Conducted a new discovery session with the new decision makers.", r: "Account renewed and expanded by 10%." },
        feedback: { overallScore: 65, strengths: ["Proactive"], weaknesses: ["Too reliant on discounting"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "csc-2",
        aiQuestion: "What is the most important metric for a CSM?",
        userMockAnswer: "Net Revenue Retention (NRR) because it accounts for both churn and upsells.",
        suggestion: "Also mention 'Time to Value' (TTV) as an early indicator of long-term NRR.",
        idealSTAR: { s: "Company focus on sustainable growth.", t: "Maintain a healthy NRR above 110%.", a: "Identified low-usage accounts and ran proactive training camps.", r: "Ended the year with 120% NRR." },
        feedback: { overallScore: 92, strengths: ["Strategic depth", "Accurate"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "csc-3",
        aiQuestion: "How do you handle a customer who wants a feature that is not on the roadmap?",
        userMockAnswer: "I tell them I'll check with Product, but usually it's a 'no'.",
        suggestion: "Try to understand the 'Job to be Done'—can you solve it with a workaround?",
        idealSTAR: { s: "Large client needed a custom HR integration.", t: "Solve the need without custom dev.", a: "Trained them on our Zapier integration to automate the sync.", r: "Client was happy and became an advocate." },
        feedback: { overallScore: 78, strengths: ["Honesty"], weaknesses: ["Needs better problem-solving creativity"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "csc-4",
        aiQuestion: "How do you prepare for an Executive Business Review (EBR)?",
        userMockAnswer: "I gather usage data and make a deck about how much they used us.",
        suggestion: "Shift from 'usage' (inputs) to 'outcomes' (ROI). Executives care about money saved or made.",
        idealSTAR: { s: "Renewal coming up for a 'silent' client.", t: "Prove value to the CFO.", a: "Analyzed $50k in cost-savings achieved through our platform.", r: "CFO signed a 3-year extension." },
        feedback: { overallScore: 84, strengths: ["Data-driven"], weaknesses: ["Focus more on ROI, less on usage"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "csc-5",
        aiQuestion: "Describe a time you successfully upsold a client.",
        userMockAnswer: "Their team grew from 10 to 50, so I moved them to the Enterprise plan.",
        suggestion: "Explain how you sold the additional *value* of Enterprise, not just the seats.",
        idealSTAR: { s: "Client reached the limits of the Basic tier.", t: "Expand account from $5k to $25k ARR.", a: "Pitched the security and single-sign-on (SSO) value for their growing team.", r: "Successfully closed the expansion in 2 weeks." },
        feedback: { overallScore: 80, strengths: ["Growth focused"], weaknesses: ["Needs a more strategic 'Value' pitch"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "detected" }}
      }
    ]
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    type: "role",
    category: "Management",
    skills: ["Roadmapping", "Prioritization", "User Research", "Agile"],
    description: "Driving the product vision from discovery to delivery.",
    commonQuestions: [
      { id: "pm-1", question: "How do you prioritize a product backlog?", suggestion: "Mention RICE, MoSCoW, or Kano models.", idealSTAR: { s: "Backlog had 200+ unsorted items.", t: "Standardize the prioritization process.", a: "Applied the RICE framework based on data.", r: "Team velocity increased by 20%." }},
      { id: "pm-2", question: "Describe a time a product launch failed. What did you learn?", suggestion: "Focus on ownership and the post-mortem.", idealSTAR: { s: "New feature had 0% adoption after launch.", t: "Understand why it failed.", a: "Conducted post-launch user interviews.", r: "Realized we solved the wrong problem; pivoted in next sprint." }},
      { id: "pm-3", question: "How do you balance stakeholder requests with user needs?", suggestion: "Discuss data-driven decision making and saying 'no'.", idealSTAR: { s: "CEO wanted a feature that users didn't want.", t: "Align the roadmap with actual user value.", a: "Presented user research data to the CEO.", r: "CEO agreed to prioritize the research-backed feature." }},
      { id: "pm-4", question: "How do you define success for a new feature?", suggestion: "Discuss OKRs, KPIs, and measurable outcomes.", idealSTAR: { s: "Launching a new referral program.", t: "Measure if it's worth the dev cost.", a: "Set a target of 10% viral growth rate.", r: "Program achieved 12% growth in 2 months." }},
      { id: "pm-5", question: "Tell me about a time you had to make a decision with incomplete data.", suggestion: "Focus on intuition, small experiments, and iteration.", idealSTAR: { s: "Needed to pick a new market vertical quickly.", t: "Choose between FinTech and HealthTech.", a: "Ran a 1-week landing page test for both.", r: "FinTech had 3x higher CTR; chose FinTech." }},
      { id: "pm-6", question: "How do you handle a team that is behind on their sprint?", suggestion: "Discuss scope cutting and blocker removal.", idealSTAR: { s: "Major release was at risk due to bugs.", t: "Ship on time without compromising quality.", a: "Cut P3 features to focus on core stability.", r: "Released on time with high stability." }},
      { id: "pm-7", question: "What is your approach to user research?", suggestion: "Mention interviews, surveys, and usability testing.", idealSTAR: { s: "Redesigning the dashboard.", t: "Ensure the new UI is actually better.", a: "Conducted 10 moderated usability tests on a Figma prototype.", r: "Identified 3 major friction points before coding." }},
      { id: "pm-8", question: "Describe your experience working with engineering teams.", suggestion: "Focus on respect, clear specs, and being available.", idealSTAR: { s: "Engineers were frustrated with vague PRDs.", t: "Improve developer happiness and output.", a: "Switched to a 'user-story first' PRD template.", r: "Dev team reported 40% less rework." }},
      { id: "pm-9", question: "How do you stay updated with the competitive landscape?", suggestion: "Mention product teardowns and industry news.", idealSTAR: { s: "Competitor launched a key feature we lacked.", t: "Analyze the threat to our market share.", a: "Did a detailed teardown of their UX and price.", r: "Discovered they were targeted at a different segment." }},
      { id: "pm-10", question: "Tell me about your favorite product and why.", suggestion: "Discuss UX, business model, and the problem it solves.", idealSTAR: { s: "Analyzing why Notion is successful.", t: "Explain product market fit.", a: "Focused on their flexibility and community templates.", r: "Provided a deep, structured analysis." }}
    ],
    mockConversation: [
      {
        id: "pmc-1",
        aiQuestion: "How do you prioritize a product backlog?",
        userMockAnswer: "I use RICE score to weigh reach, impact, confidence, and effort.",
        suggestion: "Discuss how you handle 'gut-feeling' requests from executives during this process.",
        idealSTAR: { s: "Backlog had 200+ unsorted feature requests.", t: "Create a data-backed roadmap.", a: "Implemented RICE and held bi-weekly stakeholder reviews.", r: "Engineering throughput on high-impact tasks increased by 30%." },
        feedback: { overallScore: 92, strengths: ["Framework-driven", "Logical"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "pmc-2",
        aiQuestion: "Describe a time a product launch failed. What did you learn?",
        userMockAnswer: "We launched a dark mode but nobody used it because we didn't market it well.",
        suggestion: "Focus on the discovery phase—was it a marketing failure or a 'wrong problem' failure?",
        idealSTAR: { s: "Launch of 'Smart Analytics' had zero adoption.", t: "Identify the cause of post-launch failure.", a: "Ran a loss-analysis survey and found the UI was too complex.", r: "Pivoted to a 'Simple View' which reached 60% adoption." },
        feedback: { overallScore: 75, strengths: ["Ownership", "Honesty"], weaknesses: ["Analysis was a bit shallow"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "pmc-3",
        aiQuestion: "How do you define an MVP for a new feature?",
        userMockAnswer: "The smallest set of features that solves the core problem for the user.",
        suggestion: "Mention the 'Minimum Lovable Product'—it should be small but also high quality.",
        idealSTAR: { s: "Need to enter the meal-delivery market in 4 weeks.", t: "Define the core launch experience.", a: "Stripped all filters except location and price for the MVP.", r: "Launched on time with 1,000 successful orders in Week 1." },
        feedback: { overallScore: 85, strengths: ["Correct definition", "User focus"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "pmc-4",
        aiQuestion: "How do you handle a stakeholder who demands a feature not on the roadmap?",
        userMockAnswer: "I show them the data and explain why other things are more important.",
        suggestion: "Focus on the 'Yes, and...' or 'Not now, because...' technique to maintain relationships.",
        idealSTAR: { s: "CEO requested a crypto-integration mid-sprint.", t: "Protect the team from scope creep while respecting leadership.", a: "Showed the RICE impact on our current 'Retention' goal.", r: "CEO agreed to move crypto to next year's discovery phase." },
        feedback: { overallScore: 88, strengths: ["Data-driven", "Firm"], weaknesses: ["Could be softer on diplomacy"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "detected" }}
      },
      {
        id: "pmc-5",
        aiQuestion: "What is your approach to user research?",
        userMockAnswer: "I look at Mixpanel data and talk to five users every week.",
        suggestion: "Mention how you synthesize qualitative talk with quantitative data.",
        idealSTAR: { s: "High churn on the signup page.", t: "Understand why users drop off at Step 2.", a: "Watched 50 FullStory sessions and interviewed 3 churned users.", r: "Found a bug in the 'Verify Email' button; fixing it cut churn by 15%." },
        feedback: { overallScore: 80, strengths: ["Hands-on", "Consistent"], weaknesses: ["Be more specific about the synthesis"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      }
    ]
  },
  {
    slug: "system-design",
    title: "System Design",
    type: "topic",
    category: "Technical",
    skills: ["Scalability", "Load Balancing", "Microservices", "Caching"],
    description: "Architecting highly available and scalable distributed systems.",
    commonQuestions: [
      { id: "sd-1", question: "How would you design a URL shortener like Bitly?", suggestion: "Focus on hashing, DB choice, and redirection.", idealSTAR: { s: "Need to handle millions of redirects/sec.", t: "Design a low-latency service.", a: "Used Base62 encoding and a Redis write-through cache.", r: "Redirection latency under 10ms." }},
      { id: "sd-2", question: "Explain the CAP theorem.", suggestion: "Discuss Consistency, Availability, and Partition Tolerance.", idealSTAR: { s: "Choosing a DB for a global bank vs a social media app.", t: "Balance data integrity vs speed.", a: "Chose CP for banking and AP for social feed.", r: "Ensured system correctness for specific use cases." }},
      { id: "sd-3", question: "How do you handle horizontal scaling for a relational database?", suggestion: "Mention Sharding, Read Replicas, and Federation.", idealSTAR: { s: "Single DB instance hitting 90% CPU.", t: "Scale database performance.", a: "Implemented read-replicas for 80% of the traffic.", r: "CPU usage dropped to 40%." }},
      { id: "sd-4", question: "What is a Content Delivery Network (CDN) and why use one?", suggestion: "Discuss latency, caching at the edge, and static assets.", idealSTAR: { s: "Users in Asia experiencing 2s load times.", t: "Reduce global latency.", a: "Implemented CloudFront to cache assets near users.", r: "Global load times dropped by 50%." }},
      { id: "sd-5", question: "How do you design for high availability?", suggestion: "Discuss redundancy, failover, and multi-region deployments.", idealSTAR: { s: "Regional outage caused total downtime.", t: "Ensure 99.99% uptime.", a: "Implemented multi-region active-active deployment.", r: "System stayed online during the next outage." }},
      { id: "sd-6", question: "Describe a microservices architecture. What are the pros and cons?", suggestion: "Focus on decoupled scaling vs operational complexity.", idealSTAR: { s: "Monolith deployment was taking 2 hours.", t: "Increase development velocity.", a: "Broke the monolith into 5 core services.", r: "Release time dropped to 10 minutes." }},
      { id: "sd-7", question: "How do you manage sessions in a distributed environment?", suggestion: "Mention Redis, JWT, and Sticky Sessions.", idealSTAR: { s: "Users getting logged out when servers scaled.", t: "Maintain session persistence.", a: "Stored sessions in a centralized Redis cluster.", r: "Seamless experience during scaling events." }},
      { id: "sd-8", question: "What is a Message Queue and when should you use one?", suggestion: "Discuss asynchronous processing and decoupling.", idealSTAR: { s: "Order processing was slowing down the UI.", t: "Move processing to the background.", a: "Used RabbitMQ to handle orders asynchronously.", r: "UI response time dropped to 50ms." }},
      { id: "sd-9", question: "Explain the difference between SQL and NoSQL.", suggestion: "Focus on schema flexibility vs relational integrity.", idealSTAR: { s: "Storing unstructured social media posts.", t: "Choose an efficient storage engine.", a: "Selected MongoDB for its flexible document schema.", r: "Developer velocity increased for new features." }},
      { id: "sd-10", question: "How do you prevent 'Double Spending' in a payment system?", suggestion: "Discuss Idempotency keys and database transactions.", idealSTAR: { s: "Network retries causing duplicate payments.", t: "Ensure exactly-once processing.", a: "Implemented unique idempotency keys on every transaction.", r: "Duplicate charges dropped to zero." }}
    ],
    mockConversation: [
      {
        id: "sdc-1",
        aiQuestion: "What happens when you type 'google.com' in the browser?",
        userMockAnswer: "DNS finds the IP, then a TCP connection is made, and the browser gets the HTML.",
        suggestion: "Mention Load Balancers, TLS Handshake, and CDN edge caching.",
        idealSTAR: { s: "User requesting a static asset globally.", t: "Minimize Time-to-First-Byte.", a: "DNS resolution -> CDN Edge -> Origin failover logic.", r: "Optimized delivery under 100ms." },
        feedback: { overallScore: 80, strengths: ["Accurate flow"], weaknesses: ["Missing edge details"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "sdc-2",
        aiQuestion: "How do you choose between Redis and Memcached?",
        userMockAnswer: "Redis if you need data types and persistence, Memcached for simple key-value.",
        suggestion: "Explain how Redis persistence (RDB/AOF) affects performance.",
        idealSTAR: { s: "Need to cache a session with 10 complex fields.", t: "Choose a cache for high-frequency writes.", a: "Used Redis Hashes to avoid full string re-writes.", r: "Reduced network overhead by 40%." },
        feedback: { overallScore: 90, strengths: ["Theory knowledge"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "sdc-3",
        aiQuestion: "Tell me about a time you solved a bottleneck.",
        userMockAnswer: "I noticed the API was slow, so I added a cache to the most used endpoint.",
        suggestion: "Explain exactly how you identified the bottleneck (e.g., using Datadog).",
        idealSTAR: { s: "P99 latency spiked to 2 seconds during peak hours.", t: "Identify the slow component.", a: "Used distributed tracing to find a missing index in the DB.", r: "Latency returned to 150ms after indexing." },
        feedback: { overallScore: 78, strengths: ["Pragmatic approach"], weaknesses: ["Explain the investigation process"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "missing" }}
      },
      {
        id: "sdc-4",
        aiQuestion: "What is an API Gateway?",
        userMockAnswer: "It's the single entry point that handles routing, auth, and rate limiting.",
        suggestion: "Discuss how an API Gateway helps in a microservice circuit-breaking scenario.",
        idealSTAR: { s: "Downstream service failing under load.", t: "Prevent cascading failures.", a: "Implemented rate-limiting at the Gateway level.", r: "Core services remained stable during traffic burst." },
        feedback: { overallScore: 92, strengths: ["Comprehensive definition"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "sdc-5",
        aiQuestion: "Why is eventual consistency used in distributed systems?",
        userMockAnswer: "Because it's impossible to have total consistency and high availability at the same time.",
        suggestion: "Refer to the CAP Theorem by name and explain the trade-offs.",
        idealSTAR: { s: "Scaling a global social media feed.", t: "Handle high write-volume.", a: "Accepted eventual consistency in the feed for 100% availability.", r: "System handled 1M updates/sec without downtime." },
        feedback: { overallScore: 88, strengths: ["Conceptual understanding"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      }
    ]
  },
  {
    slug: "react-hooks-deep-dive",
    title: "React Hooks Deep-Dive",
    type: "topic",
    category: "Technical",
    skills: ["React", "Performance", "Clean Code"],
    description: "Mastering the power and pitfalls of React's functional components.",
    commonQuestions: [
      { id: "rh-1", question: "Explain the rules of Hooks.", suggestion: "Only at top level, only in React functions.", idealSTAR: { s: "Bug caused by a hook inside an if-statement.", t: "Fix the inconsistent render order.", a: "Moved the hook to the top level.", r: "Stable component behavior restored." }},
      { id: "rh-2", question: "What is the difference between useMemo and useCallback?", suggestion: "Memo for values, Callback for functions.", idealSTAR: { s: "Expensive calculation running on every render.", t: "Optimize performance.", a: "Wrapped the calculation in useMemo.", r: "Re-render time dropped from 100ms to 2ms." }},
      { id: "rh-3", question: "How do you handle side effects in functional components?", suggestion: "Discuss the useEffect cleanup function.", idealSTAR: { s: "Memory leak from an event listener.", t: "Clean up resources.", a: "Added return function to useEffect.", r: "Memory usage stabilized." }},
      { id: "rh-4", question: "When should you use the useReducer hook?", suggestion: "Complex state logic with multiple sub-values.", idealSTAR: { s: "Form with 10+ states was getting messy.", t: "Simplify state management.", a: "Migrated to useReducer.", r: "Reduced component lines by 40%." }},
      { id: "rh-5", question: "What is the use of the useRef hook?", suggestion: "Persisting values between renders without re-rendering.", idealSTAR: { s: "Need to focus an input on mount.", t: "Interact with the DOM directly.", a: "Used useRef and useEffect to call .focus().", r: "Smoother UX for the user." }},
      { id: "rh-6", question: "Explain the dependency array in useEffect.", suggestion: "Discuss shallow equality and stable references.", idealSTAR: { s: "Infinite loop in a fetch effect.", t: "Fix the dependency tracking.", a: "Added the ID to the dependency array.", r: "Data fetched exactly once per ID change." }},
      { id: "rh-7", question: "How do you create a custom hook?", suggestion: "Encapsulating logic that uses other hooks.", idealSTAR: { s: "Fetch logic repeated in 5 components.", t: "Reduce code duplication.", a: "Created a useFetch custom hook.", r: "Centralized logic and cleaner components." }},
      { id: "rh-8", question: "What is the benefit of the useLayoutEffect hook?", suggestion: "Reading DOM layout before the browser paints.", idealSTAR: { s: "Tool tip was flickering on mount.", t: "Position tooltip before it's visible.", a: "Used useLayoutEffect for position calculation.", r: "Visual flicker eliminated." }},
      { id: "rh-9", question: "How do you optimize a large list of components in React?", suggestion: "Mention React.memo and virtualized lists.", idealSTAR: { s: "List of 1000 items was laggy to scroll.", t: "Achieve 60fps performance.", a: "Used React.memo and a virtualized list library.", r: "Scroll performance became buttery smooth." }},
      { id: "rh-10", question: "Explain the 'stale closure' problem with hooks.", suggestion: "Discuss how hooks capture variables from the render scope.", idealSTAR: { s: "Counter was not updating correctly in a timeout.", t: "Ensure the latest state is accessed.", a: "Used the functional update pattern (prev => prev + 1).", r: "Correct counter behavior." }}
    ],
    mockConversation: [
      {
        id: "rhc-1",
        aiQuestion: "Why can't hooks be called inside loops or conditions?",
        userMockAnswer: "Because React relies on the call order to keep track of state.",
        suggestion: "Explain that React uses an internal array of 'memory cells' based on execution order.",
        idealSTAR: { s: "Inconsistent state updates in a dynamic list.", t: "Fix a bug where the wrong state was returned.", a: "Audited hook placement and enforced the 'Top Level' rule.", r: "Eliminated hook order violations across the app." },
        feedback: { overallScore: 95, strengths: ["Internals awareness", "Accurate"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "rhc-2",
        aiQuestion: "Tell me about a custom hook you built.",
        userMockAnswer: "I built useLocalStorage to sync state with the browser's storage.",
        suggestion: "Discuss how you handled server-side rendering (SSR) compatibility in that hook.",
        idealSTAR: { s: "Form data loss on page refresh.", t: "Persist draft state locally.", a: "Extracted logic into useLocalStorage with a generic type.", r: "User retention for multi-step forms increased by 40%." },
        feedback: { overallScore: 90, strengths: ["Abstraction skill", "Practical"], weaknesses: ["None"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "detected" }}
      },
      {
        id: "rhc-3",
        aiQuestion: "When would you prefer useMemo over just calculating a value in-line?",
        userMockAnswer: "When I have a really expensive calculation that shouldn't run every render.",
        suggestion: "Mention that useMemo is also critical for maintaining referential integrity for child components.",
        idealSTAR: { s: "Laggy UI when filtering 5,000 table rows.", t: "Optimize computation time.", a: "Wrapped the filter logic in useMemo with proper dependencies.", r: "Filter latency dropped from 150ms to 5ms." },
        feedback: { overallScore: 82, strengths: ["Performance awareness"], weaknesses: ["Missing referential integrity context"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "rhc-4",
        aiQuestion: "How do you handle stale closures in useEffect?",
        userMockAnswer: "I use the functional update pattern for my state setters.",
        suggestion: "Also mention the use of the 'latest' ref pattern if functional updates aren't enough.",
        idealSTAR: { s: "Counter was lagging behind in a setInterval callback.", t: "Ensure current state is accessed in the closure.", a: "Used setCount(prev => prev + 1) instead of setCount(count + 1).", r: "Reliable real-time updates for the timer." },
        feedback: { overallScore: 88, strengths: ["Correct fix", "Technical clarity"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "rhc-5",
        aiQuestion: "What is the primary difference between useEffect and useLayoutEffect?",
        userMockAnswer: "useLayoutEffect runs before the screen paints, useAfterEffect runs after.",
        suggestion: "Give a specific example of when useLayoutEffect is necessary (e.g., measuring DOM nodes).",
        idealSTAR: { s: "Modal was jumping slightly after appearing.", t: "Prevent visual flickering on mount.", a: "Switched measurement logic to useLayoutEffect.", r: "Seamless, flicker-free modal positioning." },
        feedback: { overallScore: 78, strengths: ["Timing awareness"], weaknesses: ["Needs concrete use-case example"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      }
    ]
  },
  {
    slug: "behavioral-star",
    title: "Behavioral (STAR)",
    type: "topic",
    category: "Soft Skills",
    skills: ["Communication", "Leadership", "Conflict Resolution"],
    description: "Mastering the art of telling compelling and structured professional stories.",
    commonQuestions: [
      { id: "bh-1", question: "Tell me about a time you failed.", suggestion: "Focus on ownership, the lesson, and the bounce back.", idealSTAR: { s: "Missed a project deadline by 3 days.", t: "Manage the fallout and learn.", a: "Apologized early and worked overtime to finish.", r: "Learned to build in 20% buffer for future tasks." }},
      { id: "bh-2", question: "Describe a conflict you had with a co-worker.", suggestion: "Focus on the professional resolution, not the gossip.", idealSTAR: { s: "Disagreed on the tech stack for a new project.", t: "Resolve without damaging the relationship.", a: "Created a pros/cons doc and had a neutral discussion.", r: "Agreed on a hybrid approach; project succeeded." }},
      { id: "bh-3", question: "Tell me about your greatest professional achievement.", suggestion: "Pick something with a measurable business impact.", idealSTAR: { s: "Company was losing $10k/mo on bad leads.", t: "Fix the lead quality problem.", a: "Implemented a new vetting script for the sales team.", r: "Losses stopped and revenue increased by $50k." }},
      { id: "bh-4", question: "How do you handle working under a tight deadline?", suggestion: "Focus on prioritization and communication.", idealSTAR: { s: "Final project due in 24 hours.", t: "Deliver quality work on time.", a: "Broke the task into 1-hour sprints and focused.", r: "Submitted on time with zero errors." }},
      { id: "bh-5", question: "Describe a time you showed initiative.", suggestion: "Focus on seeing a problem and fixing it without being asked.", idealSTAR: { s: "Notice that customer onboarding was confusing.", t: "Improve the user experience.", a: "Wrote a set of 'Quick Start' guides on my own time.", r: "Support tickets for new users dropped by 30%." }},
      { id: "bh-6", question: "Tell me about a time you had to deliver bad news.", suggestion: "Focus on transparency and the solution.", idealSTAR: { s: "Project was going to be delayed by a month.", t: "Inform the client.", a: "Told them immediately and offered a discount on the next phase.", r: "Client appreciated the honesty and stayed." }},
      { id: "bh-7", question: "How do you handle a situation where you don't have enough information?", suggestion: "Discuss research and asking for help.", idealSTAR: { s: "Asked to build a feature without specs.", t: "Understand the requirements.", a: "Set up a 30-min meeting with the PM and asked 5 key questions.", r: "Feature built correctly on the first try." }},
      { id: "bh-8", question: "Describe a time you went above and beyond for a client.", suggestion: "Focus on the extra mile and the relationship.", idealSTAR: { s: "Client's site went down on a Saturday.", t: "Get it back up immediately.", a: "Logged on voluntarily and fixed the DNS issue.", r: "Client signed a 5-year renewal the next week." }},
      { id: "bh-9", question: "Tell me about a time you disagreed with your manager.", suggestion: "Focus on the professional disagreement and the outcome.", idealSTAR: { s: "Manager wanted to use a risky vendor.", t: "Protect the project stability.", a: "Presented a risk-analysis report comparing options.", r: "Manager agreed and we chose the safer vendor." }},
      { id: "bh-10", question: "How do you handle feedback you disagree with?", suggestion: "Focus on active listening and asking for clarification.", idealSTAR: { s: "Told my code was 'too complex' in a review.", t: "Understand the reviewer's perspective.", a: "Asked for a specific refactoring example.", r: "Realized they were right and simplified the logic." }}
    ],
    mockConversation: [
      {
        id: "bhc-1",
        aiQuestion: "Why should we hire you?",
        userMockAnswer: "I'm a hard worker and I really like this company.",
        suggestion: "Align your specific past results with this company's current goals.",
        idealSTAR: { s: "Company looking for a proactive growth engineer.", t: "Fill a gap in account management efficiency.", a: "Automated the lead-vetting process at my last role.", r: "Saved 20 hours of manual work per week." },
        feedback: { overallScore: 50, strengths: ["Enthusiasm"], weaknesses: ["Too generic", "Lack of evidence"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "bhc-2",
        aiQuestion: "What is your biggest weakness?",
        userMockAnswer: "I used to be bad at public speaking, so I joined Toastmasters.",
        suggestion: "Explain how overcoming this weakness has improved your current work.",
        idealSTAR: { s: "Fear of presenting to senior stakeholders.", t: "Present a complex roadmap to the CEO.", a: "Practiced via Toastmasters and internal lunch-and-learns.", r: "CEO approved the roadmap with no friction." },
        feedback: { overallScore: 85, strengths: ["Growth mindset", "Action-oriented"], weaknesses: ["Connect back to current value"], starAnalysis: { s: "detected", t: "detected", a: "detected", r: "detected" }}
      },
      {
        id: "bhc-3",
        aiQuestion: "Where do you see yourself in 5 years?",
        userMockAnswer: "I hope to be a Lead Developer here helping younger devs.",
        suggestion: "Be more specific about the impact you want to have on the company's tech stack.",
        idealSTAR: { s: "Growing junior talent pool in the company.", t: "Elevate the engineering culture.", a: "Mentored 3 juniors to mid-level in 12 months.", r: "Became the go-to lead for the Core API team." },
        feedback: { overallScore: 80, strengths: ["Ambition", "Loyalty"], weaknesses: ["None"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      },
      {
        id: "bhc-4",
        aiQuestion: "Tell me about your teamwork style.",
        userMockAnswer: "I like to collaborate and make sure everyone's voice is heard.",
        suggestion: "Give an example of a time your collaborative style resolved a team block.",
        idealSTAR: { s: "Design and Dev teams were misaligned on a feature.", t: "Bring both teams to a consensus.", a: "Facilitated a co-creation workshop to sync requirements.", r: "Feature launched on time with 0 design-to-dev debt." },
        feedback: { overallScore: 75, strengths: ["Inclusive"], weaknesses: ["Needs a specific example"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "missing" }}
      },
      {
        id: "bhc-5",
        aiQuestion: "What makes you a good leader?",
        userMockAnswer: "I lead by example and I'm always available to help my team.",
        suggestion: "Describe how you handle a low-performing team member.",
        idealSTAR: { s: "Direct report was missing performance targets.", t: "Improve their output to meet team goals.", a: "Created a 4-week PIP focusing on pair programming.", r: "Employee returned to 100% capacity and stayed with the firm." },
        feedback: { overallScore: 82, strengths: ["Empathy", "Accessibility"], weaknesses: ["Mention strategic leadership"], starAnalysis: { s: "missing", t: "missing", a: "detected", r: "detected" }}
      }
    ]
  }
];