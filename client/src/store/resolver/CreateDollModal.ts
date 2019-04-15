import { Context } from 'react-apollo';

export default {
  Mutation: {
    openCreateDollModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createDollOpen: true } });
      return null;
    },

    closeCreateDollModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createDollOpen: false } });
      return null;
    },
  },
};
