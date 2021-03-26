import React from 'react';
import PropTypes from 'prop-types';
import Styles from './radiobtnbox.module.scss';

export default function Radiobtnbox({
  datas,
  value,
  getRadiobtnValue,
}) {
  const onSiteChanged = (val) => {
    getRadiobtnValue(val);
  };

  return (
    <div className={Styles.container}>
      <label className={Styles.label}>To</label>
      <div className={Styles.radioouter}>
        {datas.map((data) => (
          <>
            <input
              key={data.value}
              type="radio"
              name={data.name}
              value={data.value}
              id={data.id}
              onChange={() => onSiteChanged(data.value)}
              checked={data.value === value}
            />
            <label className={Styles.labelitem} htmlFor={data.id}>
              {data.label}
            </label>
          </>
        ))}
      </div>
    </div>
  );
}

Radiobtnbox.propTypes = {
  value: PropTypes.string,
  datas: PropTypes.array,
  getRadiobtnValue: PropTypes.func,
};

Radiobtnbox.defaultProps = {
  value: '',
  datas: [],
  getRadiobtnValue: () => {},
};
