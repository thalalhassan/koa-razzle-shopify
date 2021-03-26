import React from 'react';
import PropTypes from 'prop-types';
import Styles from './topsection.module.scss';

export default function Topsection({ children }) {
  return <div className={Styles.topsection}>{children}</div>;
}

Topsection.propTypes = {
  children: PropTypes.element,
};

Topsection.defaultProps = {
  children: null,
};
