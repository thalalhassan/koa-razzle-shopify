/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Styles from './filtrergroup.module.scss';
import Togglebtn from '../togglebtn';
import Buttonaddfilter from '../buttonaddfilter';
import Filteritem from '../filteritem';

function Filtergroup({
  groupName,
  tableHeaders,
  children,
  operator,
  filters,
  onGroupInputChange,
  onGroupDelete,
}) {

  const [groupFilterData, setgroupFilterData] = useState(filters);

  useEffect(() => {
      setgroupFilterData(filters);
  }, [filters]);


  const handleOnDeleteFilterItem = (deleteIndex) => {
    const filterData = [...groupFilterData];
    filterData.splice(deleteIndex, 1);
    setgroupFilterData(filterData);
    onGroupInputChange(groupName, 'filters', filterData);
  };

  // handle input change
  const handleInputChange = (data, currentIndex) => {
    const { name, value, parentTable, type } = data;
    const filterData = [...groupFilterData];
    filterData[currentIndex][name] = value;
    if (parentTable) {
      filterData[currentIndex].parentTable = parentTable;
    }
    if (type) {
      filterData[currentIndex].type = type;
    }
    setgroupFilterData(filterData);
    onGroupInputChange(groupName, 'filters', filterData);
  };

  const onAddFilter = () => {
    const filterData = [
      ...groupFilterData,
      {
        title: '',
        parentTable: '',
        compare: 'is',
        type: 'text',
        value: '',
      },
    ];
    onGroupInputChange(groupName, 'filters', filterData);
    setgroupFilterData(filterData);
  };

  const onToggleOperator = (value) => {
    onGroupInputChange(groupName, 'operator', value);
  };

  return (
    <div className={Styles.advancedfilter}>
      <div className={Styles.sectbtns}>
        <Togglebtn
          onToggle={onToggleOperator}
          items={[
            { value: 'and', label: 'AND' },
            { value: 'or', label: 'or' },
          ]}
          defaultValue={operator}
        />
        <div className={Styles.adv_opt}>
          <div className={Styles.btnsingl} onClick={onAddFilter}>
            <Buttonaddfilter type="addFilter" />
          </div>
          <div
            aria-hidden
            className={Styles.btnsingl}
            onClick={() => onGroupInputChange(groupName, 'group')}>
            <Buttonaddfilter type="addGroup" />
          </div>
          {groupName !== 'base_0' && (
            <div className={Styles.btnsingl}>
              <span className={Styles.deletegroup}>
                <img
                  src="/images/deletebtn.svg"
                  alt="delete"
                  onClick={() => {
                    onGroupDelete(groupName);
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={Styles.sectinpts}>
        {groupFilterData?.map((items, itemIndex) => (
          <div className={Styles.sectfilter} key={itemIndex}>
            <Filteritem
              item={items}
              index={itemIndex}
              tableHeaders={tableHeaders}
              onDeleteItem={handleOnDeleteFilterItem}
              onInputChange={handleInputChange}
              key={`${items.parentTable}_${items.title}`}
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

Filtergroup.propTypes = {
  index: PropTypes.number,
  groupName: PropTypes.string,
  operator: PropTypes.string,
  tableHeaders: PropTypes.array,
  filters: PropTypes.array,
  onGroupDelete: PropTypes.func,
  onGroupInputChange: PropTypes.func,
};
Filtergroup.defaultProps = {
  groupName: 'base',
  operator: 'and',
  onGroupInputChange: () => {},
  onGroupDelete: () => {},
  filters: [],
  tableHeaders: [],
  index: null,
};

export default Filtergroup;
