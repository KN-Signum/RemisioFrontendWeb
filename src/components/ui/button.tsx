import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loading } from './loading';

interface ButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean | undefined;
}

function Button({
  children,
  isLoading,
  className,
  type,
  ...props
}: ButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleDivClick = () => {
    if (buttonRef.current && !isLoading) {
      buttonRef.current.click();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      onClick={handleDivClick}
      className={cn(
        'bg-secondary text-foreground rounded-sm px-8 py-2 text-center text-lg font-semibold',
        !isLoading && 'hover:cursor-pointer hover:opacity-80',
        className,
      )}
    >
      <button
        ref={buttonRef}
        type={type}
        {...props}
        disabled={isLoading}
        onClick={handleButtonClick}
      >
        {isLoading ? <Loading color="foreground" /> : children}
      </button>
    </div>
  );
}

export { Button };
