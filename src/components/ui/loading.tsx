import { cn } from '@/utils/common';

export interface LoadingProps {
  size?: number;
  color?: string;
  className?: string;
}

export const Loading = (props: LoadingProps) => {
  const { size, color, className } = props;
  return (
    <div
      className={cn(
        'align-center flex h-full w-full items-center justify-center bg-transparent hover:cursor-auto',
        className || '',
      )}
    >
      <svg
        className="animate-spin"
        width={size || 23}
        height={size || 23}
        viewBox="0 0 50 50"
        style={{ display: 'block', shapeRendering: 'auto' }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke={color ? `var(--${color})` : 'var(--secondary)'}
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
