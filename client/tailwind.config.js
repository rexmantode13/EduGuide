export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0F172A',
        'brand-blue': '#4F46E5',
        'bg-ambient': '#FAFBFC',
        'slate-800': '#1E293B',
        /* Sky Blue Bento Box — Report palette */
        'sky-primary': '#3B82F6',
        'sky-dark': '#2563EB',
        'sky-light': '#EFF6FF',
        'sky-border': '#BFDBFE',
        'purple-accent': '#8B5CF6',
        'purple-light': '#F5F3FF',
        'purple-border': '#DDD6FE',
        'green-accent': '#10B981',
        'green-light': '#ECFDF5',
        'green-border': '#A7F3D0',
        'amber-accent': '#F59E0B',
        'amber-light': '#FFFBEB',
        'amber-border': '#FDE68A',
        'orange-accent': '#F97316',
        'orange-light': '#FFF7ED',
      },
      fontFamily: {
        heading: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
