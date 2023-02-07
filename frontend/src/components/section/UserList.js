import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [freq, setFreq] = useState([]);
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
      senderEmail:data.userdata.userInfo.email,
      senderId: data.userdata.userInfo.uid,
      receiverName: item.displayName,
      receiverEmail:item.email,
      receiverId: item.id,
    });
  };
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>User List</h3>
      </div>
      {userList.map((item) =>
        freq.includes(item.id + data.userdata.userInfo.uid) ||
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
