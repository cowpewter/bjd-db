import ApolloClient from 'apollo-boost';

import resolvers from '@store/resolver';
import typeDefs from '@store/typedef';

const client = new ApolloClient({
  clientState: {
    resolvers,
    typeDefs,
    defaults: {
      forgotPwOpen: false,
      loginOpen: false,
      signupOpen: false,
      createDollWishlistOpen: false,
      createCompanyOpen: false,
      createDollOpen: false,
    },
  },
});

export default client;
