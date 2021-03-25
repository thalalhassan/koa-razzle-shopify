import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Styles from './analyticschart.module.scss';

export default function Analyticschartone(props) {
  const { data, xaxis, detaillink, colors, subtitle, title, yaxisPrefix, yaxiPostfix } = props;
  const chartdata = {
    series: data,
    options: {
      legend: {
        show: false,
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
        curve: 'smooth',
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
          formatter: (value) => `${yaxisPrefix}${value}${yaxiPostfix}`,
        },
      },
    },
  };

  return (
    <div className={Styles.card}>
      <div className={Styles.titlesect}>
        <div className={Styles.title}>{title}</div>
        <Link to={detaillink}>View report</Link>
      </div>
      <div className={Styles.calculations}>
        <div className={Styles.amount}>
          <h4>{subtitle}</h4>
          <h5>{chartdata.series[0].total}</h5>
        </div>
        <div className={Styles.period}>
          <h4>Previous period</h4>
          <h5>{chartdata.series[1].total}</h5>
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

Analyticschartone.propTypes = {
  data: PropTypes.array,
  xaxis: PropTypes.array,
  yaxisPrefix: PropTypes.string.isRequired,
  yaxiPostfix: PropTypes.string.isRequired,
  detaillink: PropTypes.string.isRequired,
  colors: PropTypes.array,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

/**
 * defaultProps
 */
Analyticschartone.defaultProps = {
  data: [],
  xaxis: [],
  colors: [],
};
