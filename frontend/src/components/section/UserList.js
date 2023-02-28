import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import InputBox from '../InputBox';
import { TextField, styled } from '@mui/material';

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [freq, setFreq] = useState([]);
  const [friend, setFriend] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const data = useSelector((state) => state);
  useEffect(() => {
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid !== item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

  useEffect(() => {
    const friendRequestRef = ref(db, 'friends');
    onValue(friendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriend(arr);
    });
  }, []);
  useEffect(() => {
    const friendRequestRef = ref(db, 'friendRequest');
    onValue(friendRequestRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFreq(arr);
    });
  }, []);

  const handleFriendRequest = (item) => {
    set(push(ref(db, 'friendRequest')), {
      senderName: data.userdata.userInfo.displayName,
      senderId: data.userdata.userInfo.uid,
      receiverName: item.displayName,
      receiverId: item.id,
    });
  };
  const handleSearch = (e) => {
    const arr = [];
    userList.filter((item) => {
      if (
        item.displayName.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        arr.push(item);
      }
    });
    setSearchList(arr);
  };
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>User List</h3>
      </div>
      <InputBox
        onChange={handleSearch}
        InputField={inputFieldCss}
        placeholder="Search User"
      />
      {searchList.length > 0
        ? searchList.map((item) =>
            friend.includes(item.id + data.userdata.userInfo.uid) ||
            friend.includes(data.userdata.userInfo.uid + item.id) ? (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="Friend"
              />
            ) : freq.includes(item.id + data.userdata.userInfo.uid) ||
              freq.includes(data.userdata.userInfo.uid + item.id) ? (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="pending"
              />
            ) : (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="send Request"
                onClick={() => handleFriendRequest(item)}
              />
            )
          )
        : userList.map((item) =>
            friend.includes(item.id + data.userdata.userInfo.uid) ||
            friend.includes(data.userdata.userInfo.uid + item.id) ? (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="Friend"
              />
            ) : freq.includes(item.id + data.userdata.userInfo.uid) ||
              freq.includes(data.userdata.userInfo.uid + item.id) ? (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="pending"
              />
            ) : (
              <CommonSection
                imgSrc="/assets/userimg.png"
                title={item.displayName}
                subTitle={item.email}
                btnTitle="send Request"
                onClick={() => handleFriendRequest(item)}
              />
            )
          )}
    </div>
  );
};

export default UserList;

const inputFieldCss = styled(TextField)({
  width: '100%',
  display: 'flex',
  fontSize: '30px',
  marginBottom: '7%',
  '& label': {
    opacity: '0.7',
    fontSize: '12px',
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
    height: '40px',
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
      borderColor: 'blue',
    },
  },
});
