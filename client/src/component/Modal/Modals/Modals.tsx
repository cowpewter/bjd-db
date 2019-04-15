import { Me } from '@store/type/Me';
import React, { SFC } from 'react';

// Modal query
const GQL_MODAL_STATE = require('@store/graphql/ModalState.gql');
import { ModalStateQuery } from '@store/query/ModalState';

// Modals
import CreateCompany from '@component/Modal/CreateCompany';
import CreateDoll from '@component/Modal/CreateDoll';
import CreateDollWishlist from '@component/Modal/CreateDollWishlist';
import ForgotPw from '@component/Modal/ForgotPw';
import Login from '@component/Modal/Login';
import Signup from '@component/Modal/Signup';

interface ModalsProps {
  user: Me;
}

const Modals: SFC<ModalsProps> = ({ user }) => (
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
    if (data.createDollOpen) {
      return <CreateDoll user={user} />;
    }
    if (data.createDollWishlistOpen) {
      return <CreateDollWishlist />;
    }
    if (data.createCompanyOpen) {
      return <CreateCompany />;
    }
    return null;
  }}
  </ModalStateQuery>
);

export default Modals;
