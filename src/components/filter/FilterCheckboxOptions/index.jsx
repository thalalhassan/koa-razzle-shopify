import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getData } from 'actions';
import { Actions } from 'actions/types';
import Selectbox from 'components/select';
// import Styles from './index.module.scss';

function FilterCheckboxOptions(props) {
  const {
    parentTable,
    parentField,
    onChange,
    clearData,
    defaultFilterData,
  } = props;

  const [filterOptions, setfilterOptions] = useState([]);
  const [selectedValues, setselectedValues] = useState([]);

  useEffect(() => {
    if (clearData) setselectedValues([]);
  }, [clearData]);

  useEffect(() => {
    if (defaultFilterData) {
      setselectedValues(defaultFilterData);
      onChange(
        {
          [parentField]: { type: 'select', value: defaultFilterData },
        },
        parentTable,
        parentField,
        defaultFilterData.length,
      );
    }
  }, [defaultFilterData]);

  useEffect(() => {
    props
      .getData(
        Actions.GET_FILTEROPTION_DATA,
        `/filterOptions/${parentTable}/${parentField}`,
      )
      .then((res) => {
        if (!res.error) {
          const { _data } = res.payload.data;
          setfilterOptions(_data);
        }
      });
  }, [parentField]);

  const onSelectboxChange = (name, value = []) => {
    let updateData = {};
    let countOfSelected = 0;
    const updateValue = value?.map((e) => e.value) || [];
    if (parentTable) countOfSelected = value?.length;

    if (countOfSelected <= 0) {
      updateData = { [parentField]: undefined, [name]: undefined };
    } else {
      updateData = {
        [parentField]: { type: 'select', value: updateValue },
      };
    }
    setselectedValues(updateValue);
    onChange(updateData, parentTable, parentField, countOfSelected);
  };

  return (
    <div>
      <Selectbox
        dropdownstatic
        value={selectedValues}
        isMulti
        clearData={clearData}
        name={parentField}
        data={filterOptions || []}
        onselectOption={onSelectboxChange}
      />
    </div>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  filterOption: state.getfilterOptionsReducer,
});

FilterCheckboxOptions.propTypes = {
  getData: PropTypes.func.isRequired,
  filterOption: PropTypes.shape({
    data: PropTypes.array,
  }),
  parentTable: PropTypes.string,
  parentField: PropTypes.string,
  defaultFilterData: PropTypes.any,
  clearData: PropTypes.bool,
  onChange: PropTypes.func,
};

FilterCheckboxOptions.defaultProps = {
  filterOption: {
    data: [],
  },
  defaultFilterData: null,
  parentTable: null,
  parentField: null,
  clearData: false,
  onChange: () => {},
};

export default connect(mapStateToProps, {
  getData,
})(FilterCheckboxOptions);
