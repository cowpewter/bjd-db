import React, { SFC } from 'react';
import CreateCompanyView from './CreateCompanyView';

import {
  CreateCompanyMutation,
  GQL_CREATE_COMPANY,
} from '@store/query/CreateCompany';
import {
  CloseCreateCompanyModalMutation,
  GQL_CLOSE_CREATE_COMPANY_MODAL,
} from '@store/query/ModalState';

const CreateDollWishlist: SFC = () => (
  <CloseCreateCompanyModalMutation mutation={GQL_CLOSE_CREATE_COMPANY_MODAL}>
    {closeCreateCompanyModal => (
      <CreateCompanyMutation
        mutation={GQL_CREATE_COMPANY}
        refetchQueries={['getCompanies']}
      >
        {createCompany => (
          <CreateCompanyView
            closeModal={closeCreateCompanyModal}
            createCompany={createCompany}
          />
        )}
      </CreateCompanyMutation>
    )}
  </CloseCreateCompanyModalMutation>
);

export default CreateDollWishlist;
