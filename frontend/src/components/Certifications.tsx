import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { certifications } from "../data/content";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Certifications</p>
          <h2 className="section-title">Recognized achievements</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="card overflow-hidden"
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-5">
                <h3 className="font-display font-bold text-navy dark:text-white text-sm mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                <p className="text-xs text-gray-400 mt-1">{cert.date}</p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-royal hover:underline"
                  >
                    <FiCheckCircle size={14} /> Verify
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
