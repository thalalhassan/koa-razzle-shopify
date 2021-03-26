import React from 'react';
import PropTypes from 'prop-types';
import Style from './input.module.scss';

function Input({
  label,
  errors,
  name,
  value,
  type,
  required,
  parentTable,
  parentField,
  placeholder,
  onChange,
  ...otherprops
}) {
  const handleOnChange = ({ target }) => {
    onChange(name, target.value, parentTable, parentField);
  };
  return (
    <div>
      {label && <label className={Style.label}>{label}</label>}
      {required && <span>*</span>}
      {type === 'textarea' ? (
        <>
          <textarea
            name={name}
            required={required}
            placeholder={placeholder}
            value={value}
            className={Style.textarea}
            onChange={handleOnChange}
            {...otherprops}
          />
          {errors && <span className={Style.errors}>{errors[name]}</span>}
        </>
      ) : (
        <>
          <input
            className={Style.input}
            name={name}
            type={type}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={handleOnChange}
            {...otherprops}
          />
          {errors && <span className={Style.errors}>{errors[name]}</span>}
        </>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  parentTable: PropTypes.string,
  parentField: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  otherprops: PropTypes.object,
};

Input.defaultProps = {
  label: '',
  parentTable: null,
  errors: null,
  parentField: null,
  name: '',
  type: 'text',
  placeholder: '',
  value: '',
  required: false,
  otherprops: {},
  onChange: () => {},
};

export default Input;
