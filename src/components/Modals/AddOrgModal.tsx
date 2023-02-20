import { FC, ReactNode, useEffect } from 'react';
import { useAuth } from '../../contexts';
import { Card, Container } from '../Layout';
import { useModalStyles } from './modal.styles';

interface IAddOrgModalProps {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  maxWidth: string;
}
export const AddOrgModal: FC<IAddOrgModalProps> = ({ isOpen, close, children, maxWidth }) => {
  const {
    state: { user }
  } = useAuth();
  const classes = useModalStyles({ isOpen, maxWidth });
  const onEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', onEscape, false);
    return () => {
      document.removeEventListener('keydown', onEscape, false);
    };
  }, []);
  return (
    <div id='openModal' role='button' className={classes.modalWindow} onClick={close}>
      <Card
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <Container>{children}</Container>
      </Card>
    </div>
  );
};
