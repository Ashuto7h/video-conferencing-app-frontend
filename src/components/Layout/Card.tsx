import clsx from 'clsx';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { useLayoutStyles } from './layout.styles';

interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Card: FC<ICardProps> = ({ className, ...props }) => {
  const classes = useLayoutStyles();
  return <div {...props} className={clsx(classes.card, className)} />;
};
