import React from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Image from './Image';

const RootLayout = () => {
  return (
    <>
       <Grid container spacing={1}>
        <Grid item xs={2}>
          <div className='sidebar_box'>

          <div className='sidebar'>
            <div className='profile_image_holder'>
              <Image imgsrc='/assets/profile.png' imgalt='profile_imgae' />
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
