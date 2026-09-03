/**
 * CircularScoreRing — SVG circular progress ring.
 * Used in the Final Report Summary section.
 *
 * Props:
 *   score       — numeric score (e.g. 81)
 *   maxScore    — max possible (default 100)
 *   size        — SVG width/height in px (default 120)
 *   strokeWidth — ring thickness (default 10)
 *   color       — ring fill color (default sky-blue)
 */
export default function CircularScoreRing({
  score = 0,
  maxScore = 100,
  size = 120,
  strokeWidth = 10,
  color = '#3B82F6',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = maxScore > 0 ? Math.min(score / maxScore, 1) : 0;
  const dashOffset = circumference * (1 - pct);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        {/* Foreground ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Centered score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900 leading-none">{score}</span>
        <span className="text-xs text-slate-400 font-medium">/{maxScore}</span>
      </div>
    </div>
  );
}
