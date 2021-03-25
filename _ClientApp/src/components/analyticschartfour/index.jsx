import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Styles from './analyticschartfour.module.scss';

export default function Analyticschartfour(props) {
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
        markers: {
          width: 12,
          height: 12,
          fillColors: colors,
          strokeWidth: 0,
          radius: 50,
        },
      },
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
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
      plotOptions: {
        bar: {
          columnWidth: '18%',
          distributed: false,
          endingShape: 'rounded',
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
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}

Analyticschartfour.propTypes = {
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
Analyticschartfour.defaultProps = {
  data: [],
  xaxis: [],
  colors: [],
  detaillink: '',
  total: 0,
  heading: '',
};
