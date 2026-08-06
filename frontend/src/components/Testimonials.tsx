import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "../data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-navy">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-eyebrow justify-center">Testimonials</p>
          <h2 className="section-title">What people say</h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="card p-8 text-center"
            >
              <img
                src={current.photo}
                alt={current.name}
                className="h-16 w-16 rounded-full object-cover mx-auto mb-4 border-2 border-royal/30"
              />
              <div className="flex justify-center gap-1 mb-3 text-amber-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" size={16} />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                &ldquo;{current.review}&rdquo;
              </p>
              <p className="font-display font-bold text-navy dark:text-white">
                {current.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{current.position}</p>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 dark:border-white/10 text-navy dark:text-white hover:bg-royal hover:text-white hover:border-royal transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="grid h-9 w-9 place-items-center rounded-full border border-gray-200 dark:border-white/10 text-navy dark:text-white hover:bg-royal hover:text-white hover:border-royal transition-colors"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
