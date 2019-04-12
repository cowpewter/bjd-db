import classnames from 'classnames';
import React, { SFC } from 'react';

type FaIconType = 'light' | 'brand';

interface FaIconProps {
  type: FaIconType;
  icon: string;
  className?: string;
}

const FaIcon: SFC<FaIconProps> = ({ type, icon, className }) => {
  const typeClass = type === 'light' ? 'fal' : 'fab';
  const iconClass = `fa-${icon}`;
  return (
    <i className={classnames(typeClass, iconClass, className)}></i>
  );
};

export default FaIcon;
