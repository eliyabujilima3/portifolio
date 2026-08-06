import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiSearch, FiStar } from "react-icons/fi";
import { projects, projectCategories } from "../data/content";
import type { Project } from "../types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="card overflow-hidden flex flex-col group"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {project.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 dark:bg-navy-light/90 text-royal text-xs font-semibold px-2.5 py-1 rounded-full">
            <FiStar size={12} /> Featured
          </span>
        )}
        <span className="absolute top-3 right-3 bg-navy/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {project.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-navy dark:text-white mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full bg-royal/10 text-royal font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {new Date(project.completionDate).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            })}
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} GitHub repository`}
                className="text-gray-500 hover:text-royal transition-colors"
              >
                <FiGithub size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-gray-500 hover:text-royal transition-colors"
              >
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-navy">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Projects</p>
          <h2 className="section-title">Selected work</h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-accent-gradient text-white"
                    : "bg-white dark:bg-navy-light text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-royal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white dark:bg-navy-light border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-royal/50 text-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No projects match that search — try a different keyword or category.
          </p>
        )}
      </div>
    </section>
  );
}
