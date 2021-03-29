import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AlertBox from 'components/AlertBox';
import RedisSocket from 'components/redisSocket';
import PropTypes from 'prop-types';
import { getData } from 'actions';
import { connect } from 'react-redux';
import { getLocalStorageData } from 'helper';
import Styles from './index.module.scss';

function SyncLoader(props) {
  const { user } = props;

  const [syncStatus, setsyncStatus] = useState('completed');
  const [open, setopen] = useState(true);
  const [showRedisStatus, setshowRedisStatus] = useState(false);

  const checkSyncStatus = () => {
    const interval = setInterval(() => {
      const { syncStatus: localSyncStatus } = {};
      // const { syncStatus: localSyncStatus } = getLocalStorageData();
      if (localSyncStatus === 'completed') {
        setsyncStatus(localSyncStatus);
        clearInterval(interval);
      }
    }, 1000);
    return true;
  };

  useEffect(() => {
    if (user) {
      const { syncStatus: status } = {};
      // const { syncStatus: status } = getLocalStorageData();
      setsyncStatus(status);
      checkSyncStatus();
    }
  }, [user]);

  const handleAlertbox = () => {
    setopen(false);
    if (user) {
      window.location.href = `https://${user.shop}/admin`;
    }
  };

  const toggleShowRedisStatus = () => {
    setshowRedisStatus(!showRedisStatus);
  };

  return (
    <>
      {user && syncStatus === 'failed' && (
        <AlertBox
          open={open}
          handleClose={() => setopen(false)}
          content="Syncing Failed!!! please contact us"
          onAccept={handleAlertbox}
          onCancel={handleAlertbox}
        />
      )}
      {user && syncStatus !== 'completed' && (
        <>
          <div className={Styles.syncMessage}>
            <p>please wait while syncing shop data</p>
            <div className={Styles.dot_falling} />
            <button type="button" onClick={toggleShowRedisStatus}>
              {showRedisStatus ? 'view less' : 'view more'}
            </button>
          </div>
          {showRedisStatus && <RedisSocket shopId={user?.id} />}
        </>
      )}
    </>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  ...state.authReducer,
});

SyncLoader.propTypes = {
  user: PropTypes.object,
};

SyncLoader.defaultProps = {
  user: null,
};
export default withRouter(connect(mapStateToProps, { getData })(SyncLoader));
