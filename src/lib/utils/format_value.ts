// ——— helper ——— (probably not needed in production)
export const formatValue = (raw: string) => {
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