export const ItemCardChart = () => {
  const data = [30, 15, 10, 32];
  const hModifier = 5;
  const normalizedData = data.map(
    (value) => ((value + hModifier) / (Math.max(...data) + hModifier)) * 5,
  );
  return (
    <div className="flex h-full w-full items-end gap-1">
      {normalizedData.map((value, index) => (
        <div
          key={index}
          className={`${index === 3 ? 'bg-secondary' : 'bg-secondary-accent'} h-full flex-1 rounded-lg`}
          style={{ height: `${value}rem` }}
        />
      ))}
    </div>
  );
};
