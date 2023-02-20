import { MouseEventHandler } from 'react';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { useFooterStyles } from './Footer.styles';

export const ScreenShareButton = ({
  isOn,
  onClick
}: {
  isOn: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const { roundButton } = useFooterStyles();

  return (
    <button className={roundButton} onClick={onClick}>
      {isOn ? <MdStopScreenShare size='20' /> : <MdScreenShare size='20' />}
    </button>
  );
};
