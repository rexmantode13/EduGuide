/**
 * CareerFitCard — Single career match card for the Career Fit Zone section.
 * Shows rank badge, career title, % fit, mini contribution bars, description, skill chips.
 *
 * Props:
 *   rank            — 1-based rank number
 *   title           — career title string
 *   matchPercentage — 0–100 fit score
 *   description     — one-line "Why it matches" explanation
 *   academicScore   — 0–100 academic contribution (derived)
 *   aptitudeScore   — 0–100 aptitude contribution (derived)
 *   piScore         — 0–100 interview/PI contribution (derived)
 *   skills          — array of skill strings for chip row
 */
export default function CareerFitCard({
  rank = 1,
  title = '',
  matchPercentage = 0,
  description = '',
  academicScore,
  aptitudeScore,
  piScore,
  skills = [],
}) {
  const rankColors = ['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981'];
  const rankColor = rankColors[(rank - 1) % rankColors.length];

  const pillars = [
    { label: 'Academic', value: academicScore },
    { label: 'Aptitude', value: aptitudeScore },
    { label: 'Interview', value: piScore },
  ].filter((p) => p.value != null);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[240px]">
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Rank badge */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: rankColor }}
        >
          {String(rank).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-800 truncate">{title}</h4>
          <span className="text-xl font-bold" style={{ color: rankColor }}>
            {matchPercentage}%
            <span className="text-xs font-medium text-slate-500 ml-1">Fit</span>
          </span>
        </div>
      </div>

      {/* Mini pillar bars */}
      {pillars.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {pillars.map((p) => (
            <div key={p.label} className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-slate-500 w-16 shrink-0">
                {p.label}
              </span>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(p.value, 100)}%`,
                    backgroundColor: rankColor,
                    opacity: 0.7,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Why it matches */}
      {description && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-slate-500 mb-0.5">Why it matches</p>
          <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Skill chips */}
      {skills.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-1.5">Top Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2 py-1 rounded-full"
                style={{ backgroundColor: `${rankColor}15`, color: rankColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
