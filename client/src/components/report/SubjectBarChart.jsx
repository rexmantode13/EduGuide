/**
 * SubjectBarChart — Horizontal bar chart of subject-wise marks.
 * Matches the reference "Academic Performance" section.
 *
 * Props:
 *   marks — array of { subject: string, percentage: number }
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';

export default function SubjectBarChart({ marks = [] }) {
  if (!marks.length) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        No subject marks available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={marks.length * 50 + 30}>
      <BarChart
        data={marks}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
        barSize={18}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: '#64748B' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="subject"
          width={110}
          tick={{ fontSize: 12, fill: '#334155', fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            fontSize: 12,
          }}
          formatter={(value) => [`${value}%`, 'Marks']}
        />
        <Bar dataKey="percentage" radius={[0, 6, 6, 0]}>
          {marks.map((entry, i) => (
            <Cell key={i} fill={getBarColor(entry.percentage)} />
          ))}
          <LabelList
            dataKey="percentage"
            position="right"
            style={{ fontSize: 12, fontWeight: 600, fill: '#334155' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function getBarColor(pct) {
  if (pct >= 80) return '#3B82F6';
  if (pct >= 60) return '#6366F1';
  if (pct >= 40) return '#F59E0B';
  return '#EF4444';
}
