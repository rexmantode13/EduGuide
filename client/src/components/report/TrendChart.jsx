/**
 * TrendChart — Multi-series Recharts LineChart in ResponsiveContainer.
 * Reusable for Progress Overview, Score Trajectory, and Three-Pillar Tracker.
 *
 * Props:
 *   data   — array of objects, e.g. [{ name: 'Assessment 1', academic: 68, aptitude: 64, overall: 66 }, ...]
 *   series — array of { key, name, color }, e.g. [{ key: 'academic', name: 'Academic Marks', color: '#3B82F6' }]
 *   height — chart height in px (default 280)
 */
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function TrendChart({ data = [], series = [], height = 280 }) {
  if (!data.length || !series.length) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        No assessment history available yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: '#64748B' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            fontSize: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
          formatter={(value) => [`${value}%`]}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: '#64748B' }}
        />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={s.color}
            strokeWidth={2.5}
            dot={{ fill: s.color, strokeWidth: 2, r: 4, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
