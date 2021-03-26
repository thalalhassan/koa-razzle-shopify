/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import Styles from './filteraccodian.module.scss';

export default function Filteraccodian(props) {
  const { label, count, children, onChange } = props;

  const [open, setopen] = useState(false);

  const titleclick = () => {
    onChange();
    setopen(!open);
  };

  return (
    <div className={Styles.accordian}>
      <div className={Styles.accordianblock}>
        <div className={Styles.accordiantitle} onClick={titleclick}>
          <h2>{label}</h2>
          {count > 0 && <span className={Styles.count}>{count}</span>}
        </div>
        <div
          className={ClassNames([Styles.accordiancontent, open && Styles.open])}>
          {children}
        </div>
      </div>
    </div>
  );
}

Filteraccodian.propTypes = {
  label: PropTypes.string,
  count: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.any,
};
Filteraccodian.defaultProps = {
  onChange: () => {},
  label: '',
  children: [],
  count: 0,
};
