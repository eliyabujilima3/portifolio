import type {
  SkillCategory,
  Project,
  ExperienceItem,
  EducationItem,
  Certification,
  Testimonial,
  ServiceItem,
  StatItem,
} from "../types";

/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT ME: This file holds every piece of text/content shown on
 *  the site. Replace placeholder values (marked "[Placeholder]")
 *  with real details, then swap the sample images/links.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Eliya Bujilima",
  titles: [
    "Data Scientist",
    "Full Stack Developer",
    "AI Enthusiast",
    "Technology Consultant",
  ],
  tagline:
    "Building data-driven products and intelligent systems — from predictive models to full-stack applications.",
  email: "your.email@example.com", // [Placeholder]
  phone: "+255 000 000 000", // [Placeholder]
  location: "Dar es Salaam, Tanzania", // [Placeholder]
  resumeUrl: "/Eliya_Bujilima_CV.pdf", // [Placeholder] — drop your CV file in /public
  social: {
    github: "https://github.com/yourusername", // [Placeholder]
    linkedin: "https://linkedin.com/in/yourusername", // [Placeholder]
    x: "https://x.com/yourusername", // [Placeholder]
    instagram: "https://instagram.com/yourusername", // [Placeholder]
    zindi: "https://zindi.africa/users/yourusername", // [Placeholder]
  },
  yearsExperience: 1,
};

export const about = {
  bio: [
    "I'm a third-year Data Science undergraduate at the Eastern Africa Statistical Training Centre (EASTC), Tanzania, with hands-on experience across machine learning, data analysis, and full-stack software development.",
    "My work spans predictive modelling on real-world datasets, building web applications end-to-end, and translating messy data into decisions people can act on. I've put these skills to the test in competitive challenges hosted on Zindi, and through practical training in applied machine learning.",
    "I care about building things that are useful, well-engineered, and easy to maintain — whether that's a forecasting model, a dashboard, or the API behind it.",
  ],
  mission:
    "To use data and technology to solve real problems for real people — starting here in East Africa and beyond.",
  languages: ["English", "Swahili"],
  interests: [
    "Machine Learning research",
    "Open data competitions",
    "Cloud computing",
    "Building side projects",
  ],
};

export const stats: StatItem[] = [
  { label: "Projects Completed", value: 8, suffix: "+" },
  { label: "Competitions Entered", value: 5, suffix: "+" },
  { label: "Years of Experience", value: 1, suffix: "+" },
  { label: "Certifications", value: 2, suffix: "" },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming",
    icon: "code",
    skills: [
      { name: "Python", level: 85 },
      { name: "R", level: 70 },
      { name: "JavaScript", level: 65 },
      { name: "SQL", level: 75 },
      { name: "PHP", level: 40 },
      { name: "Java", level: 35 },
      { name: "C++", level: 40 },
    ],
  },
  {
    category: "Frontend",
    icon: "layout",
    skills: [
      { name: "HTML", level: 80 },
      { name: "CSS", level: 75 },
      { name: "React", level: 60 },
      { name: "Tailwind CSS", level: 65 },
      { name: "Bootstrap", level: 60 },
    ],
  },
  {
    category: "Backend",
    icon: "server",
    skills: [
      { name: "Node.js", level: 55 },
      { name: "Express", level: 55 },
      { name: "Flask", level: 50 },
      { name: "Django", level: 40 },
    ],
  },
  {
    category: "Database",
    icon: "database",
    skills: [
      { name: "MySQL", level: 65 },
      { name: "PostgreSQL", level: 55 },
      { name: "MongoDB", level: 45 },
    ],
  },
  {
    category: "Data Science",
    icon: "chart",
    skills: [
      { name: "Machine Learning", level: 80 },
      { name: "Data Analysis", level: 85 },
      { name: "Pandas / NumPy", level: 80 },
      { name: "Data Visualization", level: 75 },
      { name: "Power BI", level: 55 },
      { name: "TensorFlow", level: 50 },
    ],
  },
  {
    category: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", level: 70 },
      { name: "Linux", level: 65 },
      { name: "VS Code", level: 85 },
      { name: "Docker", level: 40 },
      { name: "Figma", level: 35 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "farm-to-feed",
    title: "Farm to Feed — Shopping Basket Recommendation",
    description:
      "Predictive model recommending future shopping baskets to improve fresh-produce purchasing decisions. Built with Team EASTC AgriData Minds — ranked 85/248 (top 50%) on Zindi.",
    image: "/projects/farm-to-feed.svg",
    technologies: ["Python", "Pandas", "Scikit-learn", "Feature Engineering"],
    githubUrl: "https://github.com/yourusername/farm-to-feed", // [Placeholder]
    liveUrl: "https://zindi.africa/competitions/farm-to-feed-shopping-basket-recommendation-challenge",
    category: "Data Science",
    completionDate: "2026-01",
    featured: true,
  },
  {
    id: "mkopo-ai",
    title: "Mkopo AI",
    description:
      "Machine learning project focused on loan-related prediction problems, exploring applicant data to support faster, fairer lending decisions.",
    image: "/projects/mkopo-ai.svg",
    technologies: ["Python", "Scikit-learn", "Pandas"],
    githubUrl: "https://github.com/yourusername/mkopo-ai", // [Placeholder]
    category: "AI",
    completionDate: "2025-11",
    featured: true,
  },
  {
    id: "healthcare-monitoring",
    title: "Healthcare Performance Monitoring & Reporting System",
    description:
      "Group capstone project building a monitoring and reporting system for Tanzanian polyclinics, covering data collection, KPIs, and reporting dashboards.",
    image: "/projects/healthcare.svg",
    technologies: ["Python", "SQL", "Dashboarding"],
    category: "Data Science",
    completionDate: "2026-03",
    featured: true,
  },
  {
    id: "smart-expense-tracker",
    title: "Smart Expense Tracker",
    description:
      "Personal finance web app for tracking and analyzing everyday expenses, with category breakdowns and simple visual summaries.",
    image: "/projects/expense-tracker.svg",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/smart-expense-tracker", // [Placeholder]
    category: "Web Development",
    completionDate: "2025-08",
  },
  {
    id: "loan-default-prediction",
    title: "Loan Default Prediction Challenge",
    description:
      "Zindi competition entry predicting borrower default risk from historical loan data using engineered features and gradient boosting.",
    image: "/projects/loan-default.svg",
    technologies: ["Python", "XGBoost", "Pandas"],
    liveUrl: "https://zindi.africa/",
    category: "Data Science",
    completionDate: "2025-09",
  },
  {
    id: "insurance-prediction",
    title: "Insurance Prediction Challenge",
    description:
      "Predictive modelling competition estimating insurance uptake/claims likelihood from demographic and behavioral data.",
    image: "/projects/insurance.svg",
    technologies: ["Python", "Scikit-learn"],
    liveUrl: "https://zindi.africa/",
    category: "Data Science",
    completionDate: "2025-06",
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "afropavo",
    title: "Field & Practical Training Attaché",
    company: "Afropavo Analytics, Morocco",
    duration: "[Placeholder duration, e.g. Jun 2025 – Aug 2025]",
    responsibilities: [
      "Applied machine learning techniques to load-prediction problems using real-world datasets.",
      "Built and evaluated predictive models under professional supervision.",
      "Collaborated with a technical team on data preparation and model validation workflows.",
    ],
    technologies: ["Python", "Machine Learning", "Data Analysis"],
    achievements: [
      "Delivered a working load-prediction model as part of the training program.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: "eastc",
    institution: "Eastern Africa Statistical Training Centre (EASTC), Tanzania",
    course: "Bachelor of Data Science and Technology (BDTS)",
    graduationYear: "2026 (Expected)",
    coursework: [
      "Multivariate Statistics",
      "Data Science Project Development",
      "Cybersecurity & Data Ethics",
      "Cloud Computing",
      "Data Mining",
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: "zindi-farm-to-feed",
    title: "Farm to Feed — Shopping Basket Recommendation Challenge",
    issuer: "Zindi",
    date: "20 January 2026",
    image: "/certs/zindi-farm-to-feed.svg",
    verifyUrl:
      "https://zindi.africa/competitions/farm-to-feed-shopping-basket-recommendation-challenge",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "[Placeholder Name]",
    position: "[Placeholder Role, Company]",
    photo: "/testimonials/placeholder-1.svg",
    review:
      "Replace this with a real quote from a supervisor, teammate, or client once you have one on record.",
    rating: 5,
  },
  {
    id: "t2",
    name: "[Placeholder Name]",
    position: "[Placeholder Role, Company]",
    photo: "/testimonials/placeholder-2.svg",
    review:
      "Testimonials build trust quickly — swap these placeholders for real feedback as you collect it.",
    rating: 5,
  },
];

export const services: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description:
      "Responsive, modern websites and web applications built with React and Node.js.",
    icon: "code",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description:
      "Turning raw data into clear, actionable insight using Python, R, and SQL.",
    icon: "chart",
  },
  {
    id: "ml",
    title: "Machine Learning",
    description:
      "Predictive models for classification, regression, and forecasting problems.",
    icon: "brain",
  },
  {
    id: "dashboards",
    title: "Dashboard Development",
    description: "Interactive dashboards for tracking KPIs and business metrics.",
    icon: "layout",
  },
  {
    id: "db-design",
    title: "Database Design",
    description:
      "Well-structured relational and NoSQL schemas built for scale and integrity.",
    icon: "database",
  },
  {
    id: "research",
    title: "Research Assistance",
    description:
      "Data collection, statistical analysis, and reporting support for research projects.",
    icon: "search",
  },
  {
    id: "consultancy",
    title: "IT Consultancy",
    description:
      "Guidance on tooling, architecture, and data strategy for small teams and projects.",
    icon: "briefcase",
  },
];

export const projectCategories = [
  "All",
  "Web Development",
  "Data Science",
  "AI",
  "Mobile Apps",
  "Research",
] as const;
