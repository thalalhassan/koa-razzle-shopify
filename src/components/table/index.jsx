import React from 'react';
import PropTypes from 'prop-types';
import Styles from './table.module.scss';
import More from '../more';
import { getObjectProp, formatDate } from '../../helper';

function Table({ data, headers }) {
  return (
    <table className={Styles.table}>
      <thead>
        <tr>
          {headers.map(() => (
            <th>
              <input type="text" />
            </th>
          ))}
        </tr>
      </thead>
      <thead>
        <tr>
          {headers.map((value) => (
            <th style={{ width: value.width }}>{value.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((value) => (
          <tr>
            {headers.map((header) => (
              <th style={{ width: header.width }}>
                {(() => {
                  switch (header.type) {
                    case 'date':
                      return formatDate(getObjectProp(value, header.key));
                    case 'image':
                      return (
                        <img
                          alt="lot"
                          src={`${getObjectProp(value, header.key)}?dim=74`}
                        />
                      );
                    case 'array':
                      return (
                        <ul>
                          {value.category.map((val) => (
                            <li>{val}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return getObjectProp(value, header.key);
                  }
                })()}
              </th>
            ))}
            <td>
              <More
                options={[
                  { label: 'User ID', action: () => alert('hai') },
                  { label: 'ID', action: () => alert('hai') },
                  { label: 'Title', action: () => alert('hai') },
                  { label: 'Body', action: () => alert('hai') },
                ]}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
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
};
Table.defaultProps = {
  data: [],
};

export default Table;
