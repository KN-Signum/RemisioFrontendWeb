import { Analyte, classify, DiagnosticTestDto, GridTest } from '..';

export const latestTestsToGrid = (
  data: { tests: DiagnosticTestDto[] } | undefined,
): GridTest[] => {
  if (!data?.tests?.length) return [];
  const latest = [...data.tests].sort(
    (a, b) => +new Date(b.test_date) - +new Date(a.test_date),
  )[0];

  return (Object.entries(latest) as [Analyte | string, unknown][])
    .filter(
      ([k, v]) =>
        v !== null &&
        v !== undefined &&
        ![
          'id',
          'patient_id',
          'test_date',
          'created_at',
          'updated_at',
          'test_notes',
        ].includes(k),
    )
    .map(([k, v]) => {
      const name = k as Analyte;
      const numeric = typeof v === 'number' ? v : null;
      const valueStr =
        typeof v === 'boolean' ? (v ? 'Positive' : 'Negative') : v!.toString();
      const hist = data.tests
        .filter((t) => t[name] !== undefined && t[name] !== null)
        .sort((a, b) => +new Date(a.test_date) - +new Date(b.test_date))
        .map((t) => Number(t[name]));
      return {
        name,
        value: valueStr,
        status: classify(name, numeric),
        history: hist,
      };
    });
};
