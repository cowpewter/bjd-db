import React, { SFC } from 'react';
import ForgotPwView from './ForgotPwView';

import { GQL_INITIATE_PW_RESET, InitiatePwResetMutation } from '@store/query/InitiatePwReset';
import {
  CloseForgotPwModalMutation,
  GQL_CLOSE_FORGOT_PW_MODAL,
} from '@store/query/ModalState';

const ForgotPw: SFC = () => (
  <CloseForgotPwModalMutation mutation={GQL_CLOSE_FORGOT_PW_MODAL}>
    {closeForgotPwModal => (
      <InitiatePwResetMutation mutation={GQL_INITIATE_PW_RESET}>
        {initiatePwReset => (
          <ForgotPwView
            closeForgotPwModal={closeForgotPwModal}
            initiatePwReset={initiatePwReset}
          />
        )}
      </InitiatePwResetMutation>
    )}
  </CloseForgotPwModalMutation>
);

export default ForgotPw;
