import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input';
import moment from 'moment';
import Timepicker from 'components/timepicker';
import Singledatepicker from 'components/singledatepicker';
import Styles from './schedulerange.module.scss';

export default function ScheduleRange({
  advanceType,
  scheduleRange,
  onChange,
}) {
  return (
    <div className={Styles.container}>
      <h2>Schedule Range</h2>
      <div className={Styles.box}>
        {(() => {
          switch (advanceType) {
            case 'NND':
              return (
                <div className={Styles.inprow}>
                  <Input
                    label="Enter your Day count"
                    name="dayCount"
                    type="number"
                    onChange={onChange}
                    value={scheduleRange?.dayCount}
                    placeholder="Enter Your Day Count"
                  />
                </div>
              );
            case 'SSD':
              return (
                <div className={Styles.inprow}>
                  <Singledatepicker
                    width="large"
                    label="Select Static Date "
                    name="scheduleDate"
                    onSingleDateChange={onChange}
                    value={new Date(scheduleRange?.scheduleDate)}
                  />
                </div>
              );
            case 'CDR':
              return (
                <>
                  <div className={Styles.inprow2}>
                    <Singledatepicker
                      width="large"
                      label="Select Start Days"
                      name="fromDate"
                      onSingleDateChange={onChange}
                      value={new Date(scheduleRange?.fromDate)}
                  />
                  </div>
                  <div className={Styles.inprow2}>
                    <Timepicker
                      label="Select Start Date Time"
                      name="fromTime"
                      onChange={onChange}
                      value={moment(scheduleRange?.fromTime)}
                  />
                  </div>
                  <div className={Styles.inprow2}>
                    <Singledatepicker
                      width="large"
                      label="Select End Days"
                      name="toDate"
                      onSingleDateChange={onChange}
                      value={new Date(scheduleRange?.toDate)}
                  />
                  </div>
                  <div className={Styles.inprow2}>
                    <Timepicker
                      label="Select End Date Time"
                      name="toTime"
                      onChange={onChange}
                      value={moment(scheduleRange?.toTime)}
                  />
                  </div>
                </>
              );
            case 'CTR':
              return (
                <>
                  <div className={Styles.inprow}>
                    <Timepicker
                      label="Select daily time start from"
                      name="from"
                      onChange={onChange}
                      value={moment(scheduleRange?.from)}
                  />
                  </div>
                  <div className={Styles.inprow}>
                    <Timepicker
                      label="Select daily time end to"
                      name="to"
                      onChange={onChange}
                      value={moment(scheduleRange?.to)}
                  />
                  </div>
                </>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

ScheduleRange.propTypes = {
  advanceType: PropTypes.string.isRequired,
  scheduleRange: PropTypes.shape({
    dayCount: PropTypes.number,
    scheduleDate: PropTypes.string,
    fromDate: PropTypes.object,
    fromTime: PropTypes.object,
    toDate: PropTypes.object,
    toTime: PropTypes.object,
    from: PropTypes.object,
    to: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
