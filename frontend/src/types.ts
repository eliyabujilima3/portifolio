export interface SkillItem {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string; // lucide/fa icon key used in component map
  skills: SkillItem[];
}

export type ProjectCategory =
  | "Web Development"
  | "Data Science"
  | "AI"
  | "Mobile Apps"
  | "Research";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: ProjectCategory;
  completionDate: string; // e.g. "2026-01"
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
  achievements?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  course: string;
  graduationYear: string;
  gpa?: string;
  coursework: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  photo: string;
  review: string;
  rating: number; // 1-5
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}
