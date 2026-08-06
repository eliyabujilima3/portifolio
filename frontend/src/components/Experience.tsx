import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
        </motion.div>

        <div className="relative mt-10 pl-8 border-l-2 border-royal/20 space-y-10">
          {experience.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-accent-gradient text-white shadow-card">
                <FiBriefcase size={14} />
              </span>
              <div className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-navy dark:text-white">
                    {job.title}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-royal/10 text-royal">
                    {job.duration}
                  </span>
                </div>
                <p className="text-royal font-medium text-sm mb-3">{job.company}</p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
                  {job.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                {job.achievements && job.achievements.length > 0 && (
                  <div className="mt-3 text-sm">
                    <span className="font-semibold text-navy dark:text-white">
                      Achievements:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {job.achievements.join(" · ")}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
