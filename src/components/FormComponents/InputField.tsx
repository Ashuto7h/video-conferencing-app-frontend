import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  FocusEventHandler,
  InputHTMLAttributes
} from 'react';
import { toSentenceCase } from '../../utils/utility';
import { useFormStyles } from './form-components.styles';

interface InputFieldProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  label?: string;
  width?: string | number;
}
export const InputField: FC<InputFieldProps> = ({
  onChange,
  onBlur,
  name,
  label,
  width,
  ...rest
}) => {
  const classes = useFormStyles({ width });
  return (
    <>
      {label && (
        <label htmlFor={name} className={classes.labelStyle}>
          {toSentenceCase(label)}
        </label>
      )}
      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={classes.inputStyle}
        {...rest}
      />
    </>
  );
};
