import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { ClassNames } from 'helper';
import 'react-datepicker/dist/react-datepicker.css';
import Styles from './singledatepicker.module.scss';

export default function Singledatepicker(props) {
  const {
    width,
    color,
    label,
    defaultValue,
    value,
    name,
    onSingleDateChange,
    parentTable,
    parentField,
    ...otherProps
  } = props;
  const [startDate, setstartDate] = useState(
    (defaultValue && defaultValue[name]),
  );

  const handleChange = (date) => {
    setstartDate(date);
    onSingleDateChange(name, date, parentTable, parentField);
  };

  return (
    <div>
      {label && <label className={Styles.label}>{label}</label>}
      <DatePicker
        selected={value || startDate}
        placeholderText="DD/MM/YYYY"
        onChange={handleChange}
        className={ClassNames([Styles.input, Styles[width], Styles[color]])}
        {...otherProps}
      />
    </div>
  );
}

Singledatepicker.propTypes = {
  onSingleDateChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  parentField: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.object,
  defaultValue: PropTypes.object,
  parentTable: PropTypes.string,
};
Singledatepicker.defaultProps = {
  width: 'medium',
  name: '',
  label: '',
  parentField: null,
  defaultValue: null,
  value: null,
  parentTable: null,
  color: '',
};
