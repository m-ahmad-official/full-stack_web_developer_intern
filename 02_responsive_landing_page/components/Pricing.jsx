"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, SlideLeft, ScaleIn } from "./AnimateOnScroll";
import styles from "./Pricing.module.css";

const plans = [
  {
    name: "Starter",
    monthly: 29,
    yearly: 24,
    desc: "Perfect for startups and early-stage products needing a strong foundation.",
    features: [
      "Brand identity system",
      "Up to 5 page website",
      "Mobile responsive design",
      "2 rounds of revisions",
      "30-day support",
      "Source files included",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Studio",
    monthly: 69,
    yearly: 58,
    desc: "Our most popular package — for teams serious about digital excellence.",
    features: [
      "Everything in Starter",
      "Custom web application",
      "Animations & interactions",
      "CMS integration",
      "SEO optimisation",
      "90-day support",
      "Dedicated Slack channel",
    ],
    cta: "Start Studio",
    popular: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    desc: "Bespoke engagements for complex products and large organisations.",
    features: [
      "Everything in Studio",
      "Dedicated team",
      "Custom integrations",
      "Multi-platform builds",
      "Ongoing retainer",
      "24/7 priority support",
      "Quarterly strategy reviews",
    ],
    cta: "Talk to Us",
    popular: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <SlideLeft>
            <span className={styles.label}>Pricing</span>
          </SlideLeft>
          <FadeUp delay={0.1}>
            <h2 className={styles.title}>
              Simple,
              <br />
              <span className={styles.outline}>transparent pricing</span>
            </h2>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${!annual ? styles.active : ""}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.active : ""}`}
              onClick={() => setAnnual(true)}
            >
              Annual <span className={styles.save}>Save 15%</span>
            </button>
          </div>
        </FadeUp>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <ScaleIn key={plan.name} delay={i * 0.12}>
              <motion.div
                className={`${styles.card} ${plan.popular ? styles.popular : ""}`}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                {plan.popular && (
                  <div className={styles.badge}>Most Popular</div>
                )}
                <div className={styles.planName}>{plan.name}</div>
                <div className={styles.price}>
                  {plan.monthly ? (
                    <>
                      <span className={styles.currency}>$</span>
                      <motion.span
                        key={annual ? "annual" : "monthly"}
                        className={styles.amount}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {annual
                          ? plan.yearly.toLocaleString()
                          : plan.monthly.toLocaleString()}
                      </motion.span>
                      <span className={styles.period}>/mo</span>
                    </>
                  ) : (
                    <span className={styles.custom}>Custom</span>
                  )}
                </div>
                <p className={styles.planDesc}>{plan.desc}</p>
                <ul className={styles.features}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.check}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  className={`${styles.cta} ${plan.popular ? styles.ctaPrimary : styles.ctaSecondary}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <p className={styles.note}>
            All prices in USD. Projects kick off within 2 weeks. Not sure which
            plan fits? <a href="#contact">Let&apos;s talk.</a>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
