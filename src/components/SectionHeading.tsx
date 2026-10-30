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
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[5px] text-gold">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
      {text && <p className="mt-6 leading-8 text-zinc-400">{text}</p>}
    </div>
  );
}
