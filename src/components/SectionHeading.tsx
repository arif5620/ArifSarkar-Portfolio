import AnimatedSection from "@/components/AnimatedSection";

export default function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <AnimatedSection className="mx-auto max-w-3xl text-center">
      <p className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[5px] text-gold">{eyebrow}</p>
      <h2 className="mt-5 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-6xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
      {text && <p className="mt-6 leading-8 text-zinc-400">{text}</p>}
    </AnimatedSection>
  );
}
