import { motion } from "framer-motion";
import { about, profile, stats } from "../data/content";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { FiGlobe, FiHeart, FiTarget } from "react-icons/fi";

function StatCard({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  const count = useCountUp(value, 1400, inView);

  return (
    <div ref={ref} className="card p-6 text-center">
      <p className="font-display text-3xl sm:text-4xl font-extrabold text-royal">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-navy">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-title">A little about my journey</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {about.bio.map((p, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {p}
              </p>
            ))}

            <div className="flex items-start gap-3 pt-2">
              <FiTarget className="mt-1 text-royal shrink-0" />
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-navy dark:text-white">Mission: </span>
                {about.mission}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <FiGlobe className="mt-1 text-royal shrink-0" />
                <div>
                  <p className="font-semibold text-navy dark:text-white text-sm">Languages</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {about.languages.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiHeart className="mt-1 text-royal shrink-0" />
                <div>
                  <p className="font-semibold text-navy dark:text-white text-sm">Interests</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {about.interests.join(", ")}
                  </p>
                </div>
              </div>
            </div>

            <p className="pt-2 text-sm text-gray-500 dark:text-gray-400">
              Based in {profile.location} · {profile.yearsExperience}+ year of practical
              experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
