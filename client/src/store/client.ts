import ApolloClient from 'apollo-boost';

import resolvers from '@store/resolver';
import typeDefs from '@store/typedef';

console.warn(resolvers);

const client = new ApolloClient({
  clientState: {
    resolvers,
    typeDefs,
    defaults: {
      loginOpen: false,
      signupOpen: false,
    },
  },
});

export default client;
