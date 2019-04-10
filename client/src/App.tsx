import React, { SFC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '@component/Home';

import client from '@store/client';

const App: SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Route path="/" exact component={Home} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
