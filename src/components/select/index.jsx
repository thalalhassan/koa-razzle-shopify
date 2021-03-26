import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Styles from './select.module.scss';

export default function Selectbox({
  data,
  value,
  label,
  name,
  width,
  minWidth,
  drop,
  bgcolor,
  error,
  isMulti,
  labelcolor,
  onselectOption,
  dropdownstatic,
  placeHolder,
  clearData,
}) {
  const [selectedValue, setselectedValue] = useState(null);

  useEffect(() => {
    if (clearData) setselectedValue([]);
  }, [clearData]);

  useEffect(() => {
    const selectedData = isMulti
      ? data?.filter((val) => value?.includes(val.value))
      : data?.filter((val) => val.value === value)?.[0];
    setselectedValue(selectedData);
  }, [value, data]);

  const handleChange = (selectedOption) => {
    if (isMulti) {
      onselectOption(name, selectedOption);
    } else {
      const { type, parentTable } = selectedOption;
      onselectOption(name, selectedOption.value, parentTable, type);
    }
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      backgroundColor: bgcolor || 'transparent',
      width: width || '100%',
      minWidth: minWidth || 'auto',
      border: bgcolor ? '1px solid rgba(23, 54, 48, 0.1)' : 'none',
      borderRadius: '3px',
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '40px',
      borderWidth: '0',
      boxShadow: 'none',
      backgroundColor: bgcolor || 'transparent',
      cursor: 'pointer',
      padding: '0 10px 0 0',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '13px',
      lineHeight: '15px',
      color: '#173630',
      position: 'relative',
      top: '0',
      transform: 'translateY(0)',
    }),
    menu: (provided) => ({
      ...provided,
      margin: '4px 0',
      width: drop || '100%',
      padding: '0',
      // minWidth: '170px',
      right: '0',
      position: dropdownstatic ? 'static' : 'absolute',
    }),
    menuList: (provided) => ({
      ...provided,
      margin: ' 0',
      padding: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px solid #c6c6c6',
      // color: state.isSelected ? 'red' : 'blue',
      fontSize: '13px',
      lineHeight: '18px',
      color: state.isSelected ? '#fff' : '173630',
      backgroundColor:
        (state.isSelected && '#5063FF')
        || (state.isFocused && '#bfc3e0')
        || 'fff',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: ' 2px 0 2px 16px',
      flexWrap: 'no-wrap',
    }),
    // indicatorsContainer: (provided) => ({
    //   ...provided,
    //   padding: '0',
    //   width: '20px',
    // }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#5266ff',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ffffff',
      padding: '5px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#ffffff !important',
      backgroundColor: 'transparent !important',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        fontSize: '13px',
        lineHeight: '15px',
        color: '#173630',
        fontWeight: '500',
        position: 'relative',
        top: '0',
        transform: 'translateY(0)',
      };
    },

    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#173630',
      padding: '0px',
      width: '16px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#173630',
      padding: '0',
      width: '16px',
      margin: '0 5px 0 0',
    }),
    group: (provided) => ({
      ...provided,
      padding: '0 0 5px',
    }),
    groupHeading: (provided) => ({
      ...provided,
      padding: '5px 12px',
      margin: '0',
      backgroundColor: '#5063ff',
      color: '#ffffff',
      fontSize: '78%',
    }),
  };

  return (
    <div className={Styles.container}>
      {label && (
        <label
          className={Styles.label}
          style={{ color: labelcolor || '#212B36' }}>
          {label}
        </label>
      )}
      <Select
        name={name}
        isMulti={isMulti}
        value={selectedValue}
        onChange={handleChange}
        options={data}
        styles={customStyles}
        placeholder={placeHolder}
      />
      {error && <span className={Styles.error}>{error}</span>}
    </div>
  );
}

Selectbox.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  width: PropTypes.string,
  minWidth: PropTypes.string,
  drop: PropTypes.string,
  bgcolor: PropTypes.string,
  labelcolor: PropTypes.string,
  error: PropTypes.object,
  onselectOption: PropTypes.func.isRequired,
  dropdownstatic: PropTypes.bool,
  isMulti: PropTypes.bool,
  clearData: PropTypes.bool,
};

Selectbox.defaultProps = {
  data: [],
  label: '',
  name: '',
  value: '',
  placeHolder: 'Select',
  width: '100%',
  minWidth: 'auto',
  drop: '100%',
  bgcolor: '',
  labelcolor: '',
  error: null,
  dropdownstatic: false,
  isMulti: false,
  clearData: false,
};
