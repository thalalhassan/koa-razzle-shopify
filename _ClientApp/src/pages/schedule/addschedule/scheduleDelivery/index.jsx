import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/input';
import Selectbox from 'components/select';
import Timepicker from 'components/timepicker';
import moment from 'moment';
import MultipleSelector from 'components/MultipleSelector';
import { weekdata, weeks } from 'utils';
import Note from './note';
import Styles from './scheduledelivery.module.scss';

export default function ScheduleDelivery({
  type,
  scheduleDelivery,
  onChange,
}) {
  const { dailyTime } = scheduleDelivery;
  return (
    <div className={Styles.container}>
      <h2>Schedule Delivery</h2>
      <div className={Styles.box}>
        {(() => {
          switch (type) {
            case 'H':
              return (
                <div className={Styles.inprow}>
                  <Selectbox
                    label="How Often?"
                    name="scheduleHour"
                    value={scheduleDelivery.scheduleHour}
                    data={[
                      {
                        value: 1,
                        label: 'Every hour',
                      },
                      {
                        value: 2,
                        label: 'Every 2 hour',
                      },
                      {
                        value: 4,
                        label: 'Every 4 hour',
                      },
                      {
                        value: 6,
                        label: 'Every 6 hour',
                      },
                      {
                        value: 12,
                        label: 'Every 12 hour',
                      },
                    ]}
                    onselectOption={onChange}
                  />
                </div>
              );
            case 'D':
              return (
                <div className={Styles.inprow}>
                  <Timepicker
                    label="Select daily time"
                    name="dailyTime"
                    value={moment(dailyTime)}
                    onChange={onChange}
                  />
                </div>
              );
            case 'W':
              return (
                <div className={Styles.inprow}>
                  <Timepicker
                    label="Select weekly time"
                    name="weektime"
                    value={moment(scheduleDelivery.weektime)}
                    onChange={onChange}
                  />
                  <MultipleSelector
                    label="Week Days"
                    name="weekday"
                    options={weekdata}
                    values={scheduleDelivery.weekday}
                    onChange={onChange}
                  />
                </div>
              );
            case 'M':
              return (
                <>
                  <div className={Styles.inprow}>
                    <h3>Schedule by Month Date</h3>
                    <h5>Schedule by Month Date</h5>
                    <Input
                      label="Which day of the month you need the report?"
                      name="dayCount"
                      type="number"
                      onChange={onChange}
                      value={scheduleDelivery?.dayCount}
                      placeholder="Enter Your Day"
                  />
                  </div>
                  <div className={Styles.inprow}>
                    <Timepicker
                      label="Delivery Time"
                      name="time"
                      value={moment(scheduleDelivery?.time)}
                      onChange={onChange}
                  />
                  </div>
                  <div className={Styles.inprow}>
                    <h3>Schedule by Month WeekDay</h3>
                    <h5>Schedule by Month day</h5>
                    <div>
                      <MultipleSelector
                        label="Week Days"
                        options={weekdata}
                        name="weekdatas"
                        values={scheduleDelivery.weekdatas}
                        onChange={onChange}
                    />
                    </div>
                  </div>
                  <div className={Styles.inprow}>
                    <div>
                      <MultipleSelector
                        label="Weeks"
                        options={weeks}
                        name="week"
                        values={scheduleDelivery.week}
                        onChange={onChange}
                    />
                    </div>
                  </div>
                </>
              );
            default:
              return null;
          }
        })()}
        <div className={Styles.note}>
          <Note />
        </div>
      </div>
    </div>
  );
}

ScheduleDelivery.propTypes = {
  type: PropTypes.string.isRequired,
  scheduleDelivery: PropTypes.shape({
    scheduleHour: PropTypes.number,
    dailyTime: PropTypes.string,
    weektime: PropTypes.object,
    weekday: PropTypes.object,
    dayCount: PropTypes.number,
    time: PropTypes.object,
    weekdatas: PropTypes.object,
    week: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
