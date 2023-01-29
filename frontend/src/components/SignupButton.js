import React from 'react';

const SignupButton = (props) => {
  return (
    <props.rbtn onClick={props.onClick} variant="contained" disableRipple>
      {props.btntitle}
    </props.rbtn>
  );
};

export default SignupButton;
