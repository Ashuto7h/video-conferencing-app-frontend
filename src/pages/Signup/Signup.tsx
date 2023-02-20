import clsx from 'clsx';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import { useGoogleLogin, GoogleLoginResponse } from 'react-google-login';
import {
  Button,
  Card,
  Col,
  Container,
  InputField,
  PasswordInputField,
  Row
} from '../../components';
import { useAuth } from '../../contexts';
import { globalTheme } from '../../theme';
import { ILoginSuccessPayload } from '../../types';
import { notifyGoogleLogin, signupUser } from '../../utils/actionHelpers';
import { loginSuccess, setIsLoading } from '../../utils/actions';
import { literals } from '../../utils/constants';
import { useLoginStyles } from '../Login/login.styles';
import { useSignupStyles } from './signup.styles';

export const Signup = () => {
  const loginClasses = useLoginStyles();
  const classes = useSignupStyles();
  const [errMsg, setErrMsg] = useState('');
  const {
    state: { isLoading },
    dispatch
  } = useAuth();

  const { loaded, signIn } = useGoogleLogin({
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
    },
    prompt: 'select_account'
  });

  const [formValues, setFormValues] = useState({
    confirmPass: '',
    email: '',
    name: '',
    password: ''
  });

  const areFieldsEmpty = () => {
    for (const value of Object.values(formValues)) {
      if (!value.trim().length) return true;
    }
    return false;
  };

  const onChangeCB: ChangeEventHandler<HTMLInputElement> = ({ target: { name, value } }) => {
    setFormValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    signupUser(formValues).then((response) => {
      if (response) {
        if (response.error) {
          setErrMsg(
            response.error.response?.data?.error ||
              response.error.response?.data?.message ||
              response.error.message
          );
        } else if (response.payload) {
          dispatch(loginSuccess(response.payload));
        }
      }
    });
    dispatch(setIsLoading(false));
  };

  const isDisabled = areFieldsEmpty() || isLoading;

  return (
    <div className={clsx(classes.centerDiv, loginClasses.background)}>
      <Container>
        <Row center className={classes.headRow}>
          <h1 className={loginClasses.heading}> {literals.NAME}</h1>
        </Row>
        <Row center>
          <Card>
            <Row center className={loginClasses.subHeading}>
              Sign up for your account
            </Row>
            <Row className={loginClasses.error} center>
              <p className={loginClasses.errorPara}>{errMsg}</p>
            </Row>
            <form onSubmit={submitHandler} className={classes.form}>
              <Row center>
                <Col>
                  <InputField
                    onChange={onChangeCB}
                    value={formValues.name}
                    name='name'
                    placeholder='Enter your name'
                    width='20rem'
                    label='Name'
                  />
                  <InputField
                    onChange={onChangeCB}
                    value={formValues.email}
                    name='email'
                    placeholder='Enter your email'
                    type='email'
                    width='20rem'
                    label='Email'
                  />
                  <PasswordInputField
                    onChange={onChangeCB}
                    value={formValues.password}
                    name='password'
                    placeholder='Enter your password'
                    width='20rem'
                    label='Password'
                  />
                  <PasswordInputField
                    onChange={onChangeCB}
                    value={formValues.confirmPass}
                    name='confirmPass'
                    placeholder='Enter same password again'
                    width='20rem'
                    label='Confirm Password'
                  />
                  <Row center>
                    <Button width='20rem' margin='0.5rem 0 0 0' disabled={isDisabled} type='submit'>
                      Sign up
                    </Button>
                  </Row>
                </Col>
              </Row>
            </form>
            <Row center>Or</Row>
            <Row center>
              <Button
                width='20rem'
                bgColor='white'
                textColor={globalTheme.greyColor}
                border='2px solid'
                margin='0.5rem 0 1rem'
                onClick={signIn}>
                Continue with Google
              </Button>
            </Row>
          </Card>
        </Row>
      </Container>
    </div>
  );
};
