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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { activeUser } from './slices/UserSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fgp: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    } else {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          dispatch(activeUser(userCredential.user));
          localStorage.setItem('userInfo', JSON.stringify(userCredential.user));
          if (userCredential.user.emailVerified) {
            toast.success('Login Successfully');
            setTimeout(() => {
              navigate('/pechal');
            }, 3000);
          } else {
            toast('Please Verify your email first and try again');
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes('auth/wrong-password')) {
            setError({ ...error, password: 'Your Password is Invalid' });
          } else if (errorCode.includes('auth/user-not-found')) {
            setError({ ...error, email: 'Your Email is Invalid' });
          }
        });
    }
  };
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigate('/home');
    });
  };
  const handleFgp = () => {
    sendPasswordResetEmail(auth, formData.fgp)
      .then(() => {
        toast.success('Please check your Email and reset your password');
        setTimeout(() => {
          setOpen(false);
        }, 4000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode.includes('auth/user-not-found')) {
          toast.error('Your email is invalid ! please try again');
        }
      });
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ToastContainer position="top-left" autoClose={3000} />
          <div className="login-leftside">
            <div>
              <Header>
                <Heading
                  className="registration_heading"
                  as="h2"
                  title="Login to your account!"
                />

                <Image
                  onClick={handleGoogle}
                  className="googleimg"
                  imgsrc="assets/google.png"
                  imgalt="googleimg"
                />
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
                    btntitle="Login to Continue"
                    rbtn={commonButton}
                  />
                )}

                <AuthenticationLink
                  className="authentication_htitle2"
                  authtitle="Don’t have an account ? "
                  linkpath="/"
                  authlink=" Sign up"
                />
                <ForgotButton onClick={handleOpen}>
                  Forgot Password
                </ForgotButton>
              </div>
            </div>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Forgot Password
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <InputBox
                    onChange={handleForm}
                    name="fgp"
                    type="email"
                    InputField={inputFieldCss}
                    label="Email"
                  />
                  <SignupButton
                    onClick={handleFgp}
                    btntitle="SEND EMAIL"
                    rbtn={commonButton}
                  />
                </Typography>
              </Box>
            </Modal>
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
const ForgotButton = styled(Button)({
  marginLeft: '100px',
  fontSize: '12px',
  color: '#ea6c00',
  textDecoration: 'underline',
  fontWeight:'bold',
  fontFamily: `"Nunito", sans-serif`,
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Login;
