import React from 'react';
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

const Registration = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="registration-leftside">
            <div>
              <Header>
                <Heading
                  className="registration_heading"
                  as="h2"
                  title="Get started with easily register"
                />
                <p className="registration_subheading">
                  Free register and you can enjoy it
                </p>
              </Header>
              <div className="inputBoxContainer">
                <InputBox InputField={inputFieldCss} label="Email Address" />
                <InputBox InputField={inputFieldCss} label="Ful name" />
                <InputBox InputField={inputFieldCss} label="Password" />

                <SignupButton btntitle="Sign up" rbtn={commonButton} />
                <AuthenticationLink
                  className="authentication_htitle"
                  authtitle="Already  have an account ? "
                  linkpath="/login"
                  authlink="Sign In"
                />
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={6}>
          <Image
            className="registrationimg"
            imgsrc="assets/registrationimg.png"
            imgalt="registrationimg"
          />
        </Grid>
      </Grid>
    </>
  );
};

const inputFieldCss = styled(TextField)({
  width: '368.09px',
  marginTop: '8%',
  display: 'flex',
  fontSize: '30px',
  '& label': {
    fontSize: '18px',
    opacity: '0.7',
    marginLeft: '6%',
    marginTop: '3%',
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
    padding: '10px',
    fontSize: '20.64px',
    fontWeight: 600,
    fontFamily: 'Nunito, sans-serif',
    borderRadius: '15px',
    '& fieldset': {
      opacity: '0.3',
      border: '1.72005px solid #11175D',
      paddingLeft: '25px',
    },
    '&:hover fieldset': {
      borderColor: 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});
const commonButton = styled(Button)({
  width: '368.09px',
  padding: '19px 12px',
  border: '1px solid',
  marginTop: '4%',
  borderRadius: '86px',
  lineHeight: 1.5,
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

export default Registration;
