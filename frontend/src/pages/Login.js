import React, { useState } from 'react';
import Header from '../components/Header';
import Heading from '../components/Heading';
import InputBox from '../components/InputBox';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Image from '../components/Image';
import SignupButton from '../components/SignupButton';
import AuthenticationLink from '../components/AuthenticationLink';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const Login = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };
  const handleClick = () => {
    if (formData.email == '') {
      setError({ ...error, email: 'Email is Required' });
    } else if (formData.password == '') {
      setError({ ...error, password: 'Password is Required' });
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="login-leftside">
            <div>
              <Header>
                <Heading
                  className="registration_heading"
                  as="h2"
                  title="Login to your account!"
                />
                <Link to="/">
                  <Image
                    className="googleimg"
                    imgsrc="assets/google.png"
                    imgalt="googleimg"
                  />
                </Link>
              </Header>
              <div className="inputBoxContainer">
                <InputBox
                  onChange={handleForm}
                  name="email"
                  type="email"
                  InputField={inputFieldCss}
                  label="Email Address"
                />
                {error.email && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.email}
                  </Alert>
                )}
                <div style={{ position: 'relative' }}>
                  <InputBox
                    onChange={handleForm}
                    name="password"
                    type={show ? 'text' : 'password'}
                    InputField={inputFieldCss}
                    label="Password"
                  />
                  {show ? (
                    <BsFillEyeFill
                      onClick={() => setShow(false)}
                      className="eyeicon2"
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={() => setShow(true)}
                      className="eyeicon2"
                    />
                  )}
                </div>
                {error.password && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.password}
                  </Alert>
                )}

                <SignupButton
                  onClick={handleClick}
                  btntitle="Login to Continue"
                  rbtn={commonButton}
                />
                <AuthenticationLink
                  className="authentication_htitle2"
                  authtitle="Don’t have an account ? "
                  linkpath="/"
                  authlink=" Sign up"
                />
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Image
            className="registrationimg"
            imgsrc="assets/login-img.png"
            imgalt="loginimg"
          />
        </Grid>
      </Grid>
    </>
  );
};

const inputFieldCss = styled(TextField)({
  width: '360.09px',
  marginTop: '10%',
  display: 'flex',
  fontSize: '30px',
  '& label': {
    fontSize: '18px',
    opacity: '0.7',

    marginTop: '2%',
    fontWeight: 400,
    color: '#11175D',
    fontFamily: 'Nunito, sans-serif',
  },
  '& label.Mui-focused': {
    color: 'black',
    marginTop: '-.2%',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    color: '#11175D',
    paddingTop: '5px',
    borderRadius: '0px',
    paddingBottom: '5px',
    fontSize: '20.64px',
    fontWeight: 600,
    fontFamily: 'Nunito, sans-serif',
    '& fieldset': {
      opacity: '0.3',
      borderBottom: '2.72005px solid #11175D',
      paddingLeft: '25px',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    },
    '&:hover fieldset': {
      color: 'red',
      borderBottom: '2.72005px solid',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
    },
    '&.Mui-focused fieldset': {
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderColor: 'green',
      borderBottom: '2.72005px solid green',
    },
  },
});
const commonButton = styled(Button)({
  width: '368.09px',
  padding: '26px 12px',
  border: '1px solid',
  marginTop: '10%',
  borderRadius: '10px',
  lineHeight: 1.5,
  background: '#5F34F5',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: 'green',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

export default Login;
