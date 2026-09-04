/**
 * TimelineStepper — Horizontal 3-phase action plan timeline.
 * Matches the reference "Recommended Action Plan" section.
 *
 * Props:
 *   phases — array of { title: string, items: string[] }
 *            e.g. [{ title: 'Next 30 Days', items: ['Improve verbal reasoning', ...] }]
 */
import { Circle, CheckCircle2 } from 'lucide-react';

export default function TimelineStepper({ phases = [] }) {
  if (!phases.length) return null;

  const colors = ['#3B82F6', '#8B5CF6', '#10B981'];
  const bgColors = ['#EFF6FF', '#F5F3FF', '#ECFDF5'];

  return (
    <div className="flex flex-col md:flex-row gap-0 relative">
      {/* Connecting line (desktop) */}
      <div className="hidden md:block absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />

      {phases.map((phase, i) => (
        <div key={i} className="flex-1 relative z-10">
          {/* Phase header with dot */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: bgColors[i] || bgColors[0] }}
            >
              {i === 0 ? (
                <CheckCircle2 size={18} style={{ color: colors[i] }} />
              ) : (
                <Circle size={18} style={{ color: colors[i] || colors[0] }} />
              )}
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: colors[i] || colors[0] }}
            >
              {phase.title}
            </span>
          </div>

          {/* Bullet items */}
          <ul className="ml-5 space-y-1.5 pr-4">
            {phase.items.map((item, j) => (
              <li key={j} className="text-sm text-slate-600 flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
