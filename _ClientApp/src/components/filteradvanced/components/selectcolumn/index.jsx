import React from 'react';
import PropTypes from 'prop-types';
import Styles from './selectcolumn.module.scss';
import Selectbox from '../../../select';

function Selectcolumn({ name, datavalue, fieldType, onselectOption }) {
  // eslint-disable-next-line no-shadow
  const handleOnSelectOption = (name, value) => {
    onselectOption(name, value);
  };

  const FIELDTYPES = [
    { value: 'is', label: 'Is' },
    { value: 'not', label: 'Not' },
    { value: 'greaterThan', label: 'Greather than' },
    { value: 'lessThan', label: 'Less than' },
  ];

  return (
    <div className={Styles.container}>
      <Selectbox
        bgcolor="#fff"
        value={datavalue}
        name={name}
        onselectOption={handleOnSelectOption}
        data={fieldType === 'text' ? FIELDTYPES.slice(0, 2) : FIELDTYPES}
      />
    </div>
  );
}

Selectcolumn.propTypes = {
  name: PropTypes.string,
  datavalue: PropTypes.string,
  fieldType: PropTypes.string,
  onselectOption: PropTypes.func,
};
Selectcolumn.defaultProps = {
  onselectOption: () => {},
  name: '',
  fieldType: null,
  datavalue: null,
};

export default Selectcolumn;
