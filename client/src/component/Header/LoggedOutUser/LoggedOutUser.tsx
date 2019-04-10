import React, { SFC } from 'react';

interface LoggedOutUserProps {
  className?: string;
}

const LoggedOutUser: SFC<LoggedOutUserProps> = ({ className }) => {
  return (
    <div className={className}>
      <a>Login</a>
      <a>Signup</a>
    </div>
  );
};

export default LoggedOutUser;
