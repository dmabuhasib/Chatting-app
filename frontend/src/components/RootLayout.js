import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Image from './Image';
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GoSignOut } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { activeUser } from '../pages/slices/UserSlice';
import { Modal, Typography, Box } from '@mui/material';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const RootLayout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // crop start
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState('#');
  const [profile, setProfile] = useState('');
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `ProfilePic/${data.userdata.userInfo.uid}`
      );
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        setOpen(false);
        setImage('');
        toast.success('Your Profile image uploade successfull');
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(activeUser(auth.currentUser));
            localStorage.setItem('userInfo', JSON.stringify(auth.currentUser));
          });
        });
      });
    }
  };

  // crop end

  useEffect(() => {
    if (!data.userdata.userInfo) {
      navigate('/login');
    }
    setProfile(data.userdata.userInfo.photoURL);
  }, [data, navigate,image]);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('userInfo');
      dispatch(activeUser(null));
      navigate('/login');
    });
  };
  return (
    <>
      <ToastContainer position="top-left" autoClose={3000} />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className="sidebar_box">
            <div className="sidebar">
              <div className="profile_image_holder">
                {data.userdata.userInfo.photoURL ? (
                  <Image
                    className="upload_image"
                    onClick={handleOpen}
                    imgsrc={profile}
                    imgalt="profile_imgae"
                  />
                ) : (
                  <Image
                    className="upload_image"
                    onClick={handleOpen}
                    imgsrc='assets/profile.png'
                    imgalt="profile_imgae"
                  />
                )}
              </div>
              <div className="user_profile_name">
                <h5>{data.userdata.userInfo.displayName}</h5>
              </div>
              <div className="icon_holder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoMdNotificationsOutline className="icon" />
                <AiOutlineSetting className="icon" />
              </div>
              <div className="logout_icon">
                <GoSignOut onClick={handleLogOut} className="icon" />
              </div>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Image Upload
                <div className="profile_image_holder">
                  {image ? (
                    <div className="img-preview"></div>
                  ) : data.userdata.userInfo.photoURL ? (
                    <Image
                      className="upload_image"
                      imgsrc={data.userdata.userInfo.photoURL}
                    />
                  ) : (
                    <Image imgsrc="/assets/profile.png" />
                  )}
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input onChange={onChange} type="file" />
                {image && (
                  <>
                    <Cropper
                      style={{ height: 400, width: '100%' }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                    <Button
                      onClick={getCropData}
                      style={{ marginTop: '10px' }}
                      variant="contained"
                      component="label"
                    >
                      Upload
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </Modal>
        </Grid>

        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
