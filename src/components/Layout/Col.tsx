import clsx, { ClassDictionary } from 'clsx';
import { FC, ReactNode } from 'react';
import { useLayoutStyles } from './layout.styles';

interface IColProps {
  className?: string;
  xs?: number | boolean | 'auto';
  sm?: number | boolean | 'auto';
  md?: number | boolean | 'auto';
  lg?: number | boolean | 'auto';
  xl?: number | boolean | 'auto';
  children: ReactNode;
}
const useCol = ({ className, ...props }: IColProps) => {
  const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'] as const;
  const classes = useLayoutStyles({ theme: { ...props } });
  const spans: string | number | boolean | ClassDictionary | null | undefined = [];
  const classMap = {
    lg: classes.colLG,
    md: classes.colMD,
    sm: classes.colSM,
    xl: classes.colXL,
    xs: classes.colXS,
    xxl: classes.colXXL
  };
  breakpoints.forEach((brkPoint) => {
    const span = props[brkPoint];
    if (brkPoint === 'xs' && span === true) return;
    if (span) {
      spans.push(classMap[brkPoint]);
    }
  });
  const filterProps = { ...props };
  for (const key of breakpoints) {
    delete filterProps[key];
  }
  const cols = spans.length ? clsx(spans) : classes.col;
  return [{ ...filterProps, className: clsx(cols, className) }];
};

export const Col: FC<IColProps> = (props) => {
  const [{ ...colProps }] = useCol(props);
  return <div {...colProps} />;
};
