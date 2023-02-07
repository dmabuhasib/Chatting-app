import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, ref, push } from 'firebase/database';
import { useSelector } from 'react-redux';
import CommonSection from './CommonSection';
import { Alert } from '@mui/material';

const BlockUser = () => {
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);
  const data = useSelector((state) => state);
  console.log(data.userdata.userInfo.uid);
  console.log('hello');
  console.log(blockList);
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
  return (
    <div className="frindRequest_holder">
      <div className="up_title_style">
        <h3>Blocked Users</h3>
      </div>
      {blockList.length > 0 ?
      blockList.map((item) =>
        item.blockById ? (
          <CommonSection
            imgSrc="/assets/userimg.png"
            title={item.blockBy}
            subTitle="Hi Guys, Wassup!"
            btnTitle="unblock"
          />
        ) : item.blockId ? (
          <CommonSection
            imgSrc="/assets/userimg.png"
            title={item.block}
            subTitle="Hi Guys, Wassup!"
            btnTitle="unblock"
          />
        ) : (
          <p>hello</p>
        )
      ):
      <Alert variant="filled" severity="info">
          You have no blocked user !
        </Alert>
      }
    </div>
  );
};

export default BlockUser;
