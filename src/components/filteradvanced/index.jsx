import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Styles from './filteradvanced.module.scss';
import Filtergroup from './components/filtergroup';

function Filteradvanced({
  addApplyButtons,
  handleOnFilterChange,
  handleOnApplyFilter,
  handleOnClearFilter,
  defaultFilterData,
  tableHeaders,
}) {
  const [advancedFilterData, setadvancedFilterData] = useState([
    {
      groupName: 'base_0',
      operator: 'and',
      subGroups: [],
      filters: [],
    },
  ]);

  useEffect(() => {
    if (defaultFilterData?.advanced) {
      setadvancedFilterData(defaultFilterData?.advanced);
    }
  }, [defaultFilterData]);

  const removeFromTree = (
    data = [],
    childNameToRemove,
    childGroupNameKey = 'subGroups',
    childNameKey = 'groupName',
  ) => {
    const newData = data;
    newData[childGroupNameKey] = newData[childGroupNameKey]
      .filter((child) => child[childNameKey] !== childNameToRemove)
      .map((child) => removeFromTree(child, childNameToRemove));
    return newData;
  };

  const onGroupDelete = (gName) => {
    const updatedAdvancedFilterData = [
      removeFromTree(advancedFilterData[0], gName),
    ];
    setadvancedFilterData(updatedAdvancedFilterData);
    handleOnFilterChange({ advanced: updatedAdvancedFilterData });
  };

  const onGroupDataChange = (advancedDatas = [], gName, type, data) => {
    const finalData = advancedDatas.map((groupData) => {
      const { groupName, subGroups } = groupData;
      const index = (subGroups && subGroups.length) || 0;
      if (groupName === gName) {
        let returnObject = {};
        switch (type) {
          case 'filters':
            returnObject = {
              ...groupData,
              filters: [...data],
            };
            break;
          case 'operator':
            returnObject = {
              ...groupData,
              operator: data,
            };
            break;
          default:
            returnObject = {
              ...groupData,
              subGroups: [
                ...groupData.subGroups,
                {
                  groupName: `${groupName}_${index}`,
                  operator: 'and',
                  subGroups: [],
                  filters: [],
                },
              ],
            };
            break;
        }
        return returnObject;
      }
      const updatedSubGroup = onGroupDataChange(subGroups, gName, type, data);
      return {
        ...groupData,
        subGroups: updatedSubGroup,
      };
    });
    return finalData;
  };

  const getTableHeadersAsSelectOption = (tableHeadersData) => tableHeadersData.map((e) => ({
    ...e,
    value: e.name,
  }));

  const handleGroupChange = (groupName, type, data) => {
    const updatedAdvancedFilterData = onGroupDataChange(
      advancedFilterData,
      groupName,
      type,
      data,
    );
    setadvancedFilterData(updatedAdvancedFilterData);
    handleOnFilterChange({ advanced: updatedAdvancedFilterData });
  };

  const handleOnClearAdvancedFilter = () => {
    setadvancedFilterData([
      {
        groupName: 'base_0',
        operator: 'and',
        subGroups: [],
        filters: [],
      },
    ]);
    handleOnClearFilter();
  };

  const setAdvancedFilterFields = (
    group = advancedFilterData,
    className = '',
  ) => group.map(({ operator, groupName, filters, subGroups }, index) => (
    <div className={className} key={`${groupName}_${operator}`}>
      <Filtergroup
        operator={operator}
        groupName={groupName}
        tableHeaders={getTableHeadersAsSelectOption(tableHeaders)}
        index={index}
        filters={filters}
        onGroupInputChange={handleGroupChange}
        onGroupDelete={onGroupDelete}
          // eslint-disable-next-line react/no-children-prop
        children={setAdvancedFilterFields(subGroups, Styles.sectfilter)}
          />
    </div>
  ));

  return (
    <div className={Styles.advancedfilter}>
      {advancedFilterData && setAdvancedFilterFields()}
      {addApplyButtons && (
        <div className={Styles.filterfoot}>
          <Button disabled onClick={handleOnClearAdvancedFilter}>
            Clear all filter
          </Button>
          <Button onClick={handleOnApplyFilter}>Done</Button>
        </div>
      )}
    </div>
  );
}

Filteradvanced.propTypes = {
  addApplyButtons: PropTypes.bool,
  handleOnApplyFilter: PropTypes.func,
  handleOnClearFilter: PropTypes.func,
  handleOnFilterChange: PropTypes.func,
  defaultFilterData: PropTypes.object,
  tableHeaders: PropTypes.array,
};
Filteradvanced.defaultProps = {
  addApplyButtons: false,
  handleOnFilterChange: () => {},
  handleOnApplyFilter: () => {},
  handleOnClearFilter: () => {},
  defaultFilterData: null,
  tableHeaders: [],
};

export default Filteradvanced;
