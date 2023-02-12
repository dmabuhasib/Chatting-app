import React, { useEffect, useState } from 'react';
import {
  getDatabase,
  onValue,
  ref,
  push,
  set,
  remove,
} from 'firebase/database';
import { useSelector } from 'react-redux';
import CommonSection from './CommonSection';
import { Alert } from '@mui/material';

const BlockUser = () => {
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);
  const data = useSelector((state) => state);

  console.log(data.userdata.userInfo.uid);
  useEffect(() => {
    const blockListRef = ref(db, 'block');
    onValue(blockListRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockById === data.userdata.userInfo.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockId: item.val().blockId,
          });
        } else if (item.val().blockId === data.userdata.userInfo.uid) {
          arr.push({
            id: item.key,
            blockBy: item.val().blockBy,
            blockById: item.val().blockById,
          });
        }
      });
      setBlockList(arr);
    });
  }, []);
  const handleUnblock = (item) => {
    set(push(ref(db, 'friends')), {
      senderName: item.block,
      senderId: item.blockId,
      receiverName: data.userdata.userInfo.displayName,
      receiverId: data.userdata.userInfo.uid,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, 'block/' + item.id));
    });
  };
  return (
    <div className="frindRequest_holder">
      <div className="up_title_style">
        <h3>Blocked Users</h3>
      </div>
      {blockList.length > 0 ? (
        blockList.map((item) =>
          item.blockById ? (
            <CommonSection
              imgSrc="/assets/userimg.png"
              title={item.blockBy}
              subTitle="Hi Guys, Wassup!"
              onClick={() => handleUnblock(item)}
              btnTitle="blockBy"
            />
          ) : (
            <CommonSection
              imgSrc="/assets/userimg.png"
              title={item.block}
              subTitle="Hi Guys, Wassup!"
              onClick={() => handleUnblock(item)}
              btnTitle="unblock"
            />
          ) 
        )
      ) : (
        <Alert variant="filled" severity="info">
          You have no blocked user !
        </Alert>
      )}
    </div>
  );
};

export default BlockUser;
