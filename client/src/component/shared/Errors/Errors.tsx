import React, { SFC } from 'react';

const style = require('./Errors.m.less');

interface ErrorsProps {
  errors: string[];
}

const Errors: SFC<ErrorsProps> = ({ errors }) => {
  if (!errors.length) {
    return null;
  }
  return (
    <div className={style.root}>
      {errors.map((message, i) => {
        return <p key={i}>{message}</p>;
      })}
    </div>
  );
};

export default Errors;
