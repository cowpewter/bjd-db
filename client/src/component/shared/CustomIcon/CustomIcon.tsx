import classnames from 'classnames';
import React, { SFC } from 'react';

interface CustomIconProps {
  icon: string;
  className?: string;
}

const CustomIcon: SFC<CustomIconProps> = ({ icon, className }) => {
  const iconClass = `icon-${icon}`;
  return (
    <i className={classnames(iconClass, className)}></i>
  );
};

export default CustomIcon;
