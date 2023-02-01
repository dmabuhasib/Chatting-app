import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activeUser } from './slices/UserSlice';
import Grid from '@mui/material/Grid';
import GroupSection from '../components/section/GroupSection';
import FriendRequest from '../components/section/FriendRequest';
import Frinds from '../components/section/Frinds';
import MyGroups from '../components/section/MyGroups';
import UserList from '../components/section/UserList';
import BlockUser from '../components/section/BlockUser';

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.userdata.userInfo) {
      navigate('/login');
    }
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('userInfo');
      dispatch(activeUser(null));
      navigate('/login');
    });
  };
  return (
    <>
      {/* <div>Home</div> */}

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

      {/* <button onClick={handleLogOut}>Log Out</button> */}
    </>
  );
};

export default Home;
