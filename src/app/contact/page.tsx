"use client";
import styles from "./contact.module.css";
import { Mail, Send, CheckCircle } from "lucide-react";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import { useState, useRef } from "react";

type FormFields = { email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const socialLinks = [
  { href: "https://discord.gg/67tRE3TjMr", label: "Discord", icon: FaDiscord },
  {
    href: "https://www.youtube.com/@BeanuttsGames",
    label: "YouTube",
    icon: FaYoutube,
  },
  { href: "https://x.com/Beanuttsss", label: "X (Twitter)", icon: FaXTwitter },
  {
    href: "https://www.instagram.com/beanutts_games/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@beanuttsgames",
    label: "TikTok",
    icon: FaTiktok,
  },
];

const copy = {
  pageTitle: "Get in touch",
  pageSubtitle:
    "Questions, feedback, or press inquiries — email is the fastest way to reach us.",
  form: {
    email: "Email",
    emailPlaceholder: "you@example.com",
    subject: "Subject",
    subjectPlaceholder: "What's this about?",
    message: "Message",
    messagePlaceholder: "Tell us what's on your mind...",
    send: "Send message",
    sent: "Message sent — thanks for reaching out!",
    sendAnother: "Send another",
    error: "Something went wrong. Please try again.",
  },
  validation: {
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email address",
    subjectRequired: "Subject is required",
    messageRequired: "Message is required",
    messageTooShort: "Message must be at least 5 characters",
  },
};

export default function Contact() {
  function validate(form: FormFields): FormErrors {
    const errors: FormErrors = {};
    if (!form.email.trim()) {
      errors.email = copy.validation.emailRequired;
    } else if (!EMAIL_RE.test(form.email.trim())) {
      errors.email = copy.validation.emailInvalid;
    }
    if (!form.subject.trim()) {
      errors.subject = copy.validation.subjectRequired;
    }
    if (!form.message.trim()) {
      errors.message = copy.validation.messageRequired;
    } else if (form.message.trim().length < 5) {
      errors.message = copy.validation.messageTooShort;
    }
    return errors;
  }

  const [form, setForm] = useState<FormFields>({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormFields, boolean>>
  >({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (status === "sent") return;
    if (touched[name as keyof FormFields]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name as keyof FormFields],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (status === "sent") return;
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name as keyof FormFields],
    }));
  };

  const handleReset = () => {
    setStatus("idle");
    setForm({ email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, subject: true, message: true });
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ email: "", subject: "", message: "" });
        setErrors({});
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (name: keyof FormFields, extraClass = "") => {
    const isValid =
      touched[name] && !errors[name] && form[name].trim().length > 0;
    return {
      name,
      value: form[name],
      onChange: handleChange,
      onBlur: handleBlur,
      className: `${styles.input} ${extraClass} ${errors[name] ? styles.inputError : ""} ${isValid ? styles.inputValid : ""}`,
    };
  };

  return (
    <section>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.info}>
            <span className={styles.eyebrow}>Beanutts Games</span>
            <h1 className={styles.title}>{copy.pageTitle}</h1>
            <p className={styles.text}>{copy.pageSubtitle}</p>

            <a
              href="mailto:beanuttsgames@gmail.com"
              className={styles.emailLink}
            >
              <Mail size={18} />
              beanuttsgames@gmail.com
            </a>

            <div className={styles.social}>
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialIcon}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formCard}
            noValidate
          >
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="email">
                {copy.form.email}
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder={copy.form.emailPlaceholder}
                {...field("email")}
                disabled={status === "sent"}
              />
              {errors.email && (
                <p className={styles.fieldError}>{errors.email}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="subject">
                {copy.form.subject}
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder={copy.form.subjectPlaceholder}
                {...field("subject")}
                disabled={status === "sent"}
              />
              {errors.subject && (
                <p className={styles.fieldError}>{errors.subject}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="message">
                {copy.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={7}
                placeholder={copy.form.messagePlaceholder}
                {...field("message", styles.textarea)}
                disabled={status === "sent"}
              />
              {errors.message && (
                <p className={styles.fieldError}>{errors.message}</p>
              )}
            </div>

            <div className={styles.formFooter}>
              {status === "error" && (
                <p className={styles.errorMsg}>{copy.form.error}</p>
              )}
              {status === "sent" ? (
                <div className={styles.sentRow}>
                  <p className={styles.successMsg}>
                    <CheckCircle size={15} /> {copy.form.sent}
                  </p>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={handleReset}
                  >
                    {copy.form.sendAnother}
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className={`btn ${styles.submitBtn}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      {copy.form.send} <Send size={15} />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
