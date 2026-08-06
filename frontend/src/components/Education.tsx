import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { education } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="py-24 bg-gray-50 dark:bg-navy">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Education</p>
          <h2 className="section-title">Academic background</h2>
        </motion.div>

        <div className="relative mt-10 pl-8 border-l-2 border-royal/20 space-y-8">
          {education.map((ed, idx) => (
            <motion.div
              key={ed.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] grid h-8 w-8 place-items-center rounded-full bg-accent-gradient text-white shadow-card">
                <FiBookOpen size={14} />
              </span>
              <div className="card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-navy dark:text-white">
                    {ed.course}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-royal/10 text-royal">
                    {ed.graduationYear}
                  </span>
                </div>
                <p className="text-royal font-medium text-sm mb-3">{ed.institution}</p>
                {ed.gpa && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    GPA: {ed.gpa}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {ed.coursework.map((c) => (
                    <span
                      key={c}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300"
                    >
                      {c}
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
