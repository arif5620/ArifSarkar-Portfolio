"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { waLink } from "@/data/profile";

// Standard amortised loan EMI.
export function emi(principal: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const r = annualRatePct / 12 / 100;
  if (n <= 0 || principal <= 0) return 0;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

const taka = (v: number) => "৳ " + Math.round(v).toLocaleString("en-IN");

function Slider({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex justify-between text-sm">
        <span className="text-mute">{label}</span>
        <span className="font-semibold text-gold">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-gold"
      />
    </label>
  );
}

export default function EmiCalculator() {
  const [price, setPrice] = useState(15_000_000);
  const [downPct, setDownPct] = useState(30);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);

  const loan = price * (1 - downPct / 100);
  const monthly = emi(loan, rate, years);
  const total = monthly * years * 12;
  const interestShare = total > 0 ? ((total - loan) / total) * 100 : 0;

  return (
    <section id="emi" className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Plan Your Budget"
          title="Home loan EMI calculator"
          text="Move the sliders to see your estimated monthly installment. Rates vary by bank — use this as a guide."
        />

        <div className="glass card-glow mt-14 grid gap-10 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-2">
          <div className="space-y-8">
            <Slider label="Property price" value={price} display={taka(price)} min={2_000_000} max={100_000_000} step={500_000} onChange={setPrice} />
            <Slider label="Down payment" value={downPct} display={`${downPct}%`} min={10} max={90} step={5} onChange={setDownPct} />
            <Slider label="Interest rate (yearly)" value={rate} display={`${rate}%`} min={5} max={16} step={0.25} onChange={setRate} />
            <Slider label="Loan term" value={years} display={`${years} years`} min={1} max={25} step={1} onChange={setYears} />
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="relative flex h-56 w-56 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(var(--gold) ${interestShare}%, var(--line) 0)` }}
            >
              <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-ink-2">
                <span className="text-xs uppercase tracking-[3px] text-mute-2">Monthly EMI</span>
                <motion.span key={Math.round(monthly)} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 font-display text-3xl font-semibold text-gold">
                  {taka(monthly)}
                </motion.span>
              </div>
            </div>
            <div className="mt-8 grid w-full grid-cols-2 gap-4 text-sm">
              <div className="glass rounded-2xl p-4">
                <p className="text-mute-2">Loan amount</p>
                <p className="mt-1 font-semibold">{taka(loan)}</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-mute-2"><span className="text-gold">●</span> Total interest</p>
                <p className="mt-1 font-semibold">{taka(total - loan)}</p>
              </div>
            </div>
            <a
              href={waLink(`Hello Arif, I'm looking at a property around ${taka(price)} with about ${downPct}% down payment. Can you help?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-full bg-gold px-8 py-3.5 font-semibold text-black transition hover:bg-gold-soft"
            >
              Find homes in this budget
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
