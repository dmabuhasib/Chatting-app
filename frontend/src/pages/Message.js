import React from 'react';
import Grid from '@mui/material/Grid';
import Frinds from '../components/section/Frinds';
import MyGroupList from '../components/section/MyGroupList';
import Chat from '../components/section/Chat';

const Message = () => {
  return (
    <>
      <Grid item xs={4}>
        <MyGroupList />
        <Frinds />
      </Grid>

      <Grid item xs={6}>
        <Chat />
      </Grid>
    </>
  );
};

export default Message;
