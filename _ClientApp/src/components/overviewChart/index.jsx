import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import Styles from './overviewChart.module.scss';

export default function OverviewChart({ data, xaxis, colors }) {
  const datas = {
    series: data,
    options: {
      chart: {
        type: 'area',
        parentHeightOffset: 0,
        dropShadow: {
          enabled: false,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: colors || ['#7E9FFF', '#FA7595', '#29D6E2', '#00A0FF', '#FFC005', '#63B453'],
      stroke: {
        curve: 'straight',
        width: 2,
      },

      title: {
        text: 'SALES OVERVIEW',
        align: 'left',
        style: {
          fontSize: '14px',
          color: '#212B36',
          fontFamily: "'Roboto','sans-serif'",
          fontWeight: '500',
        },
      },
      grid: {
        row: {
          colors: ['transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: xaxis,
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: window.innerWidth > 1200 ? 'right' : 'left',
        offsetY: window.innerWidth > 1200 ? -30 : 0,
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: [
            '#7E9FFF',
            '#FA7595',
            '#29D6E2',
            '#00A0FF',
            '#FFC005',
            '#63B453',
          ],
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      tooltip: {
        shared: true,

        marker: {
          show: true,
        },
      },
    },
  };

  return (
    <div className={Styles.container}>
      <ReactApexChart
        options={datas.options}
        series={datas.series}
        type="area"
        height={400}
      />
    </div>
  );
}

OverviewChart.propTypes = {
  data: PropTypes.arrayOf,
  xaxis: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

OverviewChart.defaultProps = {
  data: {},
};
