import React from 'react';

const InputBox = (props) => {
  return (
    <>
      <props.InputField
      onChange={props.onChange}
      name={props.name}
      type={props.type}
        margin="normal"
        label={props.label}
        id="custom-css-outlined-input"
      />
    </>
  );
};

export default InputBox;
