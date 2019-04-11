import { merge } from 'lodash';

import { default as loginModal } from './LoginModal';

export default merge(
  { Query: {}, Mutation: {} },
  loginModal,
);
