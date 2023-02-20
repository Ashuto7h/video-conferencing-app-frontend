import { FC } from 'react';
import { useButtonStyles } from './button.styles';
import { IButtonProps } from './button.types';

export const Button: FC<IButtonProps> = ({
  children,
  onClick,
  bgColor,
  border,
  textColor,
  margin,
  width,
  ...rest
}) => {
  const classes = useButtonStyles({ bgColor, border, margin, textColor, width });
  return (
    <button className={classes.button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
