import React, { SFC } from 'react';

// Modal query
const GQL_MODAL_STATE = require('@store/graphql/ModalState.gql');
import { ModalStateQuery } from '@store/query/ModalState';

// Modals
import ForgotPw from '@component/Modal/ForgotPw';
import Login from '@component/Modal/Login';
import Signup from '@component/Modal/Signup';

const Modals: SFC = () => (
  <ModalStateQuery query={GQL_MODAL_STATE}>
  {({ loading, error, data }) => {
    if (loading || error || !data) {
      return null;
    }
    if (data.forgotPwOpen) {
      return <ForgotPw />;
    }
    if (data.loginOpen) {
      return <Login />;
    }
    if (data.signupOpen) {
      return <Signup />;
    }
    return null;
  }}
  </ModalStateQuery>
);

export default Modals;
