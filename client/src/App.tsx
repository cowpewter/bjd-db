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

// Logged in user
import { GQL_ME, MeQuery } from '@store/query/Me';

const App: SFC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Route path="/" exact component={Home} />
          <Route path="/user/:username" exact component={UserProfile} />
      </Router>

      <MeQuery query={GQL_ME}>
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }
          if (error || !data) {
            console.error(error);
            return null;
          }
          const { me } = data;
          return <Modals user={me} />;
        }}
      </MeQuery>
    </ApolloProvider>
  );
};

export default App;
