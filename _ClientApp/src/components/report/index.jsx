import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './report.module.scss';

export default function Report({ data }) {
  const { icon, title, description, key, reports, shopReports } = data || {};
  return (
    <div className={Styles.myreport}>
      <div className={Styles.report_head}>
        <div className={Styles.leftsect}>
          <img src={icon} alt={title} title={title} />
        </div>
        <div className={Styles.rightsect}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <ul>
        {key !== 'myreport'
          ? reports?.map((value) => (
              <li key={value.id} className="built-in-report-column">
                <Link
                  to={`/reports/${value.type}/${value?.baseTable}/${value?.slug}`}>
                  <span>{value.title}</span>
                </Link>
              </li>
            ))
          : shopReports?.map((value) => (
              <li key={value.id} className="my-report-column">
                <Link
                  to={`/reports/${value.type}/${value?.baseTable}/${value?.slug}`}>
                  <span>{value.title}</span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}

Report.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    key: PropTypes.string,
    icon: PropTypes.string,
    reports: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
    shopReports: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }),
};

Report.defaultProps = {
  data: {
    description: '',
    reports: [],
    shopReports: [],
  },
};
