interface Props {
  tests: { name: string; value: string }[];
  loading?: boolean;
}

// ——— helper ——— (probably not needed in production)
const formatValue = (raw: string) => {
  // captures   1️⃣ first numeric part   2️⃣ everything after it
  const match = raw.match(
    /^([-+]?\d*[.,]?\d+(?:[eE][-+]?\d+)?)(.*)$/   // <- [.,]  (no back-slash)
  );
  if (!match) return raw;

  const [, numStr, suffix] = match;
  const n = parseFloat(numStr.replace(',', '.'));
  if (Number.isNaN(n)) return raw;

  return `${n.toFixed(2)}${suffix}`;
};


export const DiagnosticTestsGrid: React.FC<Props> = ({ tests, loading }) => (
  <div className="w-[65%] overflow-y-auto rounded-sm bg-white p-4 shadow-md">
    {loading ? (
      <div className="text-gray-500">Loading tests…</div>
    ) : tests.length === 0 ? (
      <div className="text-gray-500">Brak wyników.</div>
    ) : (
      <div className="grid grid-cols-3 gap-2">
        {tests.map((test, idx) => (
          <div
            key={idx}
            className="bg-primary flex justify-between rounded-md p-6 shadow-sm"
          >
            <span className="line-clamp-1 text-xs text-white">
              {test.name}
            </span>
            <span className="text-xs font-semibold text-white">
              {formatValue(test.value)}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);
