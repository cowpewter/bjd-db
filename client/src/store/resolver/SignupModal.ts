import { Context } from 'react-apollo';

export default {
  Mutation: {
    openSignupModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { signupOpen: true } });
      return null;
    },

    closeSignupModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { signupOpen: false } });
      return null;
    },
  },
};
