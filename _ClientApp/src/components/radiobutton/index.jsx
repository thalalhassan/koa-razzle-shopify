import React from 'react';
import PropTypes from 'prop-types';
import Styles from './radiobutton.module.scss';

export default function Radiobutton({ label, choices, error }) {
  return (
    <div className={Styles.container}>
      <label className={Styles.labelmain}>{label}</label>
      <div className={Styles.inpgroup}>
        {choices.map((value) => (
          <div className={Styles.inp}>
            <input type="radio" value={value.title} id={value.id} name={label} />
            <label className={Styles.labelitem} htmlFor={value.id}>
              {value.title}
            </label>
          </div>
        ))}

      </div>
      {error && <span className={Styles.error}>{error[label]}</span>}
    </div>
  );
}

Radiobutton.propTypes = {
  label: PropTypes.string,
  choices: PropTypes.array,
  error: PropTypes.object,
};

Radiobutton.defaultProps = {
  label: '',
  choices: [],
  error: {},
};
