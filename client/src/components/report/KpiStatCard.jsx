/**
 * KpiStatCard — Single KPI tile for the Student Identity header.
 * Displays: icon, label, large percentage, qualitative badge, colored progress bar.
 *
 * Props:
 *   label    — "Academic", "Aptitude", "Interview", "Overall Score"
 *   value    — 0–100 numeric percentage
 *   icon     — React node (lucide icon)
 *   color    — hex color for the progress bar and icon bg
 *   quality  — qualitative label string ("Strong", "Good", "Very Good", etc.)
 */
export default function KpiStatCard({ label, value, icon, color, quality }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl p-4 min-w-[120px] flex-1">
      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}18` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>

      {/* Label */}
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
        {label}
      </span>

      {/* Big number */}
      <span className="text-3xl font-bold text-slate-900 leading-none mb-1">
        {value ?? '—'}<span className="text-lg">%</span>
      </span>

      {/* Quality badge */}
      <span className="text-xs font-medium mb-2" style={{ color }}>
        {quality || getQualityLabel(value)}
      </span>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(value || 0, 100)}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function getQualityLabel(value) {
  if (value == null) return '';
  if (value >= 85) return 'Excellent';
  if (value >= 75) return 'Very Good';
  if (value >= 65) return 'Good';
  if (value >= 50) return 'Developing';
  return 'Needs Improvement';
}
