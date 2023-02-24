import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from 'firebase/database';
import { useSelector } from 'react-redux';
import { Modal, Typography, Box } from '@mui/material';

const style = {
  position: 'absolute',
  maxHeight: 280,
  overflow: 'scroll',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MyGroups = () => {
  const db = getDatabase();
  const data = useSelector((state) => state);
  const [glist, setGlist] = useState([]);
  const [allgId, setAllgId] = useState([]);
  const [grlist, setGrlist] = useState([]);
  const [gmlist, setGmlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMember, setMemberOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    const groupRef = ref(db, 'grouprequest');
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupId === id) {
          arr.push({ ...item.val(), did: item.key });
        }
      });
      setGrlist(arr);
    });
  };
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setMemberOpen(false);
  useEffect(() => {
    const groupRef = ref(db, 'groups');
    onValue(groupRef, (snapshot) => {
      const arr = [];
      const arr2 = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid === item.val().adminId) {
          arr.push({ ...item.val(), gid: item.key });
        }
        if (data.userdata.userInfo.uid === item.val().adminId) {
          arr2.push(item.key);
        }
      });
      setGlist(arr);
      setAllgId(arr2);
    });
  }, [gmlist]);
  const handleGroupMember = () => {
    setMemberOpen(true);
  };
  useEffect(() => {
    const groupRef = ref(db, 'groupmembers');
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGmlist(arr);
    });
  }, []);

  const handleAcceptUser = (item) => {
    set(push(ref(db, 'groupmembers')), {
      groupId: item.groupId,
      groupName: item.groupName,
      userId: item.userId,
      userName: item.userName,
    }).then(() => {
      remove(ref(db, 'grouprequest/' + item.did));
    });
  };

  const handleDeleteGroup = (id) => {
    remove(ref(db, 'grouprequest/' + id));
  };

  return (
    <div className="frindRequest_holder">
      <div className="up_title_style">
        <h3>My Groups</h3>
      </div>
      {glist.map((item) => (
        <CommonSection
          imgSrc="/assets/userimg.png"
          title={item.groupName}
          subTitle={item.adminName}
          btnTitle="Info"
          onClick={handleGroupMember}
          onClick2={() => handleOpen(item.gid)}
          btnTitle2="MR"
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
              Member Request
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {grlist.length > 0 ? (
                grlist.map((item) => (
                  <CommonSection
                    imgSrc="/assets/userimg.png"
                    title={item.userName}
                    subTitle={'- Wants to join your group'}
                    btnTitle="Accept"
                    onClick={() => handleAcceptUser(item)}
                    btnTitle2="Delete"
                    onClick2={() => handleDeleteGroup(item.did)}
                    style={{ background: 'red' }}
                  />
                ))
              ) : (
                <p>you have no members request</p>
              )}
            </Typography>
          </Box>
        </Modal>
      </div>
      <div>
        <Modal
          open={openMember}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Group Members
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
                {gmlist.length > 0 ? (
                  gmlist.map(
                    (item) => 

                      allgId.includes(item.groupId)&& (
                           <CommonSection
                             imgSrc="/assets/userimg.png"
                             title={item.userName}
                             subTitle={'Member'}
                             btnTitle="Delete"
                             style2={{ background: 'red' }}
                           />
                         )
                    
                  )
                ) : (
                  <p>you have no members</p>
                )
           }
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MyGroups;
