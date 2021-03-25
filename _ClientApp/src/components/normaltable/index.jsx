import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Sorticon from 'assets/icons/sorticon';
import {
  formatDate,
  getObjectProp,
  ClassNames,
  // OPERATOR_FUNCTIONS,
  // isEmpty,
} from 'helper';
import Styles from './normaltable.module.scss';

export default function Normaltable({
  data,
  headers,
  tableStyle,
  tableType,
  baseTable,
  handleSortOrder,
  clearSortName,
  showGrandTotal,
  hasMore,
  // defaultExtraFilterData,
}) {
  const [orderType, setsorderType] = useState({});
  const [sortIconType, setsortIconType] = useState({});

  let sumOfColumn = {};

  useEffect(() => {
    setsorderType({ ...orderType, [clearSortName]: undefined });
    setsortIconType({ ...sortIconType, [clearSortName]: undefined });
  }, [clearSortName]);

  const getKey = (header) => {
    const { parentTable, key } = header;
    const headerKey = parentTable !== baseTable ? `${parentTable}.${key}` : key;
    return headerKey;
  };

  const getSetData = (value, key) => {
    const keyValue = getObjectProp(value, key);
    if (!keyValue) return <td />;
    const { shopMoney } = typeof keyValue === 'string' ? JSON.parse(keyValue) : keyValue;
    const { amount = 0, currencyCode = '' } = shopMoney || {};
    const { total = 0 } = sumOfColumn[key] || {};
    const currentSum = total + parseFloat(amount);
    sumOfColumn = {
      ...sumOfColumn,
      [key]: { total: currentSum, tag: currencyCode },
    };
    return <td>{`${amount} ${currencyCode}`}</td>;
  };

  const getNumberData = (value, key) => {
    const keyValue = getObjectProp(value, key);
    const { total = 0 } = sumOfColumn[key] || {};
    const currentSum = total + parseFloat(keyValue);
    sumOfColumn = {
      ...sumOfColumn,
      [key]: { total: currentSum },
    };
    return <td>{keyValue || 0}</td>;
  };

  function getGrandTotalData(header) {
    const key = getKey(header);
    const { type, label } = header;
    const { total = 0, tag = '' } = sumOfColumn[key] || {};
    if (type === 'number') {
      const totalParsed = parseFloat((total.isNaN || !total) ? 0 : total).toFixed(
        2,
      );
      return <td>{`${totalParsed} ${tag}`}</td>;
    }
    return <td>{label.replace(/./g, '--')}</td>;
  }

  const handleOnSortOrderChange = ({ name, label, parentTable }) => {
    const order = orderType[name] === 'ASC' ? 'DESC' : 'ASC';
    const sortIcon = order === 'ASC' ? 'up' : 'down';
    setsorderType({ ...orderType, [name]: order });
    setsortIconType({ ...sortIconType, [name]: sortIcon });
    handleSortOrder({ name, label, parentTable, order });
  };

  const getTableHeaders = (value) => {
    const { name, type, label, width } = value;
    if (type === 'image' && tableType === 'compact') {
      return <></>;
    }
    return (
      <th
        key={label}
        width={width}
        onClick={() => handleOnSortOrderChange(value)}>
        {label}
        <span className={Styles.sorticon}>
          <Sorticon direction={sortIconType[name]} />
        </span>
      </th>
    );
  };

  // const extractExtraFilterData = (value) => {
  //   const { operationData } = defaultExtraFilterData;
  //   if (operationData) {
  //     const { operator, operationKeys, resultName } = operationData;
  //     let resultData = 0;
  //     operationKeys.forEach(({ key, parent }) => {
  //       const keyValue = getObjectProp(value, key);
  //       resultData = OPERATOR_FUNCTIONS[operator](resultData, keyValue);
  //     });
  //     return <td>{resultData}</td>;
  //   }
  // };

  const getImageData = (value, key) => {
    if (tableType === 'compact') {
      return <></>;
    }
    return (
      <td>
        <span className={Styles.tdimage}>
          <img src={getObjectProp(value, key)} alt="productimage" />
        </span>
      </td>
    );
  };

  return (
    <div className={Styles.tablecontainer}>
      <table className={ClassNames([Styles.table, Styles[tableStyle]])}>
        <thead>
          <tr>
            {headers.map((value) => {
              getTableHeaders(value);
              switch (value.type) {
                case 'image':
                  return <></>;
                default:
                  return (
                    <th
                      key={value.label}
                      width={value.width}
                      onClick={() => handleOnSortOrderChange(value)}>
                      {value.label}
                      <span className={Styles.sorticon}>
                        <Sorticon direction={sortIconType[value.name]} />
                      </span>
                    </th>
                  );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((value) => (
            <tr key={value.name}>
              {headers.map((header) => {
                switch (header.type) {
                  case 'image':
                    return getImageData(value, getKey(header));

                  case 'date':
                    return (
                      <td key={header.label}>
                        {formatDate(getObjectProp(value, getKey(header)))}
                      </td>
                    );

                  case 'array':
                    return (
                      <td>
                        <ul>
                          {value.category.map((val) => (
                            <li key={val}>{val}</li>
                          ))}
                        </ul>
                      </td>
                    );

                  case 'set':
                    return getSetData(value, getKey(header));

                  case 'boolean':
                    return (
                      <td>
                        {getObjectProp(value, getKey(header)) ? 'Yes' : 'No'}
                      </td>
                    );

                  case 'number':
                    return getNumberData(value, getKey(header));

                  default:
                    return (
                      <td>{getObjectProp(value, getKey(header)) ?? '----'}</td>
                    );
                }
              })}
              {/* {defaultExtraFilterData && extractExtraFilterData(value)} */}
            </tr>
          ))}
        </tbody>
        {showGrandTotal && !hasMore && data[0] && (
          <tfoot>
            <tr key="grandTotalHead">
              <td colSpan={headers.length} className={Styles.grandTotaltitle}>
                GRAND TOTAL
              </td>
            </tr>
            <tr key="grandTotalHeades">
              {headers.map(({ label, type }) => {
                switch (type) {
                  case 'set':
                    return <th key={label}>{`${label} SUM`}</th>;
                  case 'number':
                    return <th key={label}>{`${label} SUM`}</th>;
                  default:
                    return <td>{label.replace(/./g, '--')}</td>;
                }
              })}
            </tr>
            <tr key="grandTotal">
              {headers.map((header) => getGrandTotalData(header))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

Normaltable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  headers: PropTypes.arrayOf(PropTypes.shape({})),
  tableStyle: PropTypes.string,
  tableType: PropTypes.string,
  baseTable: PropTypes.string,
  clearSortName: PropTypes.string,
  handleSortOrder: PropTypes.func,
  hasMore: PropTypes.bool,
  // defaultExtraFilterData: PropTypes.object,
  showGrandTotal: PropTypes.bool,
};

Normaltable.defaultProps = {
  data: [],
  headers: [],
  tableType: '',
  tableStyle: '',
  // defaultExtraFilterData: null,
  clearSortName: null,
  hasMore: false,
  showGrandTotal: false,
  baseTable: '',
  handleSortOrder: () => {},
};
