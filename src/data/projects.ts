import wesalCover from "../assets/projects/wesal/cover.png";
import wesalHalls from "../assets/projects/wesal/halls.png";
import wesalDetail from "../assets/projects/wesal/detail.png";
import wesalAssistant from "../assets/projects/wesal/assistant.png";
import siteawareCover from "../assets/projects/siteaware/cover.png";
import siteawareDashboard from "../assets/projects/siteaware/dashboard.png";
import ncrpCover from "../assets/projects/ncrp/cover.png";
import ncrpDashboard from "../assets/projects/ncrp/dashboard.png";
import ncrpPlanning from "../assets/projects/ncrp/planning.png";
import ncrpPlanning2 from "../assets/projects/ncrp/planning-2.png";
import ncrpAnalytics from "../assets/projects/ncrp/analytics.png";
import ncrpRegister from "../assets/projects/ncrp/register.png";
import ncrpCitizen from "../assets/projects/ncrp/citizen.png";
import bipCover from "../assets/projects/backend-interview-pass/cover.png";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  description: string;
  longIntro: string;
  technologies: string[];
  image: string;
  coverAlt: string;
  gallery: ProjectImage[];
  problem: string[];
  solution: string[];
  role: string;
  contributions: string[];
  features: string[];
  architecture: { title: string; text: string }[];
  flow: string[];
  github: string;
  demo?: string;
  accent: string;
}

export const projects: Project[] = [
  {
    slug: "wesal",
    index: "01",
    title: "Wesal",
    category: "Wedding Hall Booking Platform",
    description:
      "A full-stack wedding hall booking platform connecting users with wedding halls through search, availability, booking, ratings, comments, and AI-assisted features.",
    longIntro:
      "Wesal (وصال) is a bilingual booking marketplace for wedding halls: visitors discover halls by region, compare availability windows, book, rate and comment — while an AI assistant (مبروك) answers questions and helps shortlist venues. My work centered on the backend that makes all of that trustworthy.",
    technologies: [".NET", "ASP.NET Core", "EF Core", "PostgreSQL", "JWT", "AI", "MCP"],
    image: wesalCover,
    coverAlt: "Wesal homepage — wedding hall booking hero with search",
    gallery: [
      { src: wesalCover, alt: "Wesal homepage hero with hall imagery and booking search", caption: "Homepage — discovery-first hero with availability search" },
      { src: wesalHalls, alt: "Wesal featured halls listing with ratings, capacity and pricing", caption: "Halls listing — ratings, capacity, pricing and booking state" },
      { src: wesalDetail, alt: "Wesal hall detail view with gallery, ratings and comments", caption: "Hall detail — gallery, ratings, comments and booking actions" },
      { src: wesalAssistant, alt: "Wesal AI assistant helping a visitor choose a hall", caption: "AI assistant — guided shortlisting over live hall data" },
    ],
    problem: [
      "Finding and booking a wedding hall meant scattered phone calls and visits, with no single place to compare availability, pricing, capacity and real reviews.",
      "Hall owners had no structured way to publish availability windows, receive bookings, or build trust through ratings and comments.",
    ],
    solution: [
      "A central platform where halls are searchable by region with live availability state, transparent pricing, and verified ratings and comments.",
      "A booking flow backed by server-side availability checks so double-bookings are rejected by the API, not discovered at the venue.",
      "An AI assistant grounded in the platform's own hall data that helps visitors shortlist instead of endlessly scrolling.",
    ],
    role: "Backend developer — API, data model and booking logic",
    contributions: [
      "Designed REST endpoints for halls, availability, bookings, ratings and comments in ASP.NET Core.",
      "Modelled the domain with EF Core on PostgreSQL — halls, availability windows, bookings, reviews — with server-side validation of overlapping bookings.",
      "Implemented JWT authentication and authorization separating visitors, hall owners and administration.",
      "Built the ratings/comments subsystem including validation, moderation-friendly states and aggregated scores.",
      "Integrated AI-assisted features over live platform data via an MCP-style assistant layer.",
    ],
    features: [
      "Search and filter halls by region",
      "Live availability and booking flow",
      "Ratings and threaded comments",
      "Hall detail pages with galleries",
      "AI assistant for shortlisting",
      "Bilingual Arabic / English UI",
    ],
    architecture: [
      { title: "API", text: "ASP.NET Core Web API organized by resource — halls, bookings, reviews — with DTOs, validation and Swagger documentation." },
      { title: "Data", text: "EF Core over PostgreSQL. Availability is a first-class entity so the booking endpoint can atomically verify and reserve a window." },
      { title: "Auth", text: "JWT bearer tokens with role checks (visitor / owner / admin) guarding booking, publishing and moderation actions." },
      { title: "AI layer", text: "Assistant queries are resolved against the same hall/availability data the UI reads, so answers stay consistent with what can actually be booked." },
    ],
    flow: ["CLIENT", "API /v1", "SERVICES · booking · review · AI", "POSTGRESQL"],
    github: "",
    accent: "#b4636a",
  },
  {
    slug: "siteaware",
    index: "02",
    title: "SiteAware",
    category: "AI Application Intelligence Layer",
    description:
      "An AI-powered application intelligence system that observes web applications, understands their structure, discovers interaction paths, and provides intelligent assistance.",
    longIntro:
      "SiteAware sits alongside any web application and acts as its intelligence layer: it reads the live DOM and ARIA structure, maps where a user is and what they can do next, and answers questions or guides them there. It ships as a floating assistant panel plus a backend analysis service.",
    technologies: ["TypeScript", "React", "FastAPI", "AI", "DOM", "ARIA", "Gemini"],
    image: siteawareCover,
    coverAlt: "SiteAware assistant panel observing a university student portal",
    gallery: [
      { src: siteawareCover, alt: "SiteAware assistant explaining the current page of a student portal", caption: "Observation mode — explains the current page from live DOM + ARIA" },
      { src: siteawareDashboard, alt: "SiteAware assistant guiding a user through a training dashboard", caption: "Guidance mode — step-by-step paths to the right screen" },
    ],
    problem: [
      "Web applications — portals, dashboards, LMS tools — are dense. Users know what they want ('where are my grades?') but not which menu, tab or form leads there.",
      "Static help docs go stale the moment the UI changes, and generic chatbots hallucinate paths that don't exist in the actual interface.",
    ],
    solution: [
      "Observe the real, live application structure (DOM + ARIA roles) at question time, so answers reference elements that genuinely exist on screen.",
      "Discover interaction paths — the sequence of navigation steps to reach a goal — and present them as actionable cards linked to the current page.",
      "Keep a knowledge layer per application so repeated questions get faster, cited answers instead of guesses.",
    ],
    role: "Backend / AI systems — analysis service and assistance API",
    contributions: [
      "Built the FastAPI analysis service that receives page snapshots and returns structured understanding: page purpose, key actions, navigation targets.",
      "Designed the DOM/ARIA extraction contract so the client sends compact, privacy-aware snapshots instead of raw HTML dumps.",
      "Integrated Gemini for page explanation, path discovery and grounded Q&A with citations to observed elements.",
      "Implemented session, knowledge-base and feedback endpoints so the assistant improves per application over time.",
    ],
    features: [
      "Live page observation (DOM + ARIA)",
      "Natural-language Q&A about the current screen",
      "Interaction-path discovery with action cards",
      "Per-application knowledge base",
      "Confidence + source citations on answers",
      "Floating panel embeddable in any web app",
    ],
    architecture: [
      { title: "Observe", text: "A lightweight client collector serializes visible structure — roles, labels, landmarks — into a compact snapshot." },
      { title: "Understand", text: "FastAPI endpoints normalize the snapshot, resolve the current page and candidate actions, then call Gemini with strict grounding instructions." },
      { title: "Assist", text: "Responses return as structured cards (answer, confidence, sources, next-step actions) rendered by the React panel." },
    ],
    flow: ["WEB APP", "COLLECTOR · DOM/ARIA", "FASTAPI · Gemini", "KNOWLEDGE BASE"],
    github: "",
    accent: "#2f6fed",
  },
  {
    slug: "ncrp",
    index: "03",
    title: "NCRP",
    category: "Needs & Resource Coordination Platform",
    description:
      "A unified platform connecting institutions, citizens, and decision-makers to transform needs data into coordinated, equitable, and measurable resource distribution.",
    longIntro:
      "NCRP (نقطة — relief coordination hub) coordinates aid distribution: institutions publish distribution plans with sector, quantity and time windows; citizens register once and track their requests; administrators see coverage gaps across districts on a live sector map and approve plans without duplication.",
    technologies: [],
    image: ncrpCover,
    coverAlt: "NCRP landing — relief coordination hub entry for institutions, citizens and admins",
    gallery: [
      { src: ncrpCover, alt: "NCRP landing page with entry paths for institutions, citizens and admins", caption: "Entry hub — three guided paths, one coordination backend" },
      { src: ncrpDashboard, alt: "NCRP institution dashboard with distribution stats and planning tools", caption: "Institution workspace — plans, registrations, attendance" },
      { src: ncrpPlanning, alt: "NCRP distribution plan builder with duplicate detection", caption: "Plan builder — validates sector, window and capacity before approval" },
      { src: ncrpPlanning2, alt: "NCRP approved plan confirmation with updated sector map", caption: "Approval — sector map updates the moment a plan is confirmed" },
      { src: ncrpAnalytics, alt: "NCRP coupon statistics per plan table", caption: "Accountability — per-plan coupon ledger (registered / attended / delivered)" },
      { src: ncrpRegister, alt: "NCRP citizen registration form", caption: "Citizen onboarding — minimal data, immediate eligibility view" },
      { src: ncrpCitizen, alt: "NCRP citizen file with nearby distributions and request state", caption: "Citizen file — nearby distributions and live request state" },
    ],
    problem: [
      "Relief distribution suffers from duplication and blind spots: multiple institutions serve the same district while others go uncovered, with no shared picture of who received what.",
      "Citizens face repeated registrations and unclear eligibility, while decision-makers lack measurable data on coverage gaps.",
    ],
    solution: [
      "One coordination backend where every distribution plan declares sector, aid type, quantity and time window — checked against existing plans before approval.",
      "A single citizen file: register once, see nearby approved distributions, request, confirm attendance and track delivery.",
      "A live sector map (served / critical-gap states) plus per-plan coupon ledgers so administrators can measure equity, not assume it.",
    ],
    role: "Full-stack contributor — planning, registration and coordination flows",
    contributions: [
      "Built institution planning flows: plan creation with sector/time validation and duplicate detection within short windows.",
      "Implemented citizen registration and file views — identity, household, district, request state — with clear eligibility messaging.",
      "Developed dashboard analytics: per-plan coupon tables, attendance confirmation and delivery states.",
      "Worked on the coverage model behind the sector map so approvals immediately reflect in district states.",
    ],
    features: [
      "Institution / citizen / admin workspaces",
      "Distribution plan builder with validation",
      "Duplicate-plan detection",
      "Live sector coverage map",
      "Per-plan coupon ledger",
      "Attendance and delivery confirmation",
      "Arabic-first RTL interface",
    ],
    architecture: [
      { title: "Clients", text: "Three role-scoped workspaces (institution, citizen, admin) sharing one design system and session model." },
      { title: "Coordination rules", text: "Plan approval runs invariant checks — same sector and overlapping window — before anything is published to citizens." },
      { title: "Ledger", text: "Coupons move through explicit states (registered → attended → delivered) so every number on a dashboard traces to individual records." },
    ],
    flow: ["CLIENTS ×3", "API · plans · files · ledger", "RULES · dedupe · eligibility", "DATABASE"],
    github: "",
    accent: "#0e7c86",
  },
  {
    slug: "backendinterviewpass",
    index: "04",
    title: "BackendInterviewPass",
    category: "Recruitment & Technical Assessment Platform",
    description:
      "A recruitment platform connecting HR professionals and job seekers through technical assessments and job opportunities.",
    longIntro:
      "BackendInterviewPass connects two sides of hiring: HR professionals publish roles and assessments, job seekers build skill profiles and apply. The backend models the whole pipeline — users, roles, skills, assessments and applications — behind a documented, token-secured API.",
    technologies: [".NET 8", "Web API", "EF Core", "SQLite", "JWT", "AutoMapper", "Swagger"],
    image: bipCover,
    coverAlt: "BackendInterviewPass job-seeker sign up with skills selection",
    gallery: [
      { src: bipCover, alt: "BackendInterviewPass sign-up form for job seekers with experience, field and skills", caption: "Job-seeker onboarding — profile, experience, skills" },
    ],
    problem: [
      "HR teams struggle to screen backend candidates on real skill signals, while job seekers have no structured way to present experience beyond a CV upload.",
      "Assessment processes are usually ad-hoc — spreadsheets and chat threads — with no consistent record of who assessed what.",
    ],
    solution: [
      "Role-based accounts (HR / job seeker) with structured profiles: experience level, field, verified skill sets and contact data.",
      "An assessment and opportunity pipeline where HR publishes openings and candidates apply with complete, comparable profiles.",
      "A clean, documented API surface so the hiring workflow can evolve without breaking clients.",
    ],
    role: "Backend developer — domain model, API and auth",
    contributions: [
      "Designed the Web API in .NET 8 with EF Core on SQLite — users, roles, skills, assessments, applications.",
      "Implemented JWT authentication with HR / job-seeker role separation and protected assessment routes.",
      "Used AutoMapper to keep DTO boundaries clean between persistence models and API contracts.",
      "Documented every endpoint with Swagger including auth flows and validation behavior.",
      "Built skills validation (e.g. at least one skill required) and consistent error responses.",
    ],
    features: [
      "HR / job-seeker role accounts",
      "Structured skill profiles",
      "Technical assessments workflow",
      "Job opportunities board",
      "JWT-secured API",
      "Swagger documentation",
    ],
    architecture: [
      { title: "API", text: ".NET 8 Web API with controller-per-resource layout, DTO validation and AutoMapper profiles." },
      { title: "Data", text: "EF Core with SQLite for a portable dev story; relational model across users, skills, assessments and applications." },
      { title: "Auth", text: "JWT bearer auth with role policies — HR-only publish routes, candidate-scoped application routes." },
    ],
    flow: ["CLIENT", "API · .NET 8", "SERVICES · assess · apply", "SQLITE · EF Core"],
    github: "",
    accent: "#2e7d6f",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
