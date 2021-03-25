import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

const ProgressChart = ({ percentage, colors, width, height }) => {
  const { gcolor1, gcolor2 } = colors;

  return (
    <Chart
      options={{
        chart: {
          height: 100,
          type: 'radialBar',
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '75%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: false,
                top: 1,
                left: 0,
                blur: 1,
                opacity: 0.24,
              },
            },
            track: {
              background: '#EDEDED',
              strokeWidth: '100px',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                blur: 1,
                opacity: 0.2,
              },
            },

            dataLabels: {
              show: false,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px',
              },
              value: {
                formatter(val) {
                  return parseInt(val, 10);
                },
                color: '#111',
                fontSize: '36px',
                show: true,
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          colors: gcolor1,
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: [gcolor2],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Percent'],
      }}
      series={[(percentage * 100) / 10]}
      type="radialBar"
      width={width}
      height={height}
    />
  );
};

ProgressChart.propTypes = {
  percentage: PropTypes.string.isRequired,
  colors: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  gcolor1: PropTypes.string,
  gcolor2: PropTypes.string,
};

ProgressChart.defaultProps = {
  colors: {},
  gcolor1: '',
  gcolor2: '',
};

export default ProgressChart;
