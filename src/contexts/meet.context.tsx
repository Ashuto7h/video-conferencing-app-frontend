import { ReactNode } from 'react';
import {
  createContext,
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createSocketInstance,
  IMessage,
  IVideoData,
  SocketConnection
} from '../utils/socketInstance';
import { useAuth } from './auth.context';

interface IMeetContext {
  displayStream: boolean;
  isCamOn: boolean;
  isMicOn: boolean;
  messages: IMessage[];
  onCamClick: () => void;
  onDisconnect: () => void;
  onMicClick: () => void;
  onScreenShareClick: () => void;
  participants: Record<string, string>[];
  sendMessage: (msg: string) => void;
  socketInstance: MutableRefObject<SocketConnection | null>;
  videos: Record<string, IVideoData>;
}
export const MeetContext = createContext<IMeetContext | null>(null);

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const socketInstance = useRef<SocketConnection | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const {
    state: { user }
  } = useAuth();
  const navigate = useNavigate();
  const [displayStream, setDisplayStream] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [participants, setParticipants] = useState<Record<string, string>[]>([]);
  const [videos, setVideos] = useState<Record<string, IVideoData>>({});

  const addParticipant = (participant: Record<string, string>) =>
    setParticipants((prevState) => [...prevState, participant]);
  const message = (message: IMessage) => setMessages((prevState) => [...prevState, message]);
  const removeParticipant = (removeId: string) =>
    setParticipants((prevState) => prevState.filter((peer) => peer.userId !== removeId));

  const startConnection = () => {
    socketInstance.current = createSocketInstance({
      setDisplayStream,
      setVideos,
      addParticipant,
      message,
      removeParticipant,
      userDetails: user
    });
  };

  const onDisconnect = () => {
    console.log('disconnect');
    socketInstance.current?.destroyConnection();
    navigate('/');
    window.location.reload();
  };

  const onMicClick = () => {
    if (socketInstance.current) {
      const { getMyVideo, reInitializeStream } = socketInstance.current;
      const myVideo = getMyVideo();
      if (myVideo && myVideo.srcObject instanceof MediaStream)
        myVideo.srcObject?.getAudioTracks().forEach((track) => {
          if (track.kind === 'audio')
            // track.enabled = !isMicOn;
            isMicOn ? track.stop() : reInitializeStream(isCamOn, !isMicOn);
        });
      setIsMicOn(!isMicOn);
    }
  };

  const onCamClick = () => {
    if (!displayStream && socketInstance.current) {
      const { toggleVideoTrack } = socketInstance.current;
      toggleVideoTrack({ audio: isMicOn, video: !isCamOn });
      setIsCamOn(!isCamOn);
    }
  };

  const onScreenShareClick = () => {
    if (socketInstance.current) {
      const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
      displayStream && toggleVideoTrack({ audio: true, video: false });
      reInitializeStream(false, true, !displayStream ? 'displayMedia' : 'userMedia').then(() => {
        setDisplayStream(!displayStream);
        setIsCamOn(false);
      });
    }
  };

  const sendMessage = (msg: string) => {
    socketInstance.current?.sendMessage(msg);
  };

  useEffect(() => {
    startConnection();
    return () => {
      socketInstance.current?.destroyConnection();
    };
  }, []);

  return (
    <MeetContext.Provider
      value={{
        displayStream,
        isCamOn,
        isMicOn,
        messages,
        onCamClick,
        onDisconnect,
        onMicClick,
        onScreenShareClick,
        participants,
        sendMessage,
        socketInstance,
        videos
      }}>
      {children}
    </MeetContext.Provider>
  );
};

export const useMeet = () => {
  const context = useContext(MeetContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
