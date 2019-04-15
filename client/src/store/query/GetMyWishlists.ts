import { Query } from 'react-apollo';

import { MyWishlistsOutput } from '@store/type/DollWishlist';
const GQL_GET_MY_WISHLISTS = require('@store/graphql/GetMyWishlists.gql');

export { GQL_GET_MY_WISHLISTS, MyWishlistsOutput };
export class GetWishlistsQuery extends Query<MyWishlistsOutput> {}
