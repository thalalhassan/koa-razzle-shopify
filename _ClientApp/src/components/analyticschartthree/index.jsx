import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Styles from './analyticschartthree.module.scss';

export default function Analyticschartthree(props) {
  const { data, xaxis, colors, detaillink, total, heading } = props;
  const chartdata = {
    series: data,

    options: {
      colors,
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -5,
      },
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: 'straight',
        width: 2,
        colors,
      },

      grid: {
        borderColor: '#DEDFE1',
        strokeDashArray: 3,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: xaxis,
      },
      yaxis: {
        labels: {
          formatter: (value) => `$${value}k`,
        },
      },
    },
  };

  return (
    <div className={Styles.card}>
      <div className={Styles.titlesect}>
        <div className={Styles.title}>{heading}</div>
        <Link to={detaillink}>View report</Link>
      </div>
      <div className={Styles.calculations}>
        <div className={Styles.period}>
          {total && <h5>{total}</h5>}
        </div>
      </div>
      <div className={Styles.chart}>
        <ReactApexChart
          options={chartdata.options}
          series={chartdata.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}

Analyticschartthree.propTypes = {
  data: PropTypes.array,
  xaxis: PropTypes.array,
  colors: PropTypes.array,
  detaillink: PropTypes.string,
  total: PropTypes.number,
  heading: PropTypes.string,
};

/**
 * defaultProps
 */
Analyticschartthree.defaultProps = {
  data: [],
  xaxis: [],
  colors: [],
  detaillink: '',
  total: 0,
  heading: '',
};
