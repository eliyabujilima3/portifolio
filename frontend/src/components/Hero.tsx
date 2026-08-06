import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiDownload, FiMail } from "react-icons/fi";
import { profile } from "../data/content";

function useTypingEffect(words: string[], speed = 80, pause = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypingEffect(profile.titles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-24 pb-16"
    >
      {/* Animated background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-royal/20 blur-3xl animate-float"
          aria-hidden
        />
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-royal-light/10 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
          aria-hidden
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          aria-hidden
        >
          <defs>
            <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0V42" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="section-container relative grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow text-royal-light">Welcome to my portfolio</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Hi, I'm {profile.name}
          </h1>
          <div className="mt-3 h-10 flex items-center">
            <span className="text-xl sm:text-2xl font-semibold text-royal-light">
              {typed}
              <span className="ml-0.5 animate-blink">|</span>
            </span>
          </div>
          <p className="mt-5 max-w-xl text-gray-300 text-base sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              View Projects <FiArrowDown />
            </a>
            <a href={profile.resumeUrl} download className="btn-outline !border-white !text-white hover:!bg-white hover:!text-navy">
              Download CV <FiDownload />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white/90 font-semibold hover:text-white transition-colors"
            >
              Contact Me <FiMail />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto flex items-center justify-center"
        >
          <div className="relative h-48 w-48 sm:h-64 sm:w-64 mx-auto rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
            <img
              src="/profile/profile.jpg"
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
