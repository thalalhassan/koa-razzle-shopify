import React from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import ReactApexChart from 'react-apexcharts';
import Arrowicon from '../../assets/icons/arrowicon';
import Styles from './statschartsmall.module.scss';

export default function Statschartsmall({
  amount,
  title,
  percent,
  graphdata,
  selected,
  direction,
  color,
  dataKey,
  xaxis,
  chartclicked,
}) {
  const onItemClick = () => {
    chartclicked(dataKey);
  };

  const chartdatas = {
    series: [
      {
        name: title,
        data: graphdata,
      },
    ],
    options: {
      chart: {
        type: 'area',
        parentHeightOffset: 0,
        offsetX: -12,
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
        colors: selected ? ['#fff'] : [color],
      },
      fill: {
        colors: [color],
        opacity: selected ? 0.5 : 0.1,
        type: 'solid',
      },
      xaxis: {
        type: 'string',
        categories: [...xaxis],
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div
      aria-hidden
      className={ClassNames([Styles.chartcontainer, selected && Styles.selected])}
      style={
        selected ? { backgroundColor: color } : { backgroundColor: '#fff' }
      }
      onClick={onItemClick}>
      <div className={Styles.data}>
        <h3>{amount}</h3>
        <h4>
          {title}
          <div className={Styles.arrow}>
            {selected ? (
              <Arrowicon white direction={direction} />
            ) : (
              <Arrowicon direction={direction} />
            )}
          </div>

          <span className={ClassNames([Styles.percent, Styles[direction]])}>
            {percent}
          </span>
        </h4>
      </div>
      <div className={Styles.grpahical}>
        <ReactApexChart
          options={chartdatas.options}
          series={chartdatas.series}
          type="area"
          width="100%"
          height="120px"
        />
      </div>
    </div>
  );
}

Statschartsmall.propTypes = {
  amount: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.string,
  graphdata: PropTypes.array.isRequired,
  selected: PropTypes.object,
  direction: PropTypes.string,
  color: PropTypes.string,
  dataKey: PropTypes.string,
  xaxis: PropTypes.array.isRequired,
  chartclicked: PropTypes.func.isRequired,
};
Statschartsmall.defaultProps = {
  amount: '',
  title: '',
  percent: '',
  selected: {},
  direction: '',
  color: '',
  dataKey: '',
};
