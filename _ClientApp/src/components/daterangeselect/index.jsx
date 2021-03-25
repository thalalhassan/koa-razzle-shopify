import React, { Component } from 'react';
import 'react-dates/initialize';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import { DATE_RANGE, DATE_RANGE_OPTIONS } from 'utils';
import { DateRangePicker } from 'react-dates';
import Selectbox from 'components/select';
import Styles from './daterangeselect.module.scss';
import Calender from '../../assets/icons/calender';

export default class Daterangeselect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
    };
  }

  static getDerivedStateFromProps(props) {
    // Check props data and state are same
    const { startDate, endDate, datePickerRange } = props;
    const { startDateRange, endDateRange } = DATE_RANGE[datePickerRange] || {};
    return {
      datePickerRange,
      startDateRange: moment(startDateRange || startDate),
      endDateRange: moment(endDateRange || endDate),
    };
    // onDatesChange({ name, startDateRange, endDateRange });
  }

  onChange = ({ startDate, endDate }) => {
    const { name, onDatesChange } = this.props;
    this.setState({
      datePickerRange: 'custom',
      startDateRange: startDate,
      endDateRange: endDate,
    });
    onDatesChange({ name, startDate, endDate, datePickerRange: 'custom' });
  };

  handleSelectChange = (fieldName, val) => {
    const { name, onDatesChange } = this.props;
    if (val !== 'custom') {
      const { startDateRange, endDateRange } = DATE_RANGE[val];
      this.setState({ datePickerRange: val, startDateRange, endDateRange });
      onDatesChange({
        name,
        startDate: startDateRange,
        endDate: endDateRange,
        datePickerRange: val,
      });
    } else {
      this.setState({ datePickerRange: val });
    }
  };

  render() {
    const { label, noLabel, rangeSelector } = this.props;
    const {
      focusedInput,
      datePickerRange,
      startDateRange,
      endDateRange,
    } = this.state;
    return (
      <div className={Styles.container}>
        {!noLabel && <label className={Styles.label}>{label}</label>}
        {rangeSelector && (
          <div className={Styles.select_area}>
            <Selectbox
              name="datePickerRange"
              onselectOption={this.handleSelectChange}
              value={datePickerRange}
              data={DATE_RANGE_OPTIONS}
            />
          </div>
        )}
        <div className={Styles.datepick}>
          {datePickerRange !== 'anyTime' && (
            <DateRangePicker
              startDate={startDateRange}
              startDateId="your_unique_start_date_id"
              endDate={endDateRange}
              endDateId="your_unique_end_date_id"
              onDatesChange={this.onChange}
              focusedInput={focusedInput}
              onFocusChange={(fs) => this.setState({ focusedInput: fs })}
              small
              showDefaultInputIcon
              isOutsideRange={() => false}
              inputIconPosition="before"
              customInputIcon={<Calender />}
            />
          )}
        </div>
      </div>
    );
  }
}

/**
 *  proptypes
 */
Daterangeselect.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  datePickerRange: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  rangeSelector: PropTypes.bool,
  onDatesChange: PropTypes.func,
  noLabel: PropTypes.bool,
};

/**
 * defaultProps
 */
Daterangeselect.defaultProps = {
  startDate: null,
  endDate: null,
  rangeSelector: false,
  noLabel: false,
  datePickerRange: 'anyTime',
  label: 'Date',
  name: 'date',
  onDatesChange: ({ startDate, endDate }) => this.setState({ startDate, endDate }),
};
