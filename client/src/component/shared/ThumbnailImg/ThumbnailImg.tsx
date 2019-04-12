import classnames from 'classnames';
import React, { SFC } from 'react';

const style = require('./ThumbnailImg.m.less');

type ThumbnailSize = 'small' | 'medium' | 'large';

interface ThumbnailImageProps {
  src: string;
  alt?: string;
  forceSquare?: boolean;
  size?: ThumbnailSize;
}

const ThumbnailImage: SFC<ThumbnailImageProps> = ({ src, alt, forceSquare, size }) => {
  let width;
  switch (size) {
    case 'small':
      width = 100;
      break;
    case 'medium':
    default:
      width = 150;
      break;
    case 'large':
      width = 250;
  }
  return (
    <div className={style.root}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={forceSquare ? width : undefined}
      />
    </div>
  );
};

export default ThumbnailImage;
