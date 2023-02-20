import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { useLayoutStyles } from './layout.styles';

interface IContainerProps {
  fluid?: boolean | string;
  className?: string;
  children?: ReactNode;
}

export const Container: FC<IContainerProps> = ({ fluid, className, ...props }) => {
  const classes = useLayoutStyles();
  let containerClass = classes.container;
  const classMap = {
    lg: classes.containerLG,
    md: classes.containerMD,
    sm: classes.containerSM,
    xl: classes.containerXL
  };
  if (fluid) {
    if (typeof fluid === 'string') {
      containerClass = classMap[fluid as keyof typeof classMap] ?? classes.containerFluid;
    } else {
      containerClass = classes.containerFluid;
    }
  }
  // const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return <div {...props} className={clsx(containerClass, className)} />;
};
