import { createUseStyles } from 'react-jss';
import { globalTheme, TTheme } from '../../theme';
import { TButtonStyleProps } from './button.types';

export const useButtonStyles = createUseStyles((theme: TTheme) => ({
  button: {
    '&:disabled': {
      '&:hover': {
        cursor: 'not-allowed'
      },

      background: theme.btnDisabledColor,
      cursor: 'not-allowed'
    },

    '&:hover': {
      boxShadow: '0 4px 12px 2px rgb(0 0 0 / 25%)',
      cursor: 'pointer'
    },

    background: (props: TButtonStyleProps) =>
      props?.bgColor ? props.bgColor : theme.btnPrimaryColor,
    border: (props: TButtonStyleProps) => (props?.border ? props.border : 'none'),
    borderRadius: '0.3rem',
    color: (props: TButtonStyleProps) => (props?.textColor ? props.textColor : 'white'),
    fontFamily: globalTheme.fontFamily,
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: (props: TButtonStyleProps) => (props?.margin ? props.margin : '0'),
    padding: '0.7rem 0',
    width: (props: TButtonStyleProps) => (props?.width ? props.width : '100%')
  }
}));
