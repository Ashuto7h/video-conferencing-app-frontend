import { ChangeEventHandler, useState } from 'react';
import { Button, InputField, NavBar } from '../../components';
import { useOrg } from '../../contexts';
import { createMeet } from '../../utils/actionHelpers';
import { getMeetingType } from '../../utils/utility';
import { useHomeStyles } from '../Home';
import { useNewMeetingStyles } from './NewMeeting.styles';

export const NewMeeting = () => {
  const { background } = useHomeStyles();
  const classes = useNewMeetingStyles();
  const [meetingType, setMeetingType] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const { organizations } = useOrg();

  const options = ['Open to All', 'Restricted', 'Organization'];

  const handleMeetingTypeRadio: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMeetingType(e.target.value);
  };

  const handleOrganizationRadio: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOrgId(e.target.value);
  };

  const newMeetingHandler = async () => {
    if (meetingTitle.trim().length < 1 || !meetingType) {
      setErrMsg('Empty Fields');
      return;
    }
    if (getMeetingType(meetingType) === 2 && !orgId) {
      setErrMsg('Select an organization');
      return;
    }
    const type = getMeetingType(meetingType);
    console.log(type, orgId);
    const { data, error } = await createMeet({ orgId, title: meetingTitle, type });
    if (error) {
      setErrMsg(error.message);
      return;
    } else {
      console.log(data);
    }
    setMeetingTitle('');
    setOrgId(null);
    setMeetingType(null);
  };

  return (
    <div>
      <NavBar />
      <div className={background}>
        <div className={classes.box}>
          <div className={classes.titleBox}>
            <p>Meeting Title</p>
            <InputField
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              name='title'
              placeholder=''
              type='text'
              width='20rem'
            />
          </div>
          <div className={classes.radioInputs}>
            {options.map((name) => (
              <div key={name}>
                <input
                  type='radio'
                  name='meeting-type'
                  id={name}
                  value={name}
                  onChange={handleMeetingTypeRadio}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </div>
          {meetingType === 'Organization' && (
            <div className={classes.orgList}>
              <p>Organizations</p>
              {organizations.map((org) => (
                <div key={org._id} className={classes.org}>
                  <input
                    type='radio'
                    name='org'
                    id={org._id}
                    value={org._id}
                    onChange={handleOrganizationRadio}
                  />
                  <label htmlFor={org.name}>{org.name}</label>
                </div>
              ))}
            </div>
          )}
          <p className={classes.errorPara}>{errMsg}</p>
          <div className={classes.btn}>
            <Button width='21.125rem' onClick={newMeetingHandler}>
              Start Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
