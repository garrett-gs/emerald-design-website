import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  aspect?: "tall" | "wide" | "square" | "hero" | "photo";
  className?: string;
  /** Set on the homepage hero so it is not lazy-loaded. */
  priority?: boolean;
  /** Matches the column width so the browser fetches a sensibly sized file. */
  sizes?: string;
};

const aspectClass: Record<NonNullable<Props["aspect"]>, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
  hero: "aspect-[4/5] md:aspect-[3/4]",
  photo: "aspect-[4/3]",
};

export function SiteImage({
  src,
  alt,
  aspect = "photo",
  className,
  priority = false,
  sizes = "(min-width: 768px) 42vw, 100vw",
}: Props) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-sm bg-warm", aspectClass[aspect], className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
