import { createUseStyles } from 'react-jss';
import { TTheme } from '../../theme';

export const useSpinnerStyles = createUseStyles((theme: TTheme) => ({
  spinner: {
    animationDuration: '1000ms',
    animationIterationCount: 'infinite',
    animationName: 'spin',
    animationTimingFunction: 'linear',
    color: theme.btnPrimaryColor
  }
}));
