import { motion } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiBarChart2,
  FiTool,
} from "react-icons/fi";
import { skillCategories } from "../data/content";
import { useInView } from "../hooks/useInView";

const ICONS: Record<string, JSX.Element> = {
  code: <FiCode />,
  layout: <FiLayout />,
  server: <FiServer />,
  database: <FiDatabase />,
  chart: <FiBarChart2 />,
  wrench: <FiTool />,
};

function SkillBar({ name, level, inView }: { name: string; level: number; inView: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-700 dark:text-gray-200 font-medium">{name}</span>
        <span className="text-royal font-semibold">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-accent-gradient"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, icon, skills }: (typeof skillCategories)[number]) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal text-lg">
          {ICONS[icon]}
        </span>
        <h3 className="font-display font-bold text-navy dark:text-white">{category}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((s) => (
          <SkillBar key={s.name} name={s.name} level={s.level} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">What I work with</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mb-10">
            A blend of programming, data science, and full-stack development skills built
            through coursework, competitions, and practical training.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <CategoryCard key={cat.category} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
