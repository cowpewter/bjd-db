import React, { SFC } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Apollo Client
import client from '@store/client';

// Router components
import Home from '@component/Home';
import UserProfile from '@component/UserProfile';

// Modals
import Modals from '@component/Modal/Modals';

const App: SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/user/:username" exact component={UserProfile} />
      </Router>

      <Modals />
    </ApolloProvider>
  );
};

export default App;
