import { createUseStyles } from 'react-jss';

export const useFooterStyles = createUseStyles(() => ({
  endCallButton: {
    backgroundColor: 'rgba(253, 0, 0, 0.33)',
    border: '0.125rem solid black',
    borderRadius: '100%',
    height: '2.5rem',
    outline: 'none',
    padding: '0.5rem',
    transform: 'rotate(135deg)',
    width: '2.5rem'
  },
  footer: {
    alignItems: 'center',
    borderRadius: '0.875rem',
    boxShadow: '0rem 0.25rem 1.0625rem 0.1875rem rgba(0, 0, 0, 0.25)',
    display: 'flex',
    height: '3.2rem',
    padding: '0 1.5rem',
    width: '100vw'
  },
  popUpTriggers: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    width: '5rem'
  },
  roundButton: {
    backgroundColor: 'white',
    border: '0.125rem solid black',
    borderRadius: '100%',
    height: '2.5rem',
    outline: 'none',
    padding: '0.5rem',
    width: '2.5rem'
  },
  userOptions: {
    border: '0.125rem solid black',
    justifyContent: 'space-evenly',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '10rem'
  }
}));
