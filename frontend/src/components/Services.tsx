import { motion } from "framer-motion";
import {
  FiCode,
  FiBarChart2,
  FiCpu,
  FiLayout,
  FiDatabase,
  FiSearch,
  FiBriefcase,
} from "react-icons/fi";
import { services } from "../data/content";

const ICONS: Record<string, JSX.Element> = {
  code: <FiCode />,
  chart: <FiBarChart2 />,
  brain: <FiCpu />,
  layout: <FiLayout />,
  database: <FiDatabase />,
  search: <FiSearch />,
  briefcase: <FiBriefcase />,
};

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Services</p>
          <h2 className="section-title">How I can help</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="card p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal/10 text-royal text-lg mb-4">
                {ICONS[s.icon]}
              </span>
              <h3 className="font-display font-bold text-navy dark:text-white mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
