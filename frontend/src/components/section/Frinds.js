import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';
import {
  getDatabase,
  set,
  push,
  ref,
  onValue,
  remove,
} from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { activeChatUser } from '../../pages/slices/ActiveChatSlice';

const Frinds = () => {
  const db = getDatabase();
  const [friends, setFriends] = useState([]);
  const data = useSelector((state) => state);
  console.log(data.activeUser.activeChatUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const friendesRef = ref(db, 'friends');
    onValue(friendesRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        if (
          data.userdata.userInfo.uid === item.val().receiverId ||
          data.userdata.userInfo.uid === item.val().senderId
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);
  const handleBlock = (item) => {
    data.userdata.userInfo.uid === item.senderId
      ? set(push(ref(db, 'block')), {
          block: item.receiverName,
          blockId: item.receiverId,
          blockBy: item.senderName,
          blockById: item.senderId,
        }).then(() => {
          remove(ref(db, 'friends/' + item.id)).then(() => {});
        })
      : set(push(ref(db, 'block')), {
          block: item.senderName,
          blockId: item.senderId,
          blockBy: item.receiverName,
          blockById: item.receiverId,
        }).then(() => {
          remove(ref(db, 'friends/' + item.id)).then(() => {});
        });
  };

  const hadleActiveUser = (item) => {
    dispatch(activeChatUser({ ...item, status: 'single' }));
  };

  return (
    <div className="group_holder">
      <div className="up_title_style">
        <h3>Friends</h3>
      </div>
      {friends.length > 0 ? (
        friends.map((item) =>
          data.userdata.userInfo.uid === item.senderId ? (
            <CommonSection
              dClick={() => hadleActiveUser(item)}
              imgSrc="/assets/userimg.png"
              title={item.receiverName}
              subTitle={item.date}
              onClick={() => handleBlock(item)}
              btnTitle="block"
            />
          ) : (
            <CommonSection
              dClick={() => hadleActiveUser(item)}
              imgSrc="/assets/userimg.png"
              title={item.senderName}
              subTitle="Hi Guys, Wassup!"
              onClick={() => handleBlock(item)}
              btnTitle="block"
            />
          )
        )
      ) : (
        <Alert variant="filled" severity="info">
          You have no Friends !
        </Alert>
      )}
    </div>
  );
};

export default Frinds;
