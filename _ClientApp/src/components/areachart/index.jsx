import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = ({ data }) => (
  <div>
    <ReactApexChart
      options={{
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },

        title: {
          text: 'Fundamental Analysis of Stocks',
          align: 'left',
        },
        subtitle: {
          text: 'Price Movements',
          align: 'left',
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true,
        },
        legend: {
          horizontalAlign: 'left',
        },
      }}
      series={data}
      type="area"
      height={350}
      />
  </div>
);

export default AreaChart;
