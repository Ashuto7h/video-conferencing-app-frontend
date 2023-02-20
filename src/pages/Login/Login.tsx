import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import { Button, Card, Container, InputField, PasswordInputField, Row } from '../../components';
import { useAuth } from '../../contexts';
import { globalTheme } from '../../theme';
import { ILoginSuccessPayload } from '../../types';
import { loginUser, notifyGoogleLogin } from '../../utils/actionHelpers';
import { loginSuccess, setIsLoading } from '../../utils/actions';
import { literals } from '../../utils/constants';
import { useSignupStyles } from '../Signup/signup.styles';
import { useLoginStyles } from './login.styles';

export const Login = () => {
  const classes = useLoginStyles();
  const signupClasses = useSignupStyles();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errMsg, setErrMsg] = useState(null);
  const {
    state: { isLoading },
    dispatch
  } = useAuth();
  const { signIn } = useGoogleLogin({
    clientId: '234832827395-hu97uqhpetag61et1nup430v2seo8o1d.apps.googleusercontent.com',
    fetchBasicProfile: true,
    onFailure: (res) => {
      console.error('fail res', res);
    },
    onSuccess: (response) => {
      const data: ILoginSuccessPayload = {};
      if ('profileObj' in response) {
        const { email, imageUrl, name } = response.profileObj;
        data.email = email;
        data.imageUrl = imageUrl;
        data.name = name;
      }
      if ('authToken' in response) {
        const token = response.authToken as string;
        data.token = token;
      }
      notifyGoogleLogin(data);
      dispatch(loginSuccess(data));
    }
  });

  const onChangeCallback: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setCredentials({ ...credentials, [target.name]: target.value });

  const isFieldsEmpty = !credentials.email.trim().length || !credentials.password.trim().length;

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(setIsLoading(true));
    const response = await loginUser(credentials);
    if (response?.error) {
      setErrMsg(
        response.error.response?.data?.error ||
          response.error.response?.data?.message ||
          response.error.message
      );
    } else if (response?.payload) {
      dispatch(loginSuccess(response.payload));
    }
    dispatch(setIsLoading(false));
  };

  return (
    <div className={clsx(signupClasses.centerDiv, classes.background)}>
      <Container>
        <Row center className={signupClasses.headRow}>
          <h1 className={classes.heading}>
            {literals.NAME} {isLoading && 'loading'}
          </h1>
        </Row>
        <Row center>
          <Card>
            <Row center className={classes.subHeading}>
              Log In to {literals.NAME}
            </Row>
            <Row className={classes.error} center>
              <p className={classes.errorPara}>{errMsg}</p>
            </Row>
            <form className={signupClasses.form} onSubmit={submitHandler}>
              <InputField
                onChange={onChangeCallback}
                value={credentials.email}
                name='email'
                placeholder='Enter your email'
                type='email'
                width='20rem'
                label='Email'
              />
              <PasswordInputField
                onChange={onChangeCallback}
                value={credentials.password}
                name='password'
                placeholder='Enter your password'
                width='20rem'
                label='Password'
              />
              <Button width='20rem' margin='1rem 0 0' disabled={isFieldsEmpty || isLoading}>
                Log In
              </Button>
              <Button
                width='20rem'
                margin='1rem 0 0'
                onClick={() => setCredentials({ email: 'test@test.com', password: 'test@123' })}>
                Use test Credentials
              </Button>
            </form>
            <Row center>Or</Row>
            <Row center>
              <Button
                width='20rem'
                bgColor='white'
                border='2px solid'
                textColor={globalTheme.greyColor}
                margin='0.5rem'
                onClick={signIn}>
                Continue with Google
              </Button>
            </Row>
            <Row center>
              <div className={classes.line} />
            </Row>
            <Row center className={classes.mb1}>
              <Link to='/signup'>Don&apos;t have an account? Sign up</Link>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
