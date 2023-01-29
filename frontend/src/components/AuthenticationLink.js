import React from 'react';
import { Link } from 'react-router-dom';

const AuthenticationLink = ({ authtitle, authlink, linkpath, className }) => {
  return (
    <p className={className}>
      {' '}
      {authtitle}
      <Link to={linkpath}>{authlink}</Link>
    </p>
  );
};

export default AuthenticationLink;
