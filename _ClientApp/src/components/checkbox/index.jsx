import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from './checkbox.module.scss';
import Checkboxicon from '../../assets/icons/checkboxicon';

export default function Checkbox(props) {
  const {
    handleOnChange,
    label,
    clearData,
    name,
    value,
    parentField,
    parentTable,
    ...otherprops
  } = props;

  const [isChecked, setisChecked] = useState(value);

  useEffect(() => {
    setisChecked(value);
  }, [value]);

  useEffect(() => {
    if (clearData) {
      setisChecked(false);
    }
  }, [clearData]);

  const handleChange = ({ target }) => {
    const { checked } = target;
    setisChecked(checked);
    handleOnChange(name, checked, parentTable, parentField);
  };

  return (
    <>
      <label className={Styles.checklabel}>
        <input
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={isChecked}
          {...otherprops}
        />
        <i>
          <Checkboxicon checked={isChecked} />
        </i>
        {label || name}
      </label>
    </>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  parentField: PropTypes.string,
  parentTable: PropTypes.string,
  value: PropTypes.bool,
  clearData: PropTypes.bool,
  handleOnChange: PropTypes.func.isRequired,
};
Checkbox.defaultProps = {
  name: '',
  label: null,
  parentField: null,
  parentTable: null,
  clearData: false,
  value: false,
};
