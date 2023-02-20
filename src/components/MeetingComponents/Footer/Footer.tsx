import { FC } from 'react';
import { FiMessageSquare, FiUsers } from 'react-icons/fi';
import { CamButton } from './CamButton';
import { EndCallButton } from './EndCallButton';
import { useFooterStyles } from './Footer.styles';
import { MicButton } from './MicButton';
import { ScreenShareButton } from './ScreenShareButton';

interface IFooterProps {
  meetingCode: string;
  disconnect: () => void;
  isMicOn: boolean;
  isCamOn: boolean;
  onCamClick: () => void;
  onMicClick: () => void;
  isScreenShareOn: boolean;
  onScreenShareClick: () => void;
  setShowSidePanel: (value: boolean) => void;
}
export const Footer: FC<IFooterProps> = ({
  meetingCode,
  disconnect,
  isMicOn,
  onMicClick,
  isCamOn,
  onCamClick,
  isScreenShareOn,
  onScreenShareClick,
  setShowSidePanel
}) => {
  const classes = useFooterStyles();

  return (
    <div className={classes.footer}>
      <p>{`03:00 PM - ${meetingCode}`}</p>
      <div className={classes.userOptions}>
        <MicButton isOn={isMicOn} onClick={onMicClick} />
        <CamButton isOn={isCamOn} onClick={onCamClick} />
        <EndCallButton onClick={disconnect} />
        <ScreenShareButton isOn={isScreenShareOn} onClick={onScreenShareClick} />
      </div>
      <div className={classes.popUpTriggers}>
        <FiUsers
          style={{ cursor: 'pointer' }}
          role='button'
          size='24'
          aria-label='show participants'
          onClick={() => setShowSidePanel(true)}
        />
        <FiMessageSquare
          style={{ cursor: 'pointer' }}
          role='button'
          size='24'
          aria-label='show chat'
          onClick={() => setShowSidePanel(true)}
        />
      </div>
    </div>
  );
};
