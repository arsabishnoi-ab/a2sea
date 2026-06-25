type MarqueeProps = {
  /** Rendered content for a single set — duplicated internally for the loop */
  children: React.ReactNode;
  /** Seconds per full loop (lower = faster) */
  duration?: number;
  reverse?: boolean;
  /** Pause the scroll on hover */
  pauseOnHover?: boolean;
  className?: string;
  /** Fade the left/right edges */
  fade?: boolean;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  className,
  fade = true,
}: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden ${pauseOnHover ? "marquee-pause" : ""} ${
        className ?? ""
      }`}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
            }
          : undefined
      }
    >
      <div
        className="marquee-track"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {/* Two identical sets = seamless -50% loop */}
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
