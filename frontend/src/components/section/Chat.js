import React, { useEffect, useState } from 'react';
import CommonSection from './CommonSection';

import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import { IoPaperPlaneSharp } from 'react-icons/io5';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';

const Chat = () => {
  const db = getDatabase();
  const [msg, setMsg] = useState('');
  const [msgList, setMsgList] = useState([]);
  const data = useSelector((state) => state);
  console.log(msgList);
  console.log(data.activeUser.activeChatUser.receiverId);

  const handleSendMsg = () => {
    if (data.activeUser.activeChatUser.status === 'single') {
      set(push(ref(db, 'singleMsg')), {
        msg: msg,
        whoSendId: data.userdata.userInfo.uid,
        whoSendName: data.userdata.userInfo.displayName,
        whoReceiveId:
          data.userdata.userInfo.uid === data.activeUser.activeChatUser.senderId
            ? data.activeUser.activeChatUser.receiverId
            : data.activeUser.activeChatUser.senderId,
        whoReceiveName:
          data.userdata.userInfo.uid === data.activeUser.activeChatUser.senderId
            ? data.activeUser.activeChatUser.receiverName
            : data.activeUser.activeChatUser.senderName,

        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
    }
  };

  useEffect(() => {
    const msgRef = ref(db, 'singleMsg');
    onValue(msgRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setMsgList(arr);
    });
  }, []);
  return (
    <div className="chat_holder">
      {data.userdata.userInfo.uid ===
      data.activeUser.activeChatUser.senderId ? (
        <CommonSection
          imgSrc="/assets/userimg.png"
          title={data.activeUser.activeChatUser.receiverName}
          subTitle="hellow"
        />
      ) : (
        <CommonSection
          imgSrc="/assets/userimg.png"
          title={data.activeUser.activeChatUser.senderName}
          subTitle="hellow"
        />
      )}
      <div className="message-sec">
        {msgList.map((item) => (
          <h1>{item.msg}</h1>
        ))}
        <h1>Hello</h1>
      </div>
      <div className="message-senderbox-holder">
        <CssTextField
          onChange={(e) => setMsg(e.target.value)}
          placeholder="What’s on your mind?"
        />
        <div>
          <button onClick={handleSendMsg} className="send-button-style">
            <IoPaperPlaneSharp style={{ marginTop: '3px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const CssTextField = styled(TextField)({
  width: '92%',
  display: 'flex',
  fontSize: '30px',
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
    borderRadius: '10px',
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
