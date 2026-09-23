// Central place for public-facing links.
export const LINKS = {
  github: "https://github.com/abood-kh1",
  linkedin: "https://www.linkedin.com/in/abdulaziz-khazendar-526285375",
  whatsapp: "https://wa.me/970567581412",
  email: "mailto:aboodkh1313@gmail.com",
  emailLabel: "aboodkh1313@gmail.com",
};

export const SKILL_GROUPS: { title: string; note: string; items: string[] }[] = [
  {
    title: "Backend",
    note: "where I spend most of my time",
    items: ["C#", "ASP.NET Core", ".NET", "REST APIs", "EF Core"],
  },
  {
    title: "Databases",
    note: "modelled, migrated, queried",
    items: ["SQL Server", "PostgreSQL", "SQLite"],
  },
  {
    title: "Authentication",
    note: "identity done carefully",
    items: ["JWT", "Authentication", "Authorization", "RBAC"],
  },
  {
    title: "AI",
    note: "applied, not demo-ware",
    items: ["Gemini", "AI Integration", "NLP", "AI Agents", "MCP", "RAG"],
  },
  {
    title: "Mobile",
    note: "native android work",
    items: ["Android", "Java", "Kotlin"],
  },
  {
    title: "Tools",
    note: "everyday engineering",
    items: ["Git", "GitHub", "Swagger", "Docker"],
  },
];

export const OTHER_PROJECTS: {
  title: string;
  kind: string;
  description: string;
  stack: string[];
}[] = [
  {
    title: "Interview Experience Enhancement System",
    kind: "Tooling / Assessment",
    description:
      "A system for structuring interview practice and feedback so candidates can prepare with realistic, repeatable sessions.",
    stack: ["Web", "Assessments"],
  },
  {
    title: "Qibla Android App",
    kind: "Android · Utility",
    description:
      "A focused Android utility that helps users find the Qibla direction with sensors and a clean, distraction-free interface.",
    stack: ["Android", "Java"],
  },
  {
    title: "Android Sensor / GPS Application",
    kind: "Android · Sensors",
    description:
      "An Android app built around on-device sensors and GPS — reading live sensor data and location accurately and efficiently.",
    stack: ["Android", "GPS", "Sensors"],
  },
  {
    title: "Morning & Evening Adhkar",
    kind: "Android · Content",
    description:
      "A calm, offline-friendly Adhkar app covering morning and evening remembrances with simple navigation.",
    stack: ["Android", "Kotlin"],
  },
];

export const JOURNEY: {
  phase: string;
  title: string;
  text: string;
  tags: string[];
}[] = [
  {
    phase: "01 / Education",
    title: "IT student, engineering mindset",
    text: "Studying IT and learning software the way systems actually work — data structures, databases, networks, and how requests travel from a client to a row in a table.",
    tags: ["IT studies", "Fundamentals"],
  },
  {
    phase: "02 / Projects",
    title: "Booking, recruitment, coordination",
    text: "Designed and built full platforms: a wedding-hall booking system (Wesal), a recruitment and assessment platform (BackendInterviewPass), and a needs-and-resource coordination platform (NCRP).",
    tags: ["Wesal", "BackendInterviewPass", "NCRP"],
  },
  {
    phase: "03 / Backend development",
    title: ".NET as a home base",
    text: "Focused on backend engineering with ASP.NET Core and EF Core — REST API design, relational modelling on PostgreSQL / SQL Server / SQLite, JWT auth with RBAC, and Swagger-documented services.",
    tags: ["ASP.NET Core", "EF Core", "REST", "JWT"],
  },
  {
    phase: "04 / AI systems",
    title: "Intelligence behind the API",
    text: "Building AI-powered application layers — SiteAware observes web apps and assists users, and recent backend work integrates Gemini, agents, MCP and RAG patterns into practical products.",
    tags: ["SiteAware", "Gemini", "MCP", "RAG"],
  },
];
