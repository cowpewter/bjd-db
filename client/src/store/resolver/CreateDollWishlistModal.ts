import { Context } from 'react-apollo';

export default {
  Mutation: {
    openCreateDollWishlistModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createDollWishlistOpen: true } });
      return null;
    },

    closeCreateDollWishlistModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createDollWishlistOpen: false } });
      return null;
    },
  },
};
