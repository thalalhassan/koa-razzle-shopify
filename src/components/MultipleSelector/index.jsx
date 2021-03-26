import React from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import Styles from './multipleselector.module.scss';

export default function MultipleSelector({ onChange, name, values, label, options }) {
  const onitemclick = (value) => {
    onChange(name, {
      ...values,
      [value.value]: !values[value.value],
    });
  };

  return (
    <div>
      <label className={Styles.label}>{label}</label>
      <div className={Styles.container}>
        {options.map((value) => (
          <div
            aria-hidden
            className={Styles.col}
            onClick={() => onitemclick(value)}>
            <div
              name={name}
              className={ClassNames([
                Styles.item,
                values[value.value] && Styles.active,
              ])}>
              {value.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

MultipleSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
};
