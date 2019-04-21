import { Query } from 'react-apollo';

import { MinimalDollWishlist } from '@store/type/DollWishlist';
const GQL_GET_MY_WISHLISTS = require('@store/graphql/GetMyWishlists.gql');

export interface MyWishlistsOutput {
  me: {
    id: string;
    dollWishlists: MinimalDollWishlist[];
  };
}

export { GQL_GET_MY_WISHLISTS };
export class GetWishlistsQuery extends Query<MyWishlistsOutput> {}
