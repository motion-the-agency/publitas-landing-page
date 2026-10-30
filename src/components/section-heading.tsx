import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "light",
  id,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "vivid";
  id?: string;
  align?: "left" | "center";
}) {
  const vivid = tone === "vivid";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
          vivid ? "bg-white/70 text-blue" : "bg-sky/10 text-blue"
        }`}
      >
        <span aria-hidden className={`size-1.5 rounded-full ${"bg-sky"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-4xl font-display font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl ${
          "text-navy"
        }`}
      >
        {title}
      </h2>
      {children && (
        <div className={`mt-5 text-lg font-normal leading-relaxed text-pretty ${vivid ? "text-ink" : "text-slate"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
