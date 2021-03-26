import React from 'react';
import PropTypes from 'prop-types';
import Styles from './textarea.module.scss';

export default function Textarea({ label, error, name, value, id, placeholder, onChange }) {
  return (
    <div className={Styles.container}>
      <label className={Styles.label}>{label}</label>
      <textarea
        name={name}
        id={id}
        className={Styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(name, e.target.value);
        }}
      />
      {error && <span className={Styles.error}>{error[name]}</span>}
    </div>
  );
}

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

Textarea.defaultProps = {
  label: '',
  error: {},
  id: '',
  name: '',
  value: '',
  onChange: () => {},
  placeholder: '',
};
