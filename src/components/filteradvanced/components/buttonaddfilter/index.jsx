import React from 'react';
import PropTypes from 'prop-types';
import Styles from './buttonaddfilter.module.scss';

function ButtonAddFilter({ type }) {
  if (type === 'addFilter') {
    return (
      <div className={Styles.styleAddFilter}>
        <i>
          <img src="/images/addblue.svg" alt="add" />
        </i>
        Add filter
      </div>
    );
  }
  return <div className={Styles.styleAddGroup}>Add Group</div>;
}

ButtonAddFilter.propTypes = {
  type: PropTypes.string,
};
ButtonAddFilter.defaultProps = {
  type: 'addFilter',
};

export default ButtonAddFilter;
