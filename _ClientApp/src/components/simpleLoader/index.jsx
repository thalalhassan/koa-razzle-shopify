import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.scss';

function SimpleLoader({ type, message }) {
  return (
    <>
      {type === 'default' && (
        <div className={Styles.container}>
          <div className={Styles.loader}>
            <div className={Styles.loader__bar} />
            <div className={Styles.loader__bar} />
            <div className={Styles.loader__bar} />
            <div className={Styles.loader__bar} />
            <div className={Styles.loader__bar} />
            <div className={Styles.loader__ball} />
          </div>
          {message && <p className={Styles.message}>{message}</p>}
        </div>
      )}
      {type === 'bar' && (
        <div className={Styles.loader}>
          <div className={Styles.loading_1} />
          <div className={Styles.message}>{message}</div>
        </div>
      )}
    </>
  );
}

SimpleLoader.propTypes = {
  message: PropTypes.any,
  type: PropTypes.any,
};

SimpleLoader.defaultProps = {
  message: null,
  type: 'default',
};
export default SimpleLoader;
