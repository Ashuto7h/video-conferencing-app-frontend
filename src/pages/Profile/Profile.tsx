import { FaRegUserCircle } from 'react-icons/fa';
import { Button, NavBar, Organizations } from '../../components';
import { useProfileStyles } from './Profile.styles';
import { updateUrl } from '../../utils/actionHelpers';
import { useAuth } from '../../contexts';
import { v2 } from 'cloudinary';
import { MouseEventHandler } from 'react';

export const Profile = () => {
  const { outerContainer, heading, accountInfo, infoText, userAvatar } = useProfileStyles();
  const {
    state: { user },
    dispatch
  } = useAuth();

  const openWidget: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    (window as any).cloudinary
      .createUploadWidget(
        {
          cloudName: 'nova-socials-cloud',
          cropping: true,
          uploadPreset: 'ml_default'
        },
        async (error: unknown, result: any) => {
          if (result.info?.secure_url) {
            console.log(result.info.secure_url);
            dispatch({ payload: result.info.secure_url, type: 'UPDATE_PROFILE_IMG' });
            await updateUrl({ imageUrl: result.info.secure_url });
          }
        }
      )
      .open();
  };

  return (
    <div>
      <NavBar />
      <div className={outerContainer}>
        <div>
          <p className={heading}>Account Info</p>
          <div className={accountInfo}>
            <div>
              {user?.imageUrl ? (
                <img
                  src={user?.imageUrl}
                  alt='avatar'
                  loading='lazy'
                  referrerPolicy='no-referrer'
                  className={userAvatar}
                />
              ) : (
                <FaRegUserCircle size='6rem' aria-label='default avatar' />
              )}
            </div>
            <div className={infoText}>
              <p>{`Name - ${user?.name}`}</p>
              <p>{`Email - ${user?.email}`}</p>
            </div>
          </div>
          <Button width='11rem' onClick={openWidget}>
            Change Avatar
          </Button>
        </div>
        <div>
          <p className={heading}>Organizations</p>
          <Organizations />
        </div>
      </div>
    </div>
  );
};
