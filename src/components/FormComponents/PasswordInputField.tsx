import {
  ChangeEventHandler,
  DetailedHTMLProps,
  FC,
  FocusEventHandler,
  InputHTMLAttributes,
  useState
} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toSentenceCase } from '../../utils/utility';
import { useFormStyles } from './form-components.styles';

interface IPasswordInputFieldProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label: string;
  name: string;
  width: string | number;
}
export const PasswordInputField: FC<IPasswordInputFieldProps> = ({
  onChange,
  onBlur,
  label,
  name,
  width,
  ...rest
}) => {
  const classes = useFormStyles({ width });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {label && (
        <label htmlFor={name} className={classes.labelStyle}>
          {toSentenceCase(label)}
        </label>
      )}
      <div className={classes.passwordInputStyle}>
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          onBlur={onBlur}
          className={classes.passwordInnerField}
          name={name}
          {...rest}
        />
        <i
          onClick={() => setShowPassword(!showPassword)}
          className={classes.togglePasswordIcon}
          aria-label='toggle password visibility'
          role='button'>
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </i>
      </div>
    </>
  );
};
