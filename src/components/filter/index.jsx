/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ClassNames, isEmpty } from 'helper';
import Popupcontainer from '../popupcontainer';
import Styles from './filter.module.scss';
import Closeicon from '../../assets/icons/closeicon';
import Button from '../button';
import Filteraccodian from '../filteraccodian';
import Selectbox from '../select';
import Singledatepicker from '../singledatepicker';
import Rangeslider from '../rangeslider';
import Filteradvanced from '../filteradvanced';
import ToggleButton from '../toggleButton';
import Input from '../input';
import FilterCheckboxOptions from './FilterCheckboxOptions';

function Filter(props) {
  const {
    defaultFilterData,
    hidefilter,
    tableHeaders,
    trigeradvanced,
    handleOnApplyFilter,
    handleOnClearFilter,
    handleOnFilterChange,
    type,
    show,
  } = props;

  const onHidefilterChange = () => {
    hidefilter();
  };

  const onTrigeradvanced = () => {
    trigeradvanced();
  };

  const [dateFilterType, setdateFilterType] = useState('on');

  const [clearData, setclearData] = useState(false);

  const [dateRange, setdateRange] = useState({});

  const [filterData, setfilterData] = useState({});

  const [rangeSliderToggle, setrangeSliderToggle] = useState('select');

  const [count, setcount] = useState({});

  useEffect(() => {
    if (!isEmpty(defaultFilterData) && !defaultFilterData.advanced) {
      setfilterData(defaultFilterData);
    }
  }, [defaultFilterData]);

  const getFilterDataValue = (fieldName, parentTable) => {
    const { value } = (filterData[parentTable] && filterData[parentTable][fieldName]) || {};
    return value;
  };

  const updateFilterChange = (updateData, parentTable) => {
    const oldParentTableData = filterData[parentTable] || {};
    const updatedFilterData = {
      ...filterData,
      [parentTable]: {
        ...oldParentTableData,
        ...updateData,
      },
      isFiltered: true,
    };
    setfilterData(updatedFilterData);
    setclearData(false);
    handleOnFilterChange(updatedFilterData);
  };

  const getCount = (parentTable, name) => (count[parentTable] && count[parentTable][name]) || 0;

  const onNumberSelectRangeChange = (name, value, parentTable, parentField) => {
    const oldValue = getFilterDataValue(parentField, parentTable) || {};
    const updateData = {
      [parentField]: { type: 'range', value: { ...oldValue, [name]: value } },
    };
    updateFilterChange(updateData, parentTable);
  };

  const onSliderChange = (parentTable, name, lowerValue, upperValue) => {
    const updateData = {
      [name]: { type: 'range', value: { lowerValue, upperValue } },
    };
    updateFilterChange(updateData, parentTable);
  };

  const setCountOfChecked = (countOfSelected, parentTable, parentField) => {
    const oldParentTableData = count[parentTable] || {};
    const countData = {
      ...count,
      [parentTable]: {
        ...oldParentTableData,
        [parentField]: countOfSelected,
      },
    };
    setcount(countData);
  };

  const handleOnFilterCheckboxOptions = (
    updateData,
    parentTable,
    parentField,
    countOfSelected,
  ) => {
    updateFilterChange(updateData, parentTable);
    setCountOfChecked(countOfSelected, parentTable, parentField);
  };

  const onSelectboxChange = (name, value) => {
    setdateFilterType(value);
  };

  const handleOnClearFilterInFilter = () => {
    handleOnClearFilter();
    setclearData(true);
    setdateFilterType('on');
    setdateRange({});
    setfilterData(defaultFilterData || {});
    setcount({});
  };

  const onSingleDateChange = (name, date, parentTable, parentField) => {
    let updateData = {};
    const { startDate, endDate } = dateRange;
    if (dateFilterType === 'isBetween') {
      setdateRange({ ...dateRange, [name]: date });
      if (
        (startDate || name === 'startDate')
        && (endDate || name === 'endDate')
      ) {
        updateData = {
          [parentField]: {
            type: 'date',
            value: { ...dateRange, [name]: date, type: dateFilterType },
          },
        };
      }
    } else {
      setdateRange({ ...dateRange, [name]: date });
      updateData = {
        [name]: { type: 'date', value: { date, type: dateFilterType } },
      };
    }
    updateFilterChange(updateData, parentTable);
  };

  const getFilterOptionCheckboxes = (parentTable, name) => {
    const row = [
      <FilterCheckboxOptions
        key={parentTable}
        parentTable={parentTable}
        parentField={name}
        clearData={clearData}
        defaultFilterData={getFilterDataValue(name, parentTable)}
        onChange={handleOnFilterCheckboxOptions}
      />,
    ];
    return row;
  };

  const getFilterDataRows = () => {
    const filterDataRows = [];
    tableHeaders.forEach((head) => {
      const headType = head.type;
      const { parentTable, label, name } = head;
      if (name.includes('createdAt')) {
        return false;
      } if (headType === 'text') {
        filterDataRows.push(
          <Filteraccodian
            key={`${parentTable}_${name}`}
            label={label}
            count={getCount(parentTable, name)}>
            {getFilterOptionCheckboxes(parentTable, name)}
          </Filteraccodian>,
        );
      } else if (headType === 'date') {
        filterDataRows.push(
          <Filteraccodian
            key={`${parentTable}_${name}`}
            label={label}
            count={getCount(parentTable, name)}>
            <div className={Styles.row}>
              <Selectbox
                dropdownstatic
                value={dateFilterType}
                bgcolor=""
                name={name}
                data={[
                  { value: 'isBetween', label: 'Is Between' },
                  { value: 'on', label: 'On' },
                  { value: 'before', label: 'Before' },
                ]}
                onselectOption={onSelectboxChange}
              />
            </div>
            {dateFilterType === 'isBetween' ? (
              <div className={Styles.row}>
                <div className={Styles.col}>
                  <Singledatepicker
                    clearData={clearData}
                    parentField={name}
                    parentTable={parentTable}
                    onSingleDateChange={onSingleDateChange}
                    name="startDate"
                    value={dateRange.startDate}
                    maxDate={dateRange.endDate || null}
                    defaultValue={getFilterDataValue(name, parentTable)}
                    width="medium"
                  />
                </div>
                <span className={Styles.and}>and</span>
                <div className={Styles.col}>
                  <Singledatepicker
                    clearData={clearData}
                    parentTable={parentTable}
                    value={dateRange.endDate}
                    parentField={name}
                    onSingleDateChange={onSingleDateChange}
                    minDate={dateRange.startDate || null}
                    defaultValue={getFilterDataValue(name, parentTable)}
                    name="endDate"
                    width="medium"
                  />
                </div>
              </div>
            ) : (
              <div className={Styles.row}>
                <Singledatepicker
                  clearData={clearData}
                  parentTable={parentTable}
                  onSingleDateChange={onSingleDateChange}
                  defaultValue={getFilterDataValue(name, parentTable)}
                  value={dateRange[name]}
                  name={name}
                  width="medium"
                />
              </div>
            )}
          </Filteraccodian>,
        );
      } else if (headType === 'number' || headType === 'set') {
        filterDataRows.push(
          <Filteraccodian
            key={`${parentTable}_${name}`}
            label={label}
            count={getCount(parentTable, name)}>
            <ToggleButton
              onToggle={(value) => {
                setrangeSliderToggle(value);
              }}
              items={[
                { value: 'slider', label: 'SLIDER' },
                { value: 'select', label: 'SELECT' },
              ]}
              defaultValue={rangeSliderToggle}
            />
            <div className={Styles.rowrange}>
              {rangeSliderToggle === 'slider' ? (
                <Rangeslider
                  name={name}
                  value={getFilterDataValue(name, parentTable)}
                  clearData={clearData}
                  parentTable={parentTable}
                  onSliderChange={onSliderChange}
                />
              ) : (
                <div className={Styles.rowproductrange}>
                  <div className={Styles.colproductrange}>
                    <Input
                      label="Min value"
                      name="lowerValue"
                      parentField={name}
                      parentTable={parentTable}
                      type="number"
                      // max={getFilterDataValue(name, parentTable)?.upperValue}
                      min={0}
                      value={getFilterDataValue(name, parentTable)?.lowerValue}
                      placeholder="Min value"
                      onChange={onNumberSelectRangeChange}
                    />
                  </div>
                  <div className={Styles.colproductrange}>
                    <Input
                      label="Max value"
                      value={getFilterDataValue(name, parentTable)?.upperValue}
                      parentField={name}
                      // min={getFilterDataValue(name, parentTable)?.lowerValue || 0}
                      parentTable={parentTable}
                      name="upperValue"
                      type="number"
                      onChange={onNumberSelectRangeChange}
                      placeholder="Max value"
                    />
                  </div>
                </div>
              )}
            </div>
          </Filteraccodian>,
        );
      }
      return true;
    });
    return filterDataRows;
  };

  return (
    <div>
      <Popupcontainer>
        {show ? (
          <div
            className={Styles.filtercontainer}
            onClick={onHidefilterChange}
          />
        ) : null}
        {type === 'advanced' ? (
          <div
            className={ClassNames([
              Styles.filtersect,
              show && Styles.active,
              Styles.advanced,
            ])}
            onClick={(e) => e.stopPropagation()}>
            <div className={Styles.filteradvhead}>
              <div className={Styles.filteradvheadin}>
                <h3 onClick={onHidefilterChange}>
                  <img src="/images/leftarrow.svg" alt="arrow" />
                  Product
                </h3>
                <i onClick={onHidefilterChange}>
                  <Closeicon />
                </i>
              </div>
              <div className={Styles.filteradvheadsub}>
                <h2>Advaced filter</h2>
              </div>
            </div>
            <div className={Styles.filtercontent}>
              <div className={Styles.scrollcontent}>
                <Filteradvanced
                  handleOnApplyFilter={handleOnApplyFilter}
                  handleOnClearFilter={handleOnClearFilter}
                  handleOnFilterChange={handleOnFilterChange}
                  defaultFilterData={defaultFilterData}
                  tableHeaders={tableHeaders}
                  addApplyButtons
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={ClassNames([Styles.filtersect, show && Styles.active])}
            onClick={(e) => e.stopPropagation()}>
            <div className={Styles.filterhead}>
              <h2>
                Filter
                <span onClick={onTrigeradvanced}>Advanced filter</span>
              </h2>
              <i onClick={onHidefilterChange}>
                <Closeicon />
              </i>
            </div>
            <div className={Styles.filtercontent}>
              <div className={Styles.scrollcontent}>{getFilterDataRows()}</div>
            </div>
            <div className={Styles.filterfoot}>
              <Button disabled onClick={handleOnClearFilterInFilter}>
                Clear all filter
              </Button>
              <Button onClick={handleOnApplyFilter}>Done</Button>
            </div>
          </div>
        )}
      </Popupcontainer>
    </div>
  );
}

Filter.propTypes = {
  hidefilter: PropTypes.func.isRequired,
  trigeradvanced: PropTypes.func.isRequired,
  handleOnFilterChange: PropTypes.func.isRequired,
  handleOnClearFilter: PropTypes.func.isRequired,
  handleOnApplyFilter: PropTypes.func.isRequired,
  tableHeaders: PropTypes.array,
  defaultFilterData: PropTypes.object,
  type: PropTypes.string,
  show: PropTypes.bool,
};
Filter.defaultProps = {
  show: false,
  type: 'advanced',
  defaultFilterData: {},
  tableHeaders: [],
};

// export
export default Filter;
