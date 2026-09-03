/**
 * RadarSkillChart — Recharts RadarChart for Cognitive Aptitude Analysis.
 * Shows 5 axes: Logical Reasoning, Numerical Ability, Verbal Ability, Abstract Reasoning, Problem Solving.
 *
 * Props:
 *   skills      — array of { axis: string, value: number (0–100) }
 *   profileText — optional narrative string for the Cognitive Profile text block
 */
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

const BAND_LEGEND = [
  { label: 'Excellent (85–100)', color: '#10B981' },
  { label: 'Strong (70–84)', color: '#3B82F6' },
  { label: 'Developing (50–69)', color: '#F59E0B' },
  { label: 'Needs Improvement (<50)', color: '#EF4444' },
];

export default function RadarSkillChart({ skills = [], profileText = '' }) {
  if (!skills.length) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        No aptitude data available yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Radar chart */}
      <div className="flex-1 min-w-0">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={skills} outerRadius="75%">
            <PolarGrid stroke="#E2E8F0" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fontSize: 11, fill: '#334155', fontWeight: 500 }}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              tick={{ fontSize: 9, fill: '#94A3B8' }}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.2}
              strokeWidth={2}
              dot={{ fill: '#6366F1', r: 3 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Cognitive Profile + Legend */}
      <div className="flex flex-col gap-4 lg:w-64 shrink-0">
        {profileText && (
          <div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Cognitive Profile</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{profileText}</p>
          </div>
        )}

        {/* Band legend */}
        <div className="space-y-2">
          {BAND_LEGEND.map((band) => (
            <div key={band.label} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: band.color }}
              />
              <span className="text-xs text-slate-600">{band.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
