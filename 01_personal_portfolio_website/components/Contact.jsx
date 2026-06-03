"use client";
import { useState } from "react";
import styles from "./Contact.module.css";
import Image from "next/image";

import GithubIcon from "@/public/github.svg";
import LinkedInIcon from "@/public/linkedin.svg";
import TwitterIcon from "@/public/twitter.svg";

import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    try {
      await emailjs.send(
        "service_zf3cw58",
        "template_l51wg18",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        "hf_Glct4mT-UPMTIh",
      );

      setStatus("sent");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.log("EmailJS Error:", error);
      console.log(JSON.stringify(error, null, 2));

      alert("Failed to send message");
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <p className="section-label">Get In Touch</p>
      <h2 className="section-title">Let&apos;s Work Together</h2>
      <div className="section-line" />

      <div className={styles.grid}>
        {/* Info */}
        <div className={styles.info}>
          <p className={styles.infoPara}>
            Whether you have a project idea, an opportunity, or just want to say
            hello — my inbox is always open.
          </p>
          <ContactMethod icon="📧" label="Email" value="aq320646@email.com" />
          <ContactMethod icon="📞" label="Phone" value="+92 370 5929065" />
          <ContactMethod icon="📍" label="Location" value="Karachi, Pakistan" />

          <div className={styles.socialRow}>
            <a
              href="https://github.com/m-ahmad-official"
              target="_blank"
              rel="noreferrer"
              className={styles.social}
            >
              <Image src={GithubIcon} alt="GitHub" width={20} height={20} />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-ahmed-ma6316"
              target="_blank"
              rel="noreferrer"
              className={styles.social}
            >
              <Image src={LinkedInIcon} alt="LinkedIn" width={20} height={20} />
            </a>
            <a
              href="https://twitter.com/iam7ahmad"
              target="_blank"
              rel="noreferrer"
              className={styles.social}
            >
              <Image src={TwitterIcon} alt="Twitter" width={20} height={20} />
            </a>
          </div>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Field
              label="Name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <Field
            label="Subject"
            name="subject"
            type="text"
            placeholder="Project inquiry..."
            value={form.subject}
            onChange={handleChange}
            required
          />
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              name="message"
              className={styles.textarea}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
            />
          </div>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "⏳ Sending..."
              : status === "sent"
                ? "✅ Message Sent!"
                : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder, value, onChange, required }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

function ContactMethod({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--muted)",
            marginBottom: "0.2rem",
          }}
        >
          {label}
        </div>
        <div style={{ color: "var(--text)", fontSize: "0.95rem" }}>{value}</div>
      </div>
    </div>
  );
}
