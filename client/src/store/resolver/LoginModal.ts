import { Context } from 'react-apollo';

export default {
  Mutation: {
    openLoginModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { loginOpen: true } });
      return null;
    },

    closeLoginModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { loginOpen: false } });
      return null;
    },
  },
};
