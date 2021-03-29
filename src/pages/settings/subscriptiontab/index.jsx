import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getData, deleteData } from 'actions';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import Button from 'components/button';
import { formatDate, setLocalStorageData } from 'helper';
import Styles from './subscriptiontab.module.scss';

function UserSubscriptions(props) {
  const { subscriptionData, deletedData } = props;

  const [errors, seterrors] = useState(null);

  useEffect(() => {
    props.getData(Actions.GET_SUBSCRIPTION_DATA, '/subscriptions');
  }, []);

  const handleOnCancelSubscription = (shopifyId) => {
    props
      .deleteData(Actions.DELETE_SUBSCRIPTION_DATA, '/subscriptions', {
        shopifyId,
      })
      .then((res) => {
        if (!res.error) {
          seterrors(null);
          const { token } = res.payload?.data._data;
          // setLocalStorageData({ jwtToken: token });
          props.getData(Actions.GET_SUBSCRIPTION_DATA, '/subscriptions');
        } else {
          const { _message } = res.error.response?.data;
          seterrors(_message);
          return true;
        }
      });
  };

  return (
    <div className={Styles.container}>
      {errors && <span className={Styles.errortext}>{errors}</span>}
      <h3>Subscription</h3>
      <h4>Current Subscription</h4>
      {subscriptionData?.data?.map(
        ({ name, status, shopifyId, currentPeriodEnd }) => (
          <div className={Styles.row}>
            <div className={Styles.leftsect}>
              <h5>{name}</h5>
              <h6>{status}</h6>
              <p>{`Current period end date: ${formatDate(
                currentPeriodEnd,
              )}`}</p>
            </div>
            <div className={Styles.rightsect}>
              {status !== 'CANCELLED' && (
                <div className={Styles.btn}>
                  <Button
                    color="greyish"
                    onClick={() => handleOnCancelSubscription(shopifyId)}
                    loading={deletedData?.loading}>
                    Cancel Subscription
                  </Button>
                </div>
              )}
              {/* <div className={Styles.btn}>
                <Button link to="/subscriptions/viewplan">
                  Upgrade Plan
                </Button>
              </div> */}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  subscriptionData: state.getSubscriptionsReducer,
  deletedData: state.deleteSubscriptionReducer,
});

UserSubscriptions.propTypes = {
  getData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  subscriptionData: PropTypes.shape({
    data: PropTypes.array,
  }),
  deletedData: PropTypes.shape({
    data: PropTypes.array,
  }),
};
UserSubscriptions.defaultProps = {
  subscriptionData: {
    data: [],
    loading: false,
  },
};

export default connect(mapStateToProps, {
  getData,
  deleteData,
})(UserSubscriptions);
