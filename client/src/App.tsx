import React, { SFC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Router components
import Home from '@component/Home';

import client from '@store/client';

// Modal query
const GQL_MODAL_STATE = require('@store/graphql/ModalState.gql');
import { ModalStateQuery } from '@store/query/ModalState';

// Modals
import Login from '@component/Modal/Login';

const App: SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Route path="/" exact component={Home} />
      </Router>

      <ModalStateQuery query={GQL_MODAL_STATE}>
        {({ loading, error, data }) => {
          if (loading || error || !data) {
            return null;
          }
          if (data.loginOpen) {
            return <Login />;
          }
          return null;
        }}
      </ModalStateQuery>
    </ApolloProvider>
  );
};

export default App;
