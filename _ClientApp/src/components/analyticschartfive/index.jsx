import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { Link } from 'react-router-dom';
import NoData from 'components/NoData';
import Styles from './analyticschartfive.module.scss';

export default function Analyticschartfive(props) {
  const { data, heading, xaxis, colors, detaillink, total } = props;
  const chartdata = {
    series: data,

    options: {
      colors,
      legend: {
        show: false,
        position: 'bottom',
        width: '100%',
        horizontalAlign: 'left',
        offsetY: 5,
        offsetX: -10,
        markers: {
          width: 12,
          height: 12,
          fillColors: colors,
          strokeWidth: 0,
          radius: 50,
        },
      },
      chart: {
        height: 80,
        type: 'bar',
        stacked: true,
        stackType: '100%',
        offsetX: -20,
        offsetY: -10,
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
        show: false,
      },
      xaxis: {
        categories: xaxis,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => `$${value}k`,
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          barHeight: 30,
          distributed: false,
          startingShape: 'flat',
          endingShape: 'flat',
          horizontal: true,
          rangeBarOverlap: true,
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
      {data?.length <= 0 ? <NoData /> : (
        <div className={Styles.chart}>
          <ReactApexChart
            options={chartdata.options}
            series={chartdata.series}
            type="bar"
            height={80}
          />
          <ul className={Styles.datalist}>
            {data?.map((value, i) => (
              <li>
                <div className={Styles.left}>
                  <span
                    style={{ backgroundColor: colors[i] }}
                    className={Styles.round}
                  />
                  {' '}
                  {value.name}
                </div>
                {' '}
                <div className={Styles.rit}>
                  {' '}
                  {value.data[0]}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Analyticschartfive.propTypes = {
  data: PropTypes.array,
  heading: PropTypes.string,
  xaxis: PropTypes.array,
  colors: PropTypes.array,
  detaillink: PropTypes.string.isRequired,
  total: PropTypes.number,
};

/**
 * defaultProps
 */
Analyticschartfive.defaultProps = {
  data: [],
  xaxis: [],
  heading: '',
  colors: [],
  total: 0,
};
