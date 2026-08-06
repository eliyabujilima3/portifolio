import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";
import { profile } from "../data/content";
import { submitContactForm } from "../api/client";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.message.trim()) errors.message = "Message can't be empty.";
  else if (form.message.trim().length < 10) errors.message = "Message is too short.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");
    try {
      await submitContactForm(form);
      setStatus("sent");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-navy">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="section-title">Let's work together</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card p-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal">
                  <FiMail />
                </span>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium text-navy dark:text-white text-sm">
                    {profile.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal">
                  <FiPhone />
                </span>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-medium text-navy dark:text-white text-sm">
                    {profile.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-royal/10 text-royal">
                  <FiMapPin />
                </span>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="font-medium text-navy dark:text-white text-sm">
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href={profile.social.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-royal hover:text-white transition-colors"><FiGithub size={16} /></a>
                <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-royal hover:text-white transition-colors"><FiLinkedin size={16} /></a>
                <a href={profile.social.x} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-royal hover:text-white transition-colors"><FiTwitter size={16} /></a>
                <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-royal hover:text-white transition-colors"><FiInstagram size={16} /></a>
              </div>
            </div>

            {/* Google Map placeholder */}
            <div className="card overflow-hidden h-48 grid place-items-center text-gray-400 text-sm">
              Google Map placeholder — embed an iframe here with your location.
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="card p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
                  placeholder="jane@email.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                  Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
                  placeholder="+255 ..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50"
                  placeholder="Project inquiry"
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-light text-sm focus:outline-none focus:ring-2 focus:ring-royal/50 resize-none"
                placeholder="Tell me a bit about your project..."
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send Message"} <FiSend size={15} />
            </button>

            {status === "sent" && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Thanks — your message has been sent. I'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong sending your message. Please make sure the backend API is
                running, or try again shortly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
