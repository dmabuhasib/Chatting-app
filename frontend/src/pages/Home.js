import React, { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { activeUser } from './slices/UserSlice';
import Grid from '@mui/material/Grid';

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
        <h1>xs=4 home</h1>
        </Grid>
        <Grid item xs={3}>
        <h1>xs=3 home</h1>
        </Grid>
        <Grid item xs={3}>
        <h1>xs=3 home</h1>
        </Grid>
  

   
      {/* <button onClick={handleLogOut}>Log Out</button> */}
    </>
  );
};

export default Home;
