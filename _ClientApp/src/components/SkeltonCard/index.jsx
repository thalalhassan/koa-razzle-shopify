import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PropTypes from 'prop-types';
// import Styles from './skelton.module.scss';

export default function SkeltonCard({ width, height, count, color, highlight, duration, circle }) {
  return (
    <SkeletonTheme color={color} highlightColor={highlight}>
      <Skeleton width={width} height={height} duration={duration} count={count} circle={circle} />
    </SkeletonTheme>
  );
}

SkeltonCard.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  count: PropTypes.any,
  color: PropTypes.string,
  highlight: PropTypes.string,
  duration: PropTypes.any,
  circle: PropTypes.bool,
};

SkeltonCard.defaultProps = {
  width: '100%',
  height: '',
  count: '1',
  color: '#e3e3e3',
  highlight: '#f0f0f0',
  duration: '2',
  circle: false,
};
