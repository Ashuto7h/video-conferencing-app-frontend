import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { useLayoutStyles } from './layout.styles';

interface IRowProps {
  className?: string;
  center?: boolean;
  xs?: string | number | 'auto';
  sm?: string | number | 'auto';
  md?: string | number | 'auto';
  lg?: string | number | 'auto';
  xl?: string | number | 'auto';
  children?: ReactNode;
}
export const Row: FC<IRowProps> = ({ className, center, ...props }) => {
  const classes = useLayoutStyles({ center });

  return <div {...props} className={clsx(classes.row, className)} />;
};
