import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { isEmpty, setLocalStorageData } from 'helper';
import { Actions } from 'actions/types';
import { updateData } from 'actions';
import PropTypes from 'prop-types';
import Styles from './index.module.scss';

function RedisSocket(props) {
  const { shopId } = props;
  const [statusData, setstatusData] = useState({});
  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
  const defaultData = {
    products: { percentage: 5, status: 'Processing' },
    orders: { percentage: 0, status: 'Yet to start syncing' },
    customers: { percentage: 0, status: 'Yet to start syncing' },
    inventoryItems: { percentage: 0, status: 'Yet to start syncing' },
  };

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {
        shopId,
      },
    });

    socket.on(`${shopId}`, (data) => {
      const parsedData = JSON.parse(data);

      const syncStatusDatas = Object.keys(parsedData)
        .filter((key) => parsedData[key]?.syncStatus)
        .map((inkey) => parsedData[inkey]?.syncStatus);

      if (syncStatusDatas?.length === 4) {
        let syncStatus = 'completed';
        const failed = syncStatusDatas.filter((result) => result === 'failed')
          .length;
        if (failed) syncStatus = 'failed';
        setLocalStorageData({ syncStatus });
        props.updateData(Actions.UPDATE_SHOP_DATA, '/shops', { syncStatus });
      }

      setstatusData(parsedData);
    });

    return () => socket.disconnect();
  }, [SOCKET_URL]);

  const getSyncStatusData = (syncData) => {
    const returnData = [];
    Object.keys(syncData).map((key) => {
      const { percentage = 10, status = 'getting data', syncStatus } = syncData[
        key
      ];
      returnData.push(
        <div className={Styles.col1}>
          <h5 className={Styles.heading}>{key}</h5>
          <p className={Styles.message}>{status}</p>
          <div className={Styles.meter}>
            <span style={{ width: `${percentage}%` }} />
          </div>
          {syncStatus !== 'failed' && (
            <div className={Styles.loader}>
              <div className={Styles.loading_1} />
            </div>
          )}
        </div>,
      );
      return true;
    });
    return returnData;
  };

  return (
    <>
      <div className={Styles.container}>
        {isEmpty(statusData)
          ? getSyncStatusData(defaultData)
          : getSyncStatusData(statusData)}
      </div>
    </>
  );
}

/**
 * map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  shop: state.getShopReducer,
});

RedisSocket.propTypes = {
  updateData: PropTypes.func.isRequired,
  shopId: PropTypes.string,
};

RedisSocket.defaultProps = {
  shopId: '',
};

export default connect(mapStateToProps, { updateData })(RedisSocket);
