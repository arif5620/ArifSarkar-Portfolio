"use client";

import { useState } from "react";

// Pure-CSS opening (see .intro in globals.css): renders instantly, hides itself even without JS,
// shows once per session (layout script adds html.intro-seen) and can be skipped with a tap.
export default function IntroLoader() {
  const [skipped, setSkipped] = useState(false);
  if (skipped) return null;

  let n = 0;
  return (
    <div className="intro" onClick={() => setSkipped(true)} aria-hidden>
      <p className="intro-name">
        {["Arif"].map((word) => (
          <span key={word}>
            {word.split("").map((ch, i) => (
              <i key={i} style={{ animationDelay: `${0.15 + n++ * 0.05}s` }}>{ch}</i>
            ))}
          </span>
        ))}
      </p>
      <p className="intro-tag">Real Estate · Dhaka · Chattogram · Cumilla</p>
      <p className="intro-count" />
      <div className="intro-bar" />
    </div>
  );
}
