/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import Actionbox from 'components/actionbox';
import { connect } from 'react-redux';
import { createData, getData } from 'actions';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import { getParamsFromSearch } from 'helper';
import Styles from './selectaplan.module.scss';

function Selectaplan(props) {
  const { planData, location, history } = props;
  const { charge_id, planId } = getParamsFromSearch(location.search, [
    'charge_id',
    'planId',
  ]);
  useEffect(() => {
    props.getData(Actions.GET_PLAN_DATA, '/subscriptions/plans');
    if (charge_id) {
      props
        .createData(
          Actions.CREATE_SUBSCRIPTION_DATA,
          '/subscriptions/confirmation',
          {
            chargeId: charge_id,
            planId,
          },
        )
        .then((res) => {
          if (!res.error) {
            history.push('/');
          }
        });
    }
  }, [charge_id, history, planId]);

  const handleGetStarted = (id) => {
    props
      .createData(Actions.CREATE_SUBSCRIPTION_DATA, '/subscriptions', {
        planId: id,
      })
      .then((res) => {
        if (!res.error) {
          const { _data } = res?.payload?.data || {};
          window.location = _data.confirmationUrl;
        }
      });
  };

  return (
    <div className={Styles.container}>
      <h2>Choose a plan to get started</h2>
      <h3>30-day free trial. Monthly billing. No contracts.</h3>
      <div className={Styles.row}>
        {planData?.data?.map((planDetails) => (
          <div className={Styles.col}>
            <Actionbox
              {...planDetails}
              btnData={{
                title: 'Get Started',
                onClick: () => handleGetStarted(planDetails.id),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  createdData: state.createSubscriptionReducer,
  planData: state.getPlanReducer,
});

Selectaplan.propTypes = {
  planData: PropTypes.object,
  createdData: PropTypes.object,
  getData: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
Selectaplan.defaultProps = {
  planData: null,
  createdData: null,
};

export default connect(mapStateToProps, {
  createData,
  getData,
})(Selectaplan);
