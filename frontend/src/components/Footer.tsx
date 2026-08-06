import { useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiMail, FiSend } from "react-icons/fi";
import { profile } from "../data/content";

const QUICK_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Wire this up to a real newsletter provider (Mailchimp, Buttondown, etc.) when ready.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-navy-light text-gray-300 pt-16 pb-8">
      <div className="section-container grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-display font-extrabold text-xl text-white mb-3">
            {profile.name.split(" ")[0]}
            <span className="text-royal-light">.</span>
          </p>
          <p className="text-sm text-gray-400 max-w-xs">{profile.tagline}</p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm">Quick Links</p>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="hover:text-royal-light transition-colors"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm">Connect</p>
          <div className="flex gap-3">
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-royal transition-colors"><FiGithub size={16} /></a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-royal transition-colors"><FiLinkedin size={16} /></a>
            <a href={profile.social.x} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-royal transition-colors"><FiTwitter size={16} /></a>
            <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-royal transition-colors"><FiInstagram size={16} /></a>
            <a href={`mailto:${profile.email}`} className="grid h-9 w-9 place-items-center rounded-full bg-white/5 hover:bg-royal transition-colors"><FiMail size={16} /></a>
          </div>
        </div>

        <div>
          <p className="font-semibold text-white mb-3 text-sm">Newsletter</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-royal/50 text-white placeholder:text-gray-500"
            />
            <button type="submit" aria-label="Subscribe" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-gradient text-white">
              <FiSend size={14} />
            </button>
          </form>
          {subscribed && <p className="text-xs text-green-400 mt-2">Subscribed — thank you!</p>}
        </div>
      </div>

      <div className="section-container mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
