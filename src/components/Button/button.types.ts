import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from 'react';

export interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  border?: string;
  textColor?: string;
  margin?: string;
  width?: string;
}

export type TButtonStyleProps = Omit<IButtonProps, 'onClick'>;
