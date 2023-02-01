import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Image from './Image';
import {AiOutlineHome, AiOutlineMessage, AiOutlineSetting} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {GoSignOut} from 'react-icons/go'

const RootLayout = () => {
  return (
    <>
       <Grid container spacing={2}>
        <Grid item xs={2}>
          <div className='sidebar_box'>

          <div className='sidebar'>
            <div className='profile_image_holder'>
              <Image imgsrc='/assets/profile.png' imgalt='profile_imgae' />
            </div>
            <div className='icon_holder'>

            <AiOutlineHome className='icon' />
            <AiOutlineMessage className='icon' />
            <IoMdNotificationsOutline className='icon' />
            <AiOutlineSetting className='icon' />
            </div>
            <div className='logout_icon'>
            <GoSignOut className='icon' />
            </div>
          </div>
          </div>
        </Grid>
       
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
