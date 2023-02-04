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
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';

const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  let [pro, setPro] = useState(0);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    fullName: '',
    password: '',
  });
  const handleForm = (e) => {
    const { name, value } = e.target;
    //     if(name == "password"){
    //   console.log(pro)
    //   let capi = /[A-Z]/
    //   let lower = /[a-z]/
    //   let num = /[0-9]/
    //   console.log(value)
    //   if(!capi.test(value)){
    //     setError({...error,password: "One Capital  LEtter Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(!lower.test(value)){
    //     setError({...error,password: "One Lower LEtter Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(!num.test(value)){
    //     setError({...error,password: "One Number Required"})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){

    //       setPro(pro+25)
    //     }
    //   }

    //   if(value.length < 6){
    //     setError({...error,password: "Paaword length atleast 6 "})
    //     if(!lower.test(value) && !capi.test(value) && !num.test(value)){
    //       setPro(pro-25)
    //     }
    //     return
    //   }else{
    //     if(pro < 100){
    //       setPro(pro+25)
    //     }
    //   }

    // }
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: '' });
  };
  const handleClick = (e) => {
    e.preventDefault();

    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (formData.email === '') {
      setError({ ...error, email: 'Email is Required' });
    } else if (!expression.test(formData.email)) {
      setError({ ...error, email: 'Valid Email Required' });
    } else if (formData.fullName === '') {
      setError({ ...error, fullName: 'Name is Required' });
    } else if (formData.password === '') {
      setError({ ...error, password: 'Password is Required' });
    } else {
      setLoader(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: formData.fullName,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                set(ref(db, 'users/' + userCredential.user.uid), {
                  displayName: userCredential.user.displayName,
                  email: userCredential.user.email,
                }).then(() => {
                  setLoader(false);
                  toast.success(
                    'Registration successfull. Please Check Your Email'
                  );
                  setTimeout(() => {
                    navigate('/login');
                  }, 3000);
                });
              });
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes('auth/email-already-in-use')) {
            setError({ ...error, email: 'Email Already use' });
          }
        });
    }
  };
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
                <InputBox
                  name="email"
                  onChange={handleForm}
                  type="email"
                  InputField={inputFieldCss}
                  label="Email Address"
                />
                {error.email && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.email}
                  </Alert>
                )}
                <InputBox
                  name="fullName"
                  onChange={handleForm}
                  type="text"
                  InputField={inputFieldCss}
                  label="Full name"
                />
                {error.fullName && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.fullName}
                  </Alert>
                )}
                <div style={{ position: 'relative' }}>
                  <InputBox
                    name="password"
                    onChange={handleForm}
                    type={show ? 'text' : 'password'}
                    InputField={inputFieldCss}
                    label="Password"
                  />
                  {show ? (
                    <BsFillEyeFill
                      onClick={() => setShow(false)}
                      className="eyeicon"
                    />
                  ) : (
                    <BsFillEyeSlashFill
                      onClick={() => setShow(true)}
                      className="eyeicon"
                    />
                  )}
                  <LinearProgress
                    className="progress"
                    variant="determinate"
                    value={pro}
                  />
                </div>
                {error.password && (
                  <Alert className="error" variant="filled" severity="error">
                    {error.password}
                  </Alert>
                )}
                <ToastContainer position="top-left" autoClose={3000} />
                {loader ? (
                  <div className="register-loading">
                    <Oval
                      height={70}
                      width={70}
                      color="#5F34F5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#ddd"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>
                ) : (
                  <SignupButton
                    onClick={handleClick}
                    btntitle="Sign up"
                    rbtn={commonButton}
                  />
                )}
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
    padding: '5px',
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
  marginTop: '5%',
  borderRadius: '86px',
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

export default Registration;
