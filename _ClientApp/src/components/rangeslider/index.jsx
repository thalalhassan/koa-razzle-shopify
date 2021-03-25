import React, { useEffect, useState } from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
// import Styles from './rangeslider.module.scss';

export default function Rangeslider(props) {
  const {
    name,
    onSliderChange,
    min,
    value,
    max,
    parentTable,
    clearData,
    ...otherProps
  } = props;

  const [sliderValue, setsliderValue] = useState({
    lowerValue: min,
    upperValue: max,
  });

  useEffect(() => {
    if (clearData) {
      setsliderValue({ lowerValue: min, upperValue: max });
    }
  }, [clearData]);

  useEffect(() => {
    if (value) {
      const { lowerValue, upperValue } = value;
      setsliderValue({ lowerValue, upperValue });
    }
  }, [value]);

  const marks = {
    [min]: {
      style: {
        fontSize: '13px',
        color: '#212B36',
        fontWeight: '400',
      },
      label: `₹${sliderValue.lowerValue}`,
    },
    [max]: {
      style: {
        fontSize: '13px',
        color: '#212B36',
        fontWeight: '400',
      },
      label: `₹${sliderValue.upperValue}`,
    },
  };

  const onChange = ([lowerValue, upperValue]) => {
    setsliderValue({ lowerValue, upperValue });
    onSliderChange(parentTable, name, lowerValue, upperValue);
  };

  return (
    <div>
      <Range
        name={name}
        min={min}
        max={max}
        value={[sliderValue.lowerValue, sliderValue.upperValue]}
        defaultValue={[min, max]}
        marks={marks}
        onChange={onChange}
        {...otherProps}
      />
    </div>
  );
}

Rangeslider.propTypes = {
  onSliderChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  parentTable: PropTypes.string,
  min: PropTypes.number,
  value: PropTypes.array,
  clearData: PropTypes.bool,
  max: PropTypes.number,
};
Rangeslider.defaultProps = {
  name: '',
  min: 0,
  value: null,
  clearData: false,
  parentTable: null,
  max: 5000,
};
