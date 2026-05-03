import { cn } from "@/lib/cn";

type Props = {
  label: string;
  aspect?: "tall" | "wide" | "square" | "hero";
  className?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
  hero: "aspect-[4/5] md:aspect-[3/4]",
};

export function ImagePlaceholder({ label, aspect = "wide", className }: Props) {
  return (
    <div
      data-image-placeholder
      data-image-label={label}
      className={cn(
        "relative w-full overflow-hidden rounded-sm bg-emerald-deep/90",
        aspectClass[aspect],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
      <div className="absolute inset-0 flex items-end p-6 md:p-8">
        <p className="font-display italic text-cream/70 text-sm md:text-base max-w-xs leading-snug">
          {label}
        </p>
      </div>
    </div>
  );
}
