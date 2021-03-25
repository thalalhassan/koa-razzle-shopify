/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import Styles from './togglebtn.module.scss';

function ToggleButton({ onToggle, items, defaultValue }) {
  const [toggleValue, settoggleValue] = useState(defaultValue);

  const onChange = (value) => {
    settoggleValue(value);
    onToggle(value);
  };

  return (
    <div className={Styles.container}>
      {items?.map(({ value, label }) => (
        <div
          className={ClassNames([
            Styles.toggle,
            toggleValue === value && Styles.active,
          ])}
          onClick={() => onChange(value)}
          key={value}>
          {label.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

ToggleButton.propTypes = {
  onToggle: PropTypes.func,
  items: PropTypes.array,
  defaultValue: PropTypes.string,
};
ToggleButton.defaultProps = {
  onToggle: () => {},
  items: [],
  defaultValue: 'and',
};

export default ToggleButton;
