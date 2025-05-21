export interface LoadingProps {
  size?: number;
}

export const Loading = (props: LoadingProps) => {
  const { size } = props;
  return (
    <div className="align-center bg-foreground flex h-full w-full items-center justify-center">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ margin: 'auto', display: 'block', shapeRendering: 'auto' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="var(--secondary)"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            repeatCount="indefinite"
            values="1,200;90,200;90,200"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            repeatCount="indefinite"
            values="0;-35;-124"
          />
        </circle>
      </svg>
    </div>
  );
};
