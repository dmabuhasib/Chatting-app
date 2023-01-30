import React from 'react';

const Image = ({ imgsrc, imgalt, className, onClick }) => {
  return <img onClick={onClick} className={className} src={imgsrc} alt={imgalt} />;
};

export default Image;
