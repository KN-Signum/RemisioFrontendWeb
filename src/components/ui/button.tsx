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
  return (
    <div
      className={cn(
        'bg-secondary text-foreground rounded-sm px-8 py-2 text-center text-lg font-semibold',
        !isLoading && 'hover:cursor-pointer hover:opacity-80',
        className,
      )}
    >
      <button type={type} {...props} disabled={isLoading}>
        {isLoading ? <Loading color="foreground" /> : children}
      </button>
    </div>
  );
}

export { Button };
