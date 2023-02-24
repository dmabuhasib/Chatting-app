import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import { Modal, styled, TextField, Typography, Button, Box } from '@mui/material';
import InputBox from '../InputBox';
import SignupButton from '../SignupButton';
import { getDatabase, set, ref, push,onValue } from 'firebase/database';
import {useSelector} from 'react-redux';

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

const GroupSection = () => {
  const db = getDatabase();
  const [gname, setGname] = useState('');
  const [gtag, setGtag] = useState('');
  const [glist, setGlist] = useState([])
  const data = useSelector((state) => state);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateGroup = () => {
    set(push(ref(db, 'groups')), {
      groupName:gname,
      groupTag:gtag,
      adminId:data.userdata.userInfo.uid,
      adminName:data.userdata.userInfo.displayName,
    }).then(()=> {
      setOpen(false)
    });
  };
  useEffect(() => {
    const groupRef = ref(db, 'groups');
    onValue(groupRef, (snapshot) => {
      const arr = []
      snapshot.forEach((item) => {
        if(data.userdata.userInfo.uid !== item.val().adminId){
          arr.push({...item.val(), gid:item.key})
        }
      })
      setGlist(arr)
    })
  }, [])
  const handleGroupJoin = (item) => {
    set(push(ref(db, 'grouprequest')), {
      groupId:item.gid,
      groupName:item.groupName,
      userId:data.userdata.userInfo.uid,
      userName:data.userdata.userInfo.displayName
    }).then(() => {
      
    })
  }
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>Groups List</h3>
        <button onClick={handleOpen}>Create Gropup</button>
      </div>
      {glist.map((item) => (

      <CommonSection
        imgSrc="/assets/userimg.png"
        title={item.groupName}
        subTitle={item.adminName}
        onClick={()=> handleGroupJoin(item)}
        btnTitle="join"
      />
      ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create a New Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <InputBox
                onChange={(e) => setGname(e.target.value)}
                name="email"
                type="email"
                InputField={inputFieldCss}
                label="Group Name"
              />
              <InputBox
                onChange={(e) => setGtag(e.target.value)}
                name="email"
                type="email"
                InputField={inputFieldCss}
                label="Group Tag"
              />
            </Typography>
            <SignupButton
              onClick={handleCreateGroup}
              btntitle="Sign up"
              rbtn={commonButton}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default GroupSection;

const inputFieldCss = styled(TextField)({
  width: '100%',
  marginTop: '8%',
  display: 'flex',
  fontSize: '30px',
  '& label': {
    fontSize: '18px',
    opacity: '0.7',
    marginLeft: '2%',
    fontWeight: 400,
    color: '#11175D',
    fontFamily: 'Nunito, sans-serif',
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    color: '#11175D',
    fontSize: '20.64px',
    fontFamily: 'Nunito, sans-serif',
    borderRadius: '15px',
    '& fieldset': {
      opacity: '0.3',
      border: '1.72005px solid #11175D',
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
  width: '100%',
  padding: '10px 8px',
  border: '1px solid',
  marginTop: '5%',
  borderRadius: '86px',
  lineHeight: 1.5,
  background: '#5F34F5',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: 'green',
  },
});
