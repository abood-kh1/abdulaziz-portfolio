interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  urlLabel?: string;
  fit?: "contain" | "cover";
  eager?: boolean;
}

/**
 * Reusable project screenshot component.
 * - Browser-chrome frame integrates screenshots into the site identity
 * - object-fit: contain by default so UI is never cropped or distorted
 * - Lazy-loads below the fold, eager for hero imagery
 */
export default function ProjectImage({
  src,
  alt,
  caption,
  urlLabel,
  fit = "contain",
  eager = false,
}: ProjectImageProps) {
  return (
    <figure className="m-0">
      <div className="shot overflow-hidden rounded-xl border border-line bg-[#0b0a09] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a362e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a362e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          {urlLabel && (
            <span className="ml-3 truncate font-mono text-[11px] tracking-wide text-dim">{urlLabel}</span>
          )}
        </div>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`h-auto w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 flex items-baseline gap-3 font-mono text-[11px] tracking-wider text-dim">
          <span className="text-accent">▸</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
