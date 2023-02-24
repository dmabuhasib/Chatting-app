import React from 'react';

import Grid from '@mui/material/Grid';
import GroupSection from '../components/section/GroupSection';
import FriendRequest from '../components/section/FriendRequest';
import Frinds from '../components/section/Frinds';
import MyGroups from '../components/section/MyGroups';
import UserList from '../components/section/UserList';
import BlockUser from '../components/section/BlockUser';

const Home = () => {
 


  return (
    <>
      <Grid item xs={4}>
        <GroupSection  />
        <FriendRequest  />
      </Grid>

      <Grid item xs={3}>
        <Frinds />
        <MyGroups  />
      </Grid>

      <Grid item xs={3}>
        <UserList />
        <BlockUser />
      </Grid>
    
    </>
  );
};

export default Home;
