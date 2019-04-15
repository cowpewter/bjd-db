import { Mutation } from 'react-apollo';

const GQL_CREATE_DOLL_WISHLIST = require('@store/graphql/CreateDollWishlist.gql');
import { DollWishlist } from '@store/type/DollWishlist';

export { GQL_CREATE_DOLL_WISHLIST };
export class CreateDollWishlistMutation extends Mutation<DollWishlist> {}
