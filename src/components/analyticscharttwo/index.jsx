import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import Styles from './analyticscharttwo.module.scss';

export default function Analyticscharttwo(props) {
  const { data, labels, colors, detaillink } = props;
  const chartdata = {

    series: data,

    options: {
      labels,
      colors,
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      }],
      legend: {
        show: false,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '88%',
            value: {
              fontSize: '22px',
              color: '#000000',
            },
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                fontSize: '16px',
                color: '#B3B6BA',
                label: 'Total Sales',

                formatter(w) {
                  const x = w.globals.seriesTotals.reduce((a, b) => a + b, 0);

                  return `$${x.toFixed(2)}`;
                },
              },

            },
          },
        },
      },
    },

  };

  return (
    <div className={Styles.card}>
      <div className={Styles.titlesect}>
        <div className={Styles.title}>Sales Breakdown</div>
        <Link to={detaillink}>View report</Link>
      </div>

      <div className={Styles.chart}>
        <ReactApexChart
          options={chartdata.options}
          series={chartdata.series}
          type="donut"
          height={260}
        />
      </div>
      <div className={Styles.calculations}>
        {data.map((value, i) => (
          <div key={i} className={Styles.sectdatas}>
            <h4>{labels[i]}</h4>
            <h5 style={{ color: colors[i] }}>{value}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

Analyticscharttwo.propTypes = {
  data: PropTypes.array,
  labels: PropTypes.array,
  colors: PropTypes.array,
  detaillink: PropTypes.string.isRequired,
};

/**
 * defaultProps
 */
Analyticscharttwo.defaultProps = {
  data: [],
  labels: [],
  colors: [],
};
