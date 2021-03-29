import React from 'react';
import PropTypes from 'prop-types';
import Styles from './list.module.scss';

export default function List({ data }) {
  return (
    <div className={Styles.listcontainer}>
      <ul>
        {data.map((val) => (
          <li>
            <span className={Styles.listicon}><img src="/public/images/listicon.svg" alt="list" /></span>
            {val}
          </li>

        ))}

      </ul>
    </div>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf,
};

List.defaultProps = {
  data: [],
};
