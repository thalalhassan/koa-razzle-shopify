/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Singledatepicker from 'components/singledatepicker';
import Selectbox from 'components/select';
import Input from 'components/input';
import { connect } from 'react-redux';
import { getData } from 'actions';
import { Actions } from 'actions/types';
import Styles from './filteritem.module.scss';
import Selectcolumn from '../selectcolumn';

function Filteritem(props) {
  const {
    item,
    index,
    clearData,
    tableHeaders,
    onDeleteItem,
    onInputChange,
    filterOption,
  } = props;

  const [fieldType, setfieldType] = useState(item.type === 'set' ? 'number' : item.type);

  useEffect(() => {
    const { parentTable, title, type } = item;
    if (parentTable.length && type === 'text') {
      props.getData(
        Actions.GET_FILTEROPTION_DATA,
        `/filterOptions/${parentTable}/${title}`,
      );
    }
  }, [item]);

  const handleOnDeleteItem = () => {
    onDeleteItem(index);
  };

  const handleInputChange = (data) => {
    onInputChange(data, index);
  };

  const onSelectBoxChange = (name, value, parentTable, type) => {
    const typeUpdatd = type === 'set' ? 'number' : type;
    if (type) setfieldType(typeUpdatd);
    handleInputChange({ name, value, parentTable, type: typeUpdatd });
  };

  const onSingleDateChange = (name, date, parentTable) => {
    handleInputChange({ name, value: date, parentTable, type: fieldType });
  };

  const getCompareValueField = () => {
    if (fieldType === 'text') {
      return (
        <Selectbox
          bgcolor="#ffffff"
          name="value"
          value={item.value}
          onselectOption={(name, value) => {
            handleInputChange({ name, value });
          }}
          data={filterOption?.data || []}
        />
      );
    }
    if (fieldType === 'number') {
      return (
        <Input
          name="value"
          type="number"
          value={item.value}
          placeholder="value"
          onChange={(name, value) => {
            handleInputChange({ name, value });
          }}
        />
      );
    }
    if (fieldType === 'date') {
      return (
        <Singledatepicker
          clearData={clearData}
          parentTable={item.parentTable}
          onSingleDateChange={onSingleDateChange}
          defaultValue={item.value}
          value={item.value}
          name="value"
          width="custom"
          color="white"
        />
      );
    }
    return [];
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.select}>
        <Selectbox
          bgcolor="#fff"
          name="title"
          value={item.title}
          onselectOption={onSelectBoxChange}
          data={tableHeaders}
        />
      </div>
      <div className={Styles.compare}>
        <div className={Styles.compareselect}>
          <Selectcolumn
            datavalue={item.compare}
            name="compare"
            fieldType={fieldType}
            onselectOption={(name, value) => {
              handleInputChange({ name, value });
            }}
          />
        </div>
        <div className={Styles.comparevalue}>{getCompareValueField()}</div>
      </div>
      <div className={Styles.delete}>
        <span className={Styles.deletebtn}>
          <img
            src="/images/deletebtn.svg"
            alt="delete"
            onClick={handleOnDeleteItem}
          />
        </span>
      </div>
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

Filteritem.propTypes = {
  filterOption: PropTypes.shape({
    data: PropTypes.array,
  }),
  getData: PropTypes.func.isRequired,
  clearData: PropTypes.bool,
  item: PropTypes.object,
  index: PropTypes.number,
  onDeleteItem: PropTypes.func,
  onInputChange: PropTypes.func,
  tableHeaders: PropTypes.array,
};
Filteritem.defaultProps = {
  onInputChange: () => {},
  onDeleteItem: () => {},
  filterOption: {
    data: [],
  },
  item: [],
  index: [],
  clearData: false,
  tableHeaders: [],
};

export default connect(mapStateToProps, {
  getData,
})(Filteritem);
