import FaIcon from '@component/shared/FaIcon';
import classnames from 'classnames';
import React, { SFC } from 'react';

const style = require('./LoadingOverlay.m.less');

interface LoadingOverlayProps {
  text: string;
}

const LoadingOverlay: SFC<LoadingOverlayProps> = ({ text }) => (
  <div className={style.root}>
    <FaIcon
      className={classnames(style.icon, 'fa-10x fa-spin')}
      type="light"
      icon="spinner-third"
    />
    <h1>{text}</h1>
  </div>
);

export default LoadingOverlay;
