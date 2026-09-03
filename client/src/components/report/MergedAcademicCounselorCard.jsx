/**
 * MergedAcademicCounselorCard — Unified section merging Academic Performance + Counselor/PI.
 * Left/top: SubjectBarChart + Strengths & Areas to Improve chips.
 * Right/bottom: Counselor attributes + Counselor's Notes quote block.
 *
 * Props:
 *   marks          — array of { subject, percentage }
 *   strengths      — string[] (strong subjects)
 *   areasToImprove — string[] (weak subjects)
 *   piData         — { rubric_ratings: { communication, problem_solving, creativity, leadership },
 *                      counselor_notes, summary_tags[] } or null
 *   counselorName  — string (from PI history populate)
 */
import { BookOpen, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import SubjectBarChart from './SubjectBarChart';

export default function MergedAcademicCounselorCard({
  marks = [],
  strengths = [],
  areasToImprove = [],
  piData = null,
  counselorName = '',
}) {
  const rubric = piData?.rubric_ratings || {};

  const counselorAttributes = [
    { label: 'Communication', value: rubric.communication, max: 5 },
    { label: 'Problem Solving', value: rubric.problem_solving, max: 5 },
    { label: 'Creativity', value: rubric.creativity, max: 5 },
    { label: 'Leadership', value: rubric.leadership, max: 5 },
  ];

  const ratingToLabel = (val) => {
    if (!val) return '—';
    if (val >= 5) return 'Excellent';
    if (val >= 4) return 'Strong';
    if (val >= 3) return 'Good';
    if (val >= 2) return 'Developing';
    return 'Needs Improvement';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT: Academic Performance */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sky-light flex items-center justify-center">
            <BookOpen size={16} className="text-sky-primary" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Academic Performance
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">
            Teacher
          </span>
        </div>

        {/* Subject chart */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-slate-500 mb-2">Subject Wise Marks (%)</p>
          <SubjectBarChart marks={marks} />
        </div>

        {/* Strengths / Areas to Improve */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold text-green-accent mb-2">Strengths</p>
            <div className="space-y-1.5">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-green-accent shrink-0" />
                  <span className="text-xs text-slate-700">{s}</span>
                </div>
              ))}
              {!strengths.length && (
                <span className="text-xs text-slate-400">No data yet</span>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-accent mb-2">Areas to Improve</p>
            <div className="space-y-1.5">
              {areasToImprove.map((a, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-accent shrink-0" />
                  <span className="text-xs text-slate-700">{a}</span>
                </div>
              ))}
              {!areasToImprove.length && (
                <span className="text-xs text-slate-400">No data yet</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Counselor / Personal Interview */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-light flex items-center justify-center">
            <UserCheck size={16} className="text-purple-accent" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Counselor / Personal Interview
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-semibold">
            Counselor
          </span>
        </div>

        {piData ? (
          <>
            {/* Counselor attributes */}
            <div className="space-y-3 mb-4">
              {counselorAttributes.map((attr) => (
                <div key={attr.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-accent shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{attr.label}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {ratingToLabel(attr.value)}
                  </span>
                </div>
              ))}
            </div>

            {/* Counselor's Notes */}
            {piData.counselor_notes && (
              <div className="bg-purple-light rounded-xl p-4 border border-purple-border">
                <p className="text-xs font-semibold text-purple-accent mb-1">Counselor Notes</p>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{piData.counselor_notes}"
                </p>
                {counselorName && (
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    — {counselorName}, Counselor
                  </p>
                )}
              </div>
            )}

            {/* Interest tags */}
            {piData.summary_tags?.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-slate-500 mb-1.5">Interest Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {piData.summary_tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-purple-light text-purple-accent border border-purple-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
            No counselor interview data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
