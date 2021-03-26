import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'actions/types';
import { connect } from 'react-redux';
import { getData } from 'actions';
import Tabletypetwo from 'components/tabletypetwo';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScheduleHistorySkelton from 'components/SkeltonLoad/ScheduleHistorySkelton';
import Styles from './schedulehistory.module.scss';

function ScheduleHIstory(props) {
  const { scheduleJobs } = props;
  const [listData, setlistData] = useState([]);

  /**
   * use effect
   */
  useEffect(() => {
    props.getData(Actions.GET_SCHEDULE_JOB_DATA, '/scheduleJobs').then((res) => {
      if (!res.error) {
        setlistData(res?.payload?.data?._data);
      }
    });
  }, []);

  const fetchNextData = () => {
    const { page } = scheduleJobs?.metaData;
    props.getData(Actions.GET_SCHEDULE_JOB_DATA, '/scheduleJobs', {
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
        {scheduleJobs?.loading && !listData[0] ? (
          <ScheduleHistorySkelton />
        ) : (
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={scheduleJobs?.data?.length || 0} // This is important field to render the next data
            next={fetchNextData}
            hasMore={!!scheduleJobs?.metaData?.hasMore}
            loader={<h4 className={Styles.endMessage}>...Loading...</h4>}
            endMessage={
              <p className={Styles.endMessage}> - No more data - </p>
            }>
            {' '}
            <Tabletypetwo
              className={Styles.schedulelisttbl}
              data={listData}
              headers={[
                {
                  key: 'schedule.report.title',
                  type: 'title',
                  label: 'Report Name',
                  width: '140',
                },
                {
                  key: 'schedule.type',
                  type: 'type',
                  label: 'Schedule Type',
                  width: '130',
                },
                {
                  key: 'schedule.advanceType',
                  type: 'advanceType',
                  label: 'Advanced Schedule Type',
                  width: '130',
                },
                {
                  key: 'scheduleDate',
                  type: 'date',
                  label: 'Schedule Time',
                  width: '130',
                },
                {
                  key: 'nextScheduleDate',
                  type: 'date',
                  label: 'Next Schedule Time',
                  width: '130',
                },
              ]}
              changeStatus={false}
              generateNow={false}
            />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

/**
 * Map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  scheduleJobs: state.getScheduleJobReducer,
});

/**
 * Proptypes
 */
ScheduleHIstory.propTypes = {
  getData: PropTypes.func.isRequired,
  scheduleJobs: PropTypes.shape({
    data: PropTypes.array,
    metaData: PropTypes.object,
    loading: PropTypes.bool,
  }),
};

/**
 * defaultProps
 */
ScheduleHIstory.defaultProps = {
  scheduleJobs: {},
};

/**
 * Export
 */
export default connect(mapStateToProps, { getData })(ScheduleHIstory);
