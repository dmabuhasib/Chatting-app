import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import { getDatabase, ref, onValue, remove, set, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';

const FriendRequest = () => {
  const db = getDatabase();
  const [freq, setFreq] = useState([]);
  const data = useSelector((state) => state);

  useEffect(() => {
    const friendRequestRef = ref(db, 'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverId === data.userdata.userInfo.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFreq(arr);
    });
  }, []);
  const handleAcceptFreq = (item) => {
    set(push(ref(db, 'friends')), {
      ...item,
      date:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
    }).then(() => {
      remove(ref(db, 'friendRequest/' +item.id))
    })
  }
  const handleDeletFreq = (item) => {
    remove(ref(db, 'friendRequest/' + item.id)).then(() => {
      toast.success("Friend request delete successfull")
    })
  };
  return (
    <div className="frindRequest_holder">
      <ToastContainer position='top-left' autoClose={3000} />
      <div className="up_title_style">
        <h3>Friend Request</h3>
      </div>
      {freq.length > 0 ? (
        freq.map((item) => (
          <CommonSection
            imgSrc="/assets/userimg.png"
            title={item.senderName}
            subTitle="Hi Guys, Wassup!"
            btnTitle="Accept"
            onClick={() => handleAcceptFreq(item)}
            btnTitle2="Reject"
            onClick2={() => handleDeletFreq(item)}
          />
        ))
      ) : (
        <Alert variant="filled" severity="info">
          You have no friend request !
        </Alert>
      )}
    </div>
  );
};

export default FriendRequest;
