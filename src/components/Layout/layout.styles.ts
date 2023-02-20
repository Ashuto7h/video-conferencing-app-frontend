import { createUseStyles } from 'react-jss';
import { parseNum } from '../../utils/utility';

enum ColType {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

interface IColStyle {
  flex: string;
  width?: string;
}

const colCreater = (type: ColType, props: LayoutProps) => {
  const colValue = props?.[type];
  const style: IColStyle = {
    flex: colValue === true ? '1 0' : '0 0 auto'
  };
  if (colValue === 'auto') {
    style.width = 'auto';
  } else {
    const span = typeof colValue === 'string' ? parseNum(colValue) : 0;
    if (span !== 0) {
      style.width = `${(100 / 12) * span}%`;
    }
  }
  return style;
};
type LayoutProps = Partial<Record<ColType, undefined | number | 'auto' | boolean>> & {
  center?: boolean;
};

export const useLayoutStyles = createUseStyles<
  string,
  { theme: LayoutProps; center?: boolean } | LayoutProps,
  LayoutProps
>((props) => ({
  '@media (min-width: 10px)': { colXS: colCreater(ColType.XS, props) },
  '@media (min-width: 576px)': { colSM: colCreater(ColType.SM, props) },
  '@media (min-width: 768px)': { colMD: colCreater(ColType.MD, props) },
  '@media (min-width: 992px)': { colLG: colCreater(ColType.LG, props) },
  '@media (min-width: 1200px)': { colXL: colCreater(ColType.XL, props) },
  '@media (min-width: 1400px)': { colXXL: colCreater(ColType.XL, props) },

  baseContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    width: '100%'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.7rem',
    boxShadow: '0 4px 15px 3px rgb(0 0 0 / 25%)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '2rem',
    minWidth: '2rem',
    padding: '0.5rem'
  },

  col: { flex: '1 0' },
  colLG: {},
  colMD: {},
  colSM: {},
  colXL: {},
  colXS: {},

  colXXL: {},

  minWidth1200: {
    '@media (min-width:1200px)': {
      'max-width': '1140px'
    }
  },

  minWidth992: {
    '@media (min-width: 992px)': {
      'max-width': '960px'
    }
  },

  minWidth768: {
    '@media (min-width: 768px)': {
      'max-width': '720px'
    }
  },
  minWidth576: {
    '@media (min-width: 576px)': {
      'max-width': '540px'
    }
  },

  container: {
    extend: ['baseContainer', 'minWidth576', 'minWidth768', 'minWidth992', 'minWidth1200']
  },

  containerFluid: {
    extend: ['baseContainer']
  },

  containerLG: {
    extend: ['baseContainer', 'minWidth992', 'minWidth1200']
  },

  containerMD: {
    extend: ['baseContainer', 'minWidth768', 'minWidth992', 'minWidth1200']
  },

  containerSM: {
    extend: ['baseContainer', 'minWidth576', 'minWidth768', 'minWidth992', 'minWidth1200']
  },

  containerXL: {
    extend: ['baseContainer', 'minWidth1200']
  },

  row: (props) => ({
    '& > *': {
      flexShrink: 0,
      maxWidth: '100%',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem'
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: props?.center ? 'center' : 'normal',
    marginTop: '0.5rem'
  })
}));
