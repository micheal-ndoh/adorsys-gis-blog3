import { type HTMLProps, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Container({
  className,
  ...props
}: PropsWithChildren<HTMLProps<any>>) {
  return (
    <div className={twMerge('container mx-auto px-3 sm:px-4 md:px-6 lg:px-8', className)} {...props} />
  );
}
