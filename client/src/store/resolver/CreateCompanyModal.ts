import { Context } from 'react-apollo';

export default {
  Mutation: {
    openCreateCompanyModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createCompanyOpen: true } });
      return null;
    },

    closeCreateCompanyModal: (_: any, __: any, ctx: Context) => {
      ctx.cache.writeData({ data: { createCompanyOpen: false } });
      return null;
    },
  },
};
