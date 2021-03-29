import React from 'react';
import PropTypes from 'prop-types';
import { ClassNames } from 'helper';
import Styles from './schedulestep.module.scss';

function Schedulestep(props) {
  const { step = 'scheduleType', stepsdata } = props;

  return (
    <div className={Styles.stepcontainer}>
      {Object.keys(stepsdata).map((data) => (
        <div
          key={stepsdata[data].index}
          className={ClassNames([
            Styles.stepitem,
            stepsdata[step].index >= stepsdata[data].index && Styles.active,
          ])}>
          <div className={Styles.stepcount}>
            <span>{stepsdata[data].index}</span>
          </div>
          <div className={Styles.stepdesc}>{stepsdata[data].label}</div>
        </div>
      ))}
    </div>
  );
}

Schedulestep.propTypes = {
  step: PropTypes.string.isRequired,
  stepsdata: PropTypes.object,
};

Schedulestep.defaultProps = {
  stepsdata: {},
};

export default Schedulestep;
