import { Context } from 'react-apollo';

export default {
  Mutation: {
    openForgotPwModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { forgotPwOpen: true } });
      return null;
    },

    closeForgotPwModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { forgotPwOpen: false } });
      return null;
    },
  },
};
