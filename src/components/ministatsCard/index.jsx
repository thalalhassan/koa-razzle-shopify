import React from 'react';
import PropTypes from 'prop-types';
import Grid4Skelton from 'components/SkeltonLoad/Grid4Skelton';
import classnames from 'classnames';
import Arrowicon from '../../assets/icons/arrowicon';
import ProgressChart from '../progressgraph';
import Styles from './ministatscard.module.scss';

const Ministatscard = ({ data, loading }) => (
  <>
    {loading ? (
      <Grid4Skelton />
    ) : (
      <div className={classnames(Styles.ministatscard, Styles.card)}>
        <div className={Styles.leftsect}>
          <ProgressChart
            percentage={data.percentage}
            width={110}
            height={110}
            colors={{ gcolor1: data.grapcolor1, gcolor2: data.grapcolor2 }}
          />
        </div>
        <div className={Styles.rightsect}>
          <h3>{data.title}</h3>
          <h4>{data.count}</h4>
          <h5>
            <span
              className={
                data.direction === 'up' ? Styles.percentinc : Styles.percentdec
              }>
              {`${parseInt(data.percentage, 10) || 0}%`}
            </span>
            <span className={Styles.arro}>
              <Arrowicon direction={data.direction} />
            </span>
            <span className={Styles.text}>{data.description}</span>
          </h5>
        </div>
      </div>
    )}
  </>
);

Ministatscard.propTypes = {
  data: PropTypes.shape({
    percentage: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    direction: PropTypes.string,
    description: PropTypes.string,
    grapcolor1: PropTypes.string,
    grapcolor2: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

Ministatscard.defaultProps = {
  data: {
    percentage: '',
    title: '',
    count: '',
    direction: '',
    description: '',
    grapcolor1: '',
    grapcolor2: '',
  },
  loading: false,
};

export default Ministatscard;
