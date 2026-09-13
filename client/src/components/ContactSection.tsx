import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { isValidEmail } from "../lib/utils";
import { useToast } from "../hooks/use-toast";
import { DotPattern } from "./DotPattern";
import { easeOutExpo } from "../lib/motion";

const EMAIL = "ganeshkantle@gmail.com";
const WHATSAPP = "8861435167";

export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmailForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      toast({
        title: "Valid email is required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter your message",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateWhatsAppForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.message.trim()) {
      toast({
        title: "Message is required",
        description: "Please enter your message",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSendEmail = async () => {
    if (!validateEmailForm()) return;
    setIsSubmitting(true);
    try {
      const mailtoLink = `mailto:${EMAIL}?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}`;
      window.open(mailtoLink);
      toast({
        title: "Email client opened",
        description: "Your message has been prepared in your default email client.",
      });
    } catch {
      toast({
        title: "Error sending email",
        description: "There was an error preparing your email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!validateWhatsAppForm()) return;
    setIsSubmitting(true);
    try {
      const whatsappText = `Hi, I'm ${formData.name}. ${formData.message}`;
      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappText)}`,
        "_blank",
        "noopener,noreferrer"
      );
      toast({
        title: "WhatsApp opened",
        description: "Your message has been prepared in WhatsApp.",
      });
    } catch {
      toast({
        title: "Error opening WhatsApp",
        description: "There was an error preparing your WhatsApp message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldShell = (name: string) =>
    `relative border-b transition-colors duration-300 ${
      focused === name ? "border-primary" : "border-border"
    }`;

  return (
    <>
      <div className="bg-background py-10 sm:py-14">
        <div className="page-shell">
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
            <div className="mx-3 h-2 w-2 rounded-full bg-primary sm:mx-4" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent sm:w-32" />
          </div>
        </div>
      </div>

      <section
        id="contact"
        className="section-y relative overflow-hidden cv-auto scroll-mt-[var(--nav-offset)] bg-background"
      >
        <DotPattern />
        <div className="page-shell relative z-10">
          {/* Header — one job */}
          <motion.div
            className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary sm:text-sm">
              Get in touch
            </p>
            <h2 className="text-title mb-3 font-semibold tracking-tight text-foreground sm:mb-4">
              Let&apos;s build something{" "}
              <span className="text-primary">together</span>
            </h2>
            <motion.div
              className="mx-auto mb-4 h-1 w-16 origin-center rounded-full bg-primary sm:mb-5 sm:w-20"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.08 }}
            />
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Freelance, full-time, or a rough idea — drop a note. I reply myself.
            </p>
          </motion.div>

          {/* Composer — main focus */}
          <motion.div
            className="mx-auto max-w-2xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05, ease: easeOutExpo }}
          >
            <form
              className="space-y-7 sm:space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendEmail();
              }}
            >
              <div className="grid gap-7 sm:grid-cols-2 sm:gap-6">
                <div className={fieldShell("name")}>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-medium text-muted-foreground sm:text-sm"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    autoComplete="name"
                    placeholder="How should I call you?"
                    className="mt-2 w-full bg-transparent pb-3 text-base text-foreground outline-none placeholder:text-muted-foreground/45 sm:text-lg"
                  />
                </div>

                <div className={fieldShell("email")}>
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-medium text-muted-foreground sm:text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    autoComplete="email"
                    placeholder="ganeshkantle@gmail.com"
                    className="mt-2 w-full bg-transparent pb-3 text-base text-foreground outline-none placeholder:text-muted-foreground/45 sm:text-lg"
                  />
                </div>
              </div>

              <div className={fieldShell("message")}>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={5}
                  placeholder="What are you working on?"
                  className="mt-2 w-full resize-y bg-transparent pb-3 text-base leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/45 sm:min-h-[140px] sm:text-lg"
                />
              </div>

              <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <i className="fas fa-envelope text-xs" aria-hidden="true" />
                  Send Email
                </motion.button>
                <motion.button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSendWhatsApp}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                >
                  <i className="fab fa-whatsapp text-sm" aria-hidden="true" />
                  WhatsApp
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
