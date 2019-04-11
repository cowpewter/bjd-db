import React, { SFC } from 'react';
import { MutationFn } from 'react-apollo';

const style = require('./LoggedOutUserView.m.less');

interface LoggedOutUserViewProps {
  className?: string;
  openLoginModal: MutationFn<null>;
  openSignupModal: MutationFn<null>;
}

const LoggedOutUserView: SFC<LoggedOutUserViewProps> =
  ({ className, openLoginModal, openSignupModal }) => (
    <div className={className}>
      <a onClick={() => { openLoginModal(); }}>Login</a>
      <span className={style.divider}>&nbsp;|&nbsp;</span>
      <a onClick={() => { openSignupModal(); }}>Signup</a>
    </div>
  );

export default LoggedOutUserView;
