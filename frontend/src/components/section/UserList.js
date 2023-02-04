import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const data = useSelector((state) => state);
  useEffect(() => {
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid !== item.key) {
          arr.push(item.val());
        }
      });
      setUserList(arr);
    });
  }, []);
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>User List</h3>
      </div>
      {userList.map((item) => (
        <CommonSection
          imgSrc="/assets/userimg.png"
          title={item.displayName}
          subTitle={item.email}
          btnTitle="+"
        />
      ))}
    </div>
  );
};

export default UserList;
