import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import Styles from './timepicker.module.scss';

export default function Timepicker({
  name,
  label,
  value,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className={Styles.timecontainer}>
      <label>{label || 'Select time'}</label>
      <TimePicker
        name={name}
        use12Hours
        format="h:mm a"
        showSecond={false}
        value={value}
        placeholder={placeholder || 'Enter time here'}
        onChange={(val) => onChange(name, val)}
      />
      {error && <span className={Styles.error}>{error[name]}</span>}
    </div>
  );
}

Timepicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.object,
};

Timepicker.defaultProps = {
  label: '',
  name: '',
  value: {},
  placeholder: '',
  onChange: () => {},
  error: {},
};
