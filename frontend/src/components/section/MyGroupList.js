import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';

import { getDatabase, set, ref, push, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';


const MyGroupList = () => {
  const db = getDatabase();
  const [glist, setGlist] = useState([]);
  const [gmList, setGmList] = useState([]);
  const data = useSelector((state) => state);

  useEffect(() => {
    const groupRef = ref(db, 'groups');
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (gmList.includes(item.key+data.userdata.userInfo.uid) || data.userdata.userInfo.uid === item.val().adminId) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGlist(arr);
    });
  }, [gmList]);
  useEffect(() => {
    const groupRef = ref(db, 'groupmembers');
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {      
         arr.push(item.val().groupId+item.val().userId)
      });
      setGmList(arr);
    });
  }, []);
  const handleGroupJoin = (item) => {
    set(push(ref(db, 'grouprequest')), {
      groupId: item.gid,
      groupName: item.groupName,
      userId: data.userdata.userInfo.uid,
      userName: data.userdata.userInfo.displayName,
    }).then(() => {});
  };
  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>My Joined Group</h3>

      </div>
      {glist.map((item) => (
        <CommonSection
          imgSrc="/assets/userimg.png"
          title={item.groupName}
          subTitle={item.adminName}
          onClick={() => handleGroupJoin(item)}
          btnTitle="join"
        />
      ))}
  
    </div>
  );
};

export default MyGroupList;
