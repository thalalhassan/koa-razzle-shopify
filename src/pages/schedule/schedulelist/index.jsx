import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import { connect } from 'react-redux';
import { getData, deleteData, updateData } from 'actions';
import { useHistory } from 'react-router-dom';
import Tabletypetwo from 'components/tabletypetwo';
import AlertBox from 'components/AlertBox';
import ScheduleListSkelton from 'components/SkeltonLoad/ScheduleListSkelton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Styles from './schedulelist.module.scss';

function Schedulelist(props) {
  const { schedules } = props;
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [load, setLoad] = useState(false);
  const [loadId, setLoadID] = useState('');

  const history = useHistory();

  const [listData, setlistData] = useState([]);
  /**
   * use effect
   */
  useEffect(() => {
    props.getData(Actions.GET_SCHEDULE_DATA, '/schedule').then((res) => {
      if (!res.error) {
        setlistData(res?.payload?.data?._data);
      }
    });
  }, []);

  /**
   * Navigate function
   * @param {*} rowId
   */
  const navigate = (scheduleid, reportKey) => {
    history.push(`/reports/${reportKey}/schedule/${scheduleid}/scheduleType`);
  };

  /**
   * handle Close
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * openPopup
   * @param {*} rowId
   */
  const openPopup = (rowId) => {
    setOpen(true);
    setId(rowId);
  };

  /**
   * delete schedule
   */
  const deleteSchedule = () => {
    const scheduleid = id;
    props
      .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
        isDeleted: 1,
      })
      .then(() => {
        setOpen(false);
        props.getData(Actions.GET_SCHEDULE_DATA, '/schedule').then((res) => {
          if (!res.error) {
            setlistData(res?.payload?.data?._data);
          }
        });
      });
  };

  /**
   * Chaneg status
   */
  const changeStatus = (scheduleid, status, execute) => {
    const updatedExecute = execute === 'enable' ? 'disable' : 'enable';
    props
      .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
        status,
        execute: updatedExecute,
      })
      .then(() => {
        props.getData(Actions.GET_SCHEDULE_DATA, '/schedule').then((res) => {
          if (!res.error) {
            setlistData(res?.payload?.data?._data);
          }
        });
      });
  };

  const generateNow = (scheduleid) => {
    setLoad(true);
    setLoadID(scheduleid);
    props.getData(Actions.GET_SCHEDULE_NOW, `/schedule/${scheduleid}/now`).then((res) => {
      if (!res.error) {
        setLoad(false);
      }
    });
  };

  const fetchNextData = () => {
    const { page } = schedules?.metaData;
    props.getData(Actions.GET_SCHEDULE_DATA, '/schedule', {
      page: parseInt(page, 10) + 1,
    }).then((res) => {
      if (!res.error) {
        setlistData(listData.concat(res?.payload?.data?._data));
      }
    });
  };

  return (
    <div>
      <div>
        {schedules?.loading && !listData[0] ? (
          <ScheduleListSkelton />
        ) : (
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={schedules?.data?.length || 0} // This is important field to render the next data
            next={fetchNextData}
            hasMore={schedules?.metaData?.hasMore}
            loader={<h4 className={Styles.endMessage}>...Loading...</h4>}
            endMessage={
              <p className={Styles.endMessage}> - No more data - </p>
            }>
            <Tabletypetwo
              className={Styles.schedulelisttbl}
              data={listData}
              loading={load}
              loadId={loadId}
              headers={[
                {
                  key: 'report.title',
                  type: 'title',
                  label: 'Report Name',
                  width: '120',
                },
                {
                  key: 'type',
                  type: 'type',
                  label: 'Schedule Type',
                  width: '130',
                },
                {
                  key: 'advanceType',
                  type: 'advanceType',
                  label: 'Advanced Schedule Type',
                  width: '150',
                },
                {
                  key: 'createdAt',
                  type: 'date',
                  label: 'Created At',
                  width: '130',
                },
                {
                  key: 'updatedAt',
                  type: 'date',
                  label: 'Updated At',
                  width: '130',
                },
                {
                  key: 'status',
                  type: 'status',
                  label: 'STATUS',
                  width: '100',
                },
              ]}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Schedule',
                  onClick: navigate,
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Schedule',
                  onClick: openPopup,
                },
              ]}
              changeStatus={changeStatus}
              generateNow={generateNow}
            />
          </InfiniteScroll>
        )}
        <AlertBox
          open={open}
          handleClose={handleClose}
          content="Do you want to delete this Schedule?"
          onAccept={deleteSchedule}
        />
      </div>
    </div>
  );
}

/**
 * Map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  schedules: state.getScheduleReducer,
  deleteData: state.deleteScheduleReducer,
  updateData: state.updateScheduleReducer,
});

/**
 * Proptypes
 */
Schedulelist.propTypes = {
  getData: PropTypes.func.isRequired,
  // deleteData: PropTypes.func,
  updateData: PropTypes.func,
  schedules: PropTypes.shape({
    data: PropTypes.array,
    metaData: PropTypes.object,
    loading: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

/**
 * defaultProps
 */
Schedulelist.defaultProps = {
  schedules: {},
  history: {},
  // deleteData: () => {},
  updateData: () => {},
};

/**
 * Export
 */
export default connect(mapStateToProps, { getData, deleteData, updateData })(
  Schedulelist,
);
