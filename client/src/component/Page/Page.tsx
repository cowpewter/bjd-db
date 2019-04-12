import React, { Fragment, SFC } from 'react';

import Footer from '@component/Page/Footer';
import Header from '@component/Page/Header';

const style = require('./Page.m.less');

const Page: SFC = ({ children }) => (
  <Fragment>
    <Header />
    <main className={style.body}>
      {children}
    </main>
    <Footer />
  </Fragment>
);

export default Page;
