"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./Calculator.module.css";

type BtnType =
  | "number"
  | "operator"
  | "equals"
  | "clear"
  | "delete"
  | "function";

interface Button {
  label: string;
  value: string;
  type: BtnType;
  span?: number;
}

const BUTTONS: Button[][] = [
  [
    { label: "AC", value: "AC", type: "clear" },
    { label: "+/-", value: "NEG", type: "function" },
    { label: "%", value: "%", type: "function" },
    { label: "÷", value: "/", type: "operator" },
  ],
  [
    { label: "7", value: "7", type: "number" },
    { label: "8", value: "8", type: "number" },
    { label: "9", value: "9", type: "number" },
    { label: "×", value: "*", type: "operator" },
  ],
  [
    { label: "4", value: "4", type: "number" },
    { label: "5", value: "5", type: "number" },
    { label: "6", value: "6", type: "number" },
    { label: "−", value: "-", type: "operator" },
  ],
  [
    { label: "1", value: "1", type: "number" },
    { label: "2", value: "2", type: "number" },
    { label: "3", value: "3", type: "number" },
    { label: "+", value: "+", type: "operator" },
  ],
  [
    { label: "DEL", value: "DEL", type: "delete" },
    { label: "0", value: "0", type: "number" },
    { label: ".", value: ".", type: "number" },
    { label: "=", value: "=", type: "equals" },
  ],
];

const MAX_DIGITS = 12;

function safeEval(expr: string): string {
  try {
    // Replace × and ÷ symbols just in case
    const clean = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");

    // Guard against empty or operator-ending expressions
    if (!clean || /[+\-*/.]$/.test(clean)) throw new Error("Invalid");

    // Disallow consecutive operators
    if (/[+\-*/]{2,}/.test(clean.replace(/\*-|\/[-+]/, "")))
      throw new Error("Invalid");

    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + clean + ")")();

    if (!isFinite(result)) return "Error";
    if (isNaN(result)) return "Error";

    // Format result — avoid insane floating point tails
    const str = parseFloat(result.toPrecision(10)).toString();
    return str;
  } catch {
    return "Error";
  }
}

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpr] = useState("");
  const [justEvaled, setJustEvaled] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);

  const flash = (val: string) => {
    setPressed(val);
    setTimeout(() => setPressed(null), 120);
  };

  const handleBtn = useCallback(
    (btn: Button) => {
      flash(btn.value);

      if (btn.value === "AC") {
        setDisplay("0");
        setExpr("");
        setJustEvaled(false);
        return;
      }

      if (btn.value === "DEL") {
        if (display === "Error") {
          setDisplay("0");
          setExpr("");
          return;
        }
        if (display.length === 1 || justEvaled) {
          setDisplay("0");
          return;
        }
        setDisplay((prev) => prev.slice(0, -1));
        return;
      }

      if (btn.value === "NEG") {
        if (display === "0" || display === "Error") return;
        setDisplay((prev) =>
          prev.startsWith("-") ? prev.slice(1) : "-" + prev,
        );
        return;
      }

      if (btn.value === "%") {
        if (display === "Error") return;
        const val = parseFloat(display) / 100;
        setDisplay(parseFloat(val.toPrecision(10)).toString());
        return;
      }

      // Operator
      if (["+", "-", "*", "/"].includes(btn.value)) {
        if (display === "Error") return;
        const base = justEvaled ? display : expression + display;
        setExpr(base + btn.value);
        setJustEvaled(false);
        setDisplay("0");
        return;
      }

      // Equals
      if (btn.value === "=") {
        if (display === "Error" || !expression) return;
        const fullExpr = expression + display;
        const result = safeEval(fullExpr);
        // Save to history
        setHistory((prev) => [`${fullExpr} = ${result}`, ...prev].slice(0, 20));
        setDisplay(result);
        setExpr("");
        setJustEvaled(true);
        return;
      }

      // Decimal
      if (btn.value === ".") {
        if (justEvaled) {
          setDisplay("0.");
          setJustEvaled(false);
          return;
        }
        if (display.includes(".")) return;
        setDisplay((prev) => prev + ".");
        return;
      }

      // Number
      if (display === "Error") {
        setDisplay(btn.value);
        setExpr("");
        setJustEvaled(false);
        return;
      }
      if (justEvaled) {
        setDisplay(btn.value);
        setJustEvaled(false);
        return;
      }
      if (display === "0" && btn.value !== ".") {
        setDisplay(btn.value);
        return;
      }
      if (display.replace("-", "").replace(".", "").length >= MAX_DIGITS)
        return;
      setDisplay((prev) => prev + btn.value);
    },
    [display, expression, justEvaled],
  );

  // Keyboard support
  useEffect(() => {
    const keyMap: Record<string, Button> = {
      "0": { label: "0", value: "0", type: "number" },
      "1": { label: "1", value: "1", type: "number" },
      "2": { label: "2", value: "2", type: "number" },
      "3": { label: "3", value: "3", type: "number" },
      "4": { label: "4", value: "4", type: "number" },
      "5": { label: "5", value: "5", type: "number" },
      "6": { label: "6", value: "6", type: "number" },
      "7": { label: "7", value: "7", type: "number" },
      "8": { label: "8", value: "8", type: "number" },
      "9": { label: "9", value: "9", type: "number" },
      ".": { label: ".", value: ".", type: "number" },
      "+": { label: "+", value: "+", type: "operator" },
      "-": { label: "−", value: "-", type: "operator" },
      "*": { label: "×", value: "*", type: "operator" },
      "/": { label: "÷", value: "/", type: "operator" },
      Enter: { label: "=", value: "=", type: "equals" },
      "=": { label: "=", value: "=", type: "equals" },
      Backspace: { label: "DEL", value: "DEL", type: "delete" },
      Escape: { label: "AC", value: "AC", type: "clear" },
      "%": { label: "%", value: "%", type: "function" },
    };
    const onKey = (e: KeyboardEvent) => {
      const btn = keyMap[e.key];
      if (btn) {
        e.preventDefault();
        handleBtn(btn);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleBtn]);

  // Format display number with commas (no commas for decimals)
  const formatDisplay = (val: string) => {
    if (val === "Error") return val;
    if (val.includes(".")) return val;
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return Math.abs(num) >= 1e9 ? val : num.toLocaleString("en-US");
  };

  const displayFontSize =
    display.length > 9
      ? "clamp(1.6rem, 5vw, 2.2rem)"
      : display.length > 6
        ? "clamp(2rem, 6vw, 2.8rem)"
        : "clamp(2.4rem, 7vw, 3.5rem)";

  const exprDisplay = expression
    .replace("*", "×")
    .replace("/", "÷")
    .replace("-", "−");

  return (
    <div className={styles.page}>
      <div className={styles.calculator}>
        {/* Display */}
        <div className={styles.display}>
          <div className={styles.exprRow}>
            {exprDisplay || <span>&nbsp;</span>}
          </div>
          <div
            className={`${styles.mainDisplay} ${display === "Error" ? styles.errorDisplay : ""}`}
            style={{ fontSize: displayFontSize }}
          >
            {display === "Error" ? "Error" : formatDisplay(display)}
          </div>
          <div className={styles.displayFooter}>
            <button
              className={styles.historyToggle}
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide history" : `History (${history.length})`}
            </button>
            <span className={styles.keyboard}>⌨ Keyboard supported</span>
          </div>
        </div>

        {/* History panel */}
        {showHistory && (
          <div className={styles.historyPanel}>
            {history.length === 0 ? (
              <p className={styles.historyEmpty}>No calculations yet</p>
            ) : (
              history.map((h, i) => (
                <div key={i} className={styles.historyItem}>
                  {h}
                </div>
              ))
            )}
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttons}>
          {BUTTONS.flat().map((btn) => (
            <button
              key={btn.label + btn.value}
              className={`
                ${styles.btn}
                ${styles[`btn_${btn.type}`]}
                ${pressed === btn.value ? styles.btnPressed : ""}
              `}
              onClick={() => handleBtn(btn)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
