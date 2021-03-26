import React from 'react';
import PropTypes from 'prop-types';

export default function Arrowicon({ direction }) {
  if (direction === 'up') {
    return (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.57574 0.575736C4.81005 0.341421 5.18995 0.341421 5.42426 0.575736L9.24264 4.39411C9.47696 4.62843 9.47696 5.00833 9.24264 5.24264C9.00833 5.47696 8.62843 5.47696 8.39411 5.24264L5 1.84853L1.60589 5.24264C1.37157 5.47696 0.991674 5.47696 0.757359 5.24264C0.523045 5.00833 0.523045 4.62843 0.757359 4.39411L4.57574 0.575736ZM4.4 10L4.4 1L5.6 1L5.6 10L4.4 10Z" fill="#50B83C" />
      </svg>
    );
  }

  return (

    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.57574 9.42426C4.81005 9.65858 5.18995 9.65858 5.42426 9.42426L9.24264 5.60589C9.47696 5.37157 9.47696 4.99167 9.24264 4.75736C9.00833 4.52304 8.62843 4.52304 8.39411 4.75736L5 8.15147L1.60589 4.75736C1.37157 4.52304 0.991674 4.52304 0.757359 4.75736C0.523045 4.99167 0.523045 5.37157 0.757359 5.60589L4.57574 9.42426ZM4.4 2.62268e-08L4.4 9L5.6 9L5.6 -2.62268e-08L4.4 2.62268e-08Z" fill="#FF0000" />
    </svg>

  );
}

Arrowicon.propTypes = {
  direction: PropTypes.string,
};
Arrowicon.defaultProps = {
  direction: 'up',
};
