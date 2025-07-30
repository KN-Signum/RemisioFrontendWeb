import { Analyte } from '@/features/diagnostic_tests'

interface Test {
  name: Analyte
  value: string
  status: 'low' | 'normal' | 'high'
  history: number[]
}
interface Props { tests: Test[]; loading?: boolean }

const bigTiles: Set<Analyte> = new Set([
  'calprotectin_feces', 'erythrocytes', 'mch', 'hemoglobin', 'hct', 'leukocytes',
  'ob', 'ast', 'bilirubin', 'alkaline_phosphatase', 'basophils', 'mchc',
  'monocytes', 'neutrophils',
])

const splitValue = (v: string) => {
  const m = v.match(/^(-?\d+(?:[.,]\d+)?)\s*(.*)$/)
  if (!m) return { main: v }
  const [, num, rest] = m
  return rest ? { main: num, unit: rest.trim() } : { main: v }
}

const chipColor = {
  normal: 'bg-emerald-100 text-emerald-600',
  high: 'bg-rose-100 text-rose-600',
  low: 'bg-amber-100 text-amber-600',
} as const

const genPath = (vals: number[]) => {
  if (!vals.length) return ''
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const step = 100 / (vals.length - 1)
  const norm = (v: number) =>
    max === min ? 10 : 10 + ((v - min) * 10) / (max - min)
  return vals
    .map((v, i) => `${i ? 'L' : 'M'} ${i * step} ${20 - norm(v)}`)
    .join(' ')
}

export const DiagnosticTestsGrid: React.FC<Props> = ({ tests, loading }) => {
  if (loading) return <div className="text-gray-500">Loading tests…</div>
  if (!tests.length) return <div className="text-gray-500">Brak wyników.</div>

  return (
    <div className="w-[65%] overflow-y-auto rounded-sm bg-white p-1 shadow-md
                    grid grid-cols-6 auto-rows-[5.5rem] gap-1 [grid-auto-flow:dense]">
      {tests.map((t, idx) => {
        const large = bigTiles.has(t.name)
        const span = large ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'
        const bg = large
          ? 'color-mix(in oklch, var(--color-primary) 20%, white)'
          : 'color-mix(in oklch, var(--color-secondary) 20%, white)'

        const { main, unit } = splitValue(t.value)
        const isNumeric = /^-?\d+(?:[.,]\d+)?$/.test(main)

        /* rozmiary tekstu: duże kafle 2xl / xl, małe kafle  xl / lg */
        const size = large
          ? isNumeric ? 'text-2xl' : 'text-xl'
          : isNumeric ? 'text-xl' : 'text-lg'

        /* qualitative value → bez chipa */
        const showChip = unit !== undefined || isNumeric

        const d = genPath(t.history)
        const area = d + ' L 100 20 L 0 20 Z'
        const gradId = `vgrad-${idx}`
        const hGradId = `hgrad-${idx}`
        const maskId = `mask-${idx}`

        return (
          <div key={t.name}
            className={`${span} border rounded-xl p-3 relative flex flex-col justify-between`}
            style={{ backgroundImage: `linear-gradient(235deg, ${bg} 0%, #ffffff 100%)` }}>

            <span className="text-[0.70rem] font-semibold tracking-wide uppercase line-clamp-2 text-gray-700">
              {t.name.replace(/_/g, ' ').toUpperCase()}
            </span>

            <span className={`${size} font-bold leading-none tracking-tight text-gray-900`}>
              {main}
            </span>

            {unit && <span className="text-[0.60rem] text-gray-400">{unit}</span>}

            {large && (
              <svg viewBox="0 0 100 20"
                className="absolute bottom-2 right-2 w-36 h-8 text-emerald-500">
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id={hGradId} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="10%" stopColor="white" stopOpacity="1" />
                    <stop offset="90%" stopColor="white" stopOpacity="1" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <mask id={maskId}>
                    <rect width="100" height="20" fill={`url(#${hGradId})`} />
                  </mask>
                </defs>

                <path d={area} fill={`url(#${gradId})`} mask={`url(#${maskId})`} />
                <path d={d} fill="none" stroke="currentColor"
                  strokeWidth="1" mask={`url(#${maskId})`} />
              </svg>
            )}

            {showChip && (
              <span
                className={`absolute ${large ? 'top-2 right-2' : 'bottom-2 right-2'
                  } px-2 py-[2px] rounded-full text-[0.55rem] font-medium ${chipColor[t.status]}`}
              >
                {t.status === 'normal' ? 'Normal' : t.status === 'high' ? 'High' : 'Low'}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
