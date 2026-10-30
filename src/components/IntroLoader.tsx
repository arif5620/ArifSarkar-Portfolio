"use client";

import { useState } from "react";

const skyline =
  "M0 118 H18 V84 H30 V96 H44 V58 H54 V34 H60 V20 H64 V34 H70 V58 H82 V74 H96 V44 H104 V26 H108 V12 H110 V26 H114 V44 H124 V88 H138 V62 H150 V96 H162 V72 H178 V86 H192 V50 H200 V36 H206 V50 H214 V68 H228 V92 H242 V78 H260 V118";

// Pure-CSS opening (see .intro in globals.css): renders instantly, hides itself even without JS,
// shows once per session (layout script adds html.intro-seen) and can be skipped with a tap.
export default function IntroLoader() {
  const [skipped, setSkipped] = useState(false);
  if (skipped) return null;

  return (
    <div className="intro" onClick={() => setSkipped(true)} aria-hidden>
      <div className="intro-panel intro-top" />
      <div className="intro-panel intro-bottom" />
      <div className="intro-content">
        <svg viewBox="0 0 260 120" className="intro-skyline">
          <defs>
            <linearGradient id="introGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#c9a44c" stopOpacity="0.35" />
              <stop offset="1" stopColor="#c9a44c" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${skyline} Z`} fill="url(#introGlow)" className="intro-fill" />
          <path d={skyline} fill="none" stroke="#e3c97e" strokeWidth="1.5" className="intro-line" />
        </svg>
        <p className="intro-name">
          {"ARIF".split("").map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.7 + i * 0.12}s` }}>{ch}</span>
          ))}
        </p>
        <div className="intro-rule" />
        <p className="intro-tag">Real Estate · Dhaka · Chattogram · Cumilla</p>
      </div>
    </div>
  );
}
