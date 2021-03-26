import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './radiobtnboxmultiple.module.scss';

export default function Radiobtnboxmultiple({
  label,
  choices,
  selected,
  error,
  radiobtnvaluechange,
}) {
  const [btnvalue, setbtnvalue] = useState(selected);

  const onvalueChanged = (e) => {
    setbtnvalue(e.target.value);
    radiobtnvaluechange(e);
  };

  return (
    <div className={Styles.container}>
      <label className={Styles.label}>{label}</label>
      <div className={Styles.radioouter}>
        {choices.map((value) => (
          <div key={value.id}>
            <input
              type="radio"
              name={label}
              value={value.title}
              id={value.id}
              onChange={(e) => onvalueChanged(e)}
              checked={value.title === btnvalue}
            />
            <label className={Styles.labelitem} htmlFor={value.id}>
              {value.title}
            </label>
          </div>
        ))}
      </div>
      {error && <span className={Styles.error}>{error}</span>}
    </div>
  );
}

Radiobtnboxmultiple.propTypes = {
  label: PropTypes.string,
  choices: PropTypes.array,
  selected: PropTypes.string,
  error: PropTypes.string,
  radiobtnvaluechange: PropTypes.func,
};

Radiobtnboxmultiple.defaultProps = {
  label: '',
  choices: [],
  selected: '',
  error: '',
  radiobtnvaluechange: () => {},
};
