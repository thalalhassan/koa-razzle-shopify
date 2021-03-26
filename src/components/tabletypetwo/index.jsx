import React from 'react';
import PropTypes from 'prop-types';
import { types, ST } from 'utils';
import Button from 'components/button';
import Editicon from 'assets/icons/editicon';
import Deleteicon from 'assets/icons/deleteicon';
import Sorticon from 'assets/icons/sorticon';
import { ClassNames, formatDate, getObjectProp, isEmpty } from 'helper';
import NoData from '../NoData';
import Styles from './tabletypetwo.module.scss';

function Tabletypetwo({ data, headers, actions, changeStatus, loading, loadId, generateNow }) {
  return (
    <div className={Styles.tablecontainer}>
      <table className={Styles.table}>
        <thead>
          <tr>
            {headers.map((value) => (
              <th key={value.key} style={{ minWidth: `${value.width}px` }}>
                {value.label}
                <span className={Styles.sorticon}>
                  <Sorticon direction="down" />
                </span>
              </th>
            ))}
            <th aria-label="empty th" />
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => (
            <tr key={value.id}>
              {headers.map((header) => {
                switch (header.type) {
                  case 'image':
                    return (
                      <td key={header.key}>
                        <span className={Styles.tdimage}>
                          <img
                            src={getObjectProp(value, header.key)}
                            alt="tableimg"
                          />
                        </span>
                      </td>
                    );

                  case 'array':
                    return (
                      <td key={header.key}>
                        <ul>
                          {value.category.map((val) => (
                            <li>{val}</li>
                          ))}
                        </ul>
                      </td>
                    );

                  case 'date':
                    return (
                      <td key={header.key}>
                        {getObjectProp(value, header.key) !== 'null'
                          ? formatDate(getObjectProp(value, header.key))
                          : 'NILL'}
                      </td>
                    );

                  case 'status': {
                    const val = getObjectProp(value, header.key);
                    return (
                      <td key={header.key}>
                        <span
                          className={
                            val === 'active' ? Styles.greentext : Styles.redtext
                          }>
                          {val}
                        </span>
                      </td>
                    );
                  }

                  case 'type': {
                    const val = getObjectProp(value, header.key);
                    return (
                      <td key={header.key}>
                        {types.filter((el) => el.key === val)?.[0]?.title}
                      </td>
                    );
                  }

                  case 'advanceType': {
                    const val = getObjectProp(value, header.key);
                    return (
                      <td key={header.key}>
                        {ST.filter((el) => el.key === val)?.[0]?.title}
                      </td>
                    );
                  }

                  case 'title': {
                    if (getObjectProp(value, 'report.title') !== null) {
                      return (
                        <td key={header.key}>
                          {getObjectProp(value, 'report.title')}
                        </td>
                      );
                    }
                    if (getObjectProp(value, 'shopReports.title') !== null) {
                      return (
                        <td key={header.key}>
                          {getObjectProp(value, 'shopReports.title')}
                        </td>
                      );
                    }
                    if (getObjectProp(value, 'schedule.report.title') !== null) {
                      return (
                        <td key={header.key}>
                          {getObjectProp(value, 'schedule.report.title')}
                        </td>
                      );
                    }
                    if (getObjectProp(value, 'schedule.shopReports.title') !== null) {
                      return (
                        <td key={header.key}>
                          {getObjectProp(value, 'schedule.shopReports.title')}
                        </td>
                      );
                    }
                    break;
                  }

                  default:
                    return (
                      <td key={header.key}>
                        {getObjectProp(value, header.key)}
                      </td>
                    );
                }
                return true;
              })}
              {changeStatus && (
                <td style={{ minWidth: '100px' }}>
                  <Button
                    color={value.execute === 'enable' ? 'primary' : 'disabled'}
                    value={value.execute}
                    size="xs"
                    onClick={() => changeStatus(value.id, value.status, value.execute)}>
                    {value.execute}
                  </Button>
                </td>
              )}

              {generateNow && (
                <td style={{ minWidth: '115px' }}>
                  <Button
                    color="inversecolor"
                    value="generate"
                    size="xs"
                    disabled={value.status === 'draft'}
                    onClick={loading ? null : () => generateNow(value.id)}>
                    {loadId === value.id && loading ? <div className={Styles.loading}><img alt="loader" src="/images/loader.svg" /></div> : 'Send Now'}
                  </Button>
                </td>
              )}

              <td>
                {actions
                  && actions.map((action) => (
                    <span key={action.icon} className={Styles.icon}>
                      <button
                        type="button"
                        className={ClassNames([
                          action.icon === 'edit' ? Styles.edit : Styles.delete,
                        ])}
                        onClick={() => action.onClick(value.id, value.reportKey)}
                        title={action.tooltip}>
                        {action.icon === 'edit' ? <Editicon /> : <Deleteicon />}
                      </button>
                    </span>
                  ))}
              </td>
            </tr>
          ))}
          {isEmpty(data) && (
            <tr className={Styles.nocontent}>
              <td colSpan="20">
                <NoData />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

Tabletypetwo.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      searchable: PropTypes.bool,
      sortable: PropTypes.bool,
      type: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  changeStatus: PropTypes.func,
  generateNow: PropTypes.func,
  loading: PropTypes.bool,
  loadId: PropTypes.string,
};
Tabletypetwo.defaultProps = {
  data: [],
  actions: [],
  changeStatus: () => {},
  generateNow: () => {},
  loading: false,
  loadId: '',
};

export default Tabletypetwo;
