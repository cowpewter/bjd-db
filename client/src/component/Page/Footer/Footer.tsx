import moment from 'moment-timezone';
import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

const style = require('./Footer.m.less');

const Footer: SFC = () => {
  const year = moment().format('YYYY');
  return (
    <footer className={style.root}>
      <ul>
        <li>Copyright &copy; {year} All rights reserved</li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/tos">Terms of Service</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
