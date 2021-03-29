import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createData, getData, updateData } from 'actions';
import { Actions } from 'actions/types';
import { connect } from 'react-redux';
import { ADV_ST, ST, stepData, types } from 'utils';
import moment from 'moment';
import Button from 'components/button';
import Leftarrow from 'assets/icons/leftarrow';
import { extractScheduleData } from 'helper';
import Schedulestep from './schedulestep';
import ScheduleType from './scheduleType';
import ScheduleRange from './scheduleRange';
import ScheduleDelivery from './scheduleDelivery';
import ScheduleOutput from './scheduleOutput';
import Styles from './addschedule.module.scss';
// import jwtDecode from 'jwt-decode';

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    const { reportKey, reportType, baseTable, step = 'scheduleType' } = props.match.params;
    this.state = {
      type: 'H',
      advanceType: 'NND',
      scheduleRange: {
        scheduleDate: new Date(),
        dayCount: 1,
        fromDate: new Date(),
        toDate: new Date(),
        fromTime: moment(),
        toTime: moment(),
        from: moment(),
        to: moment(),
      },
      scheduleDelivery: {
        scheduleHour: 1,
        dailyTime: moment(),
        weektime: moment(),
        weekday: {},
        dayCount: 1,
        time: moment(),
        weekdatas: {},
        week: {},
      },
      outputOption: {
        value: 'email',
        filetype: 'excel',
        attachment: 'zipfile',
      },

      reportKey,
      reportType,
      baseTable,
      step,
      finish: false,
    };
  }

  componentDidMount() {
    const { props } = this;
    const { scheduleid } = props.match.params;
    if (scheduleid) {
      props
        .getData(Actions.GET_SCHEDULE_DETAILS, `/schedule/${scheduleid}`)
        .then((res) => {
          if (!res.error) {
            const datas = res.payload.data._data;
            this.setState({
              ...this.state,
              ...datas,
              scheduleRange: {
                ...this.state.scheduleRange,
                ...datas.scheduleRange,
              },
              scheduleDelivery: {
                ...this.state.scheduleDelivery,
                ...datas.scheduleDelivery,
              },
              outputOption: {
                ...this.state.outputOption,
                ...datas.outputOption,
              },
            });
          }
        });
    }
  }

  handleSwitch = (name, val) => {
    this.setState((prevstate) => ({
      ...prevstate,
      [name]: val,
    }));
  };

  handleScheduleRange = (name, value) => {
    this.setState((prevstate) => ({
      ...prevstate,
      scheduleRange: { ...prevstate.scheduleRange, [name]: value },
    }));
  };

  handleScheduleDelivery = (name, value) => {
    this.setState((prevstate) => ({
      ...prevstate,
      scheduleDelivery: { ...prevstate.scheduleDelivery, [name]: value },
    }));
  };

  handleWeekdataChange = (name, val, parent) => {
    this.setState((prevstate) => ({
      ...prevstate,
      scheduleDelivery: {
        ...prevstate.scheduleDelivery,
        [parent]: { ...prevstate.scheduleDelivery[parent], [name]: val },
      },
    }));
  };

  handleOptionChange = (name, val) => {
    this.setState((prevstate) => ({
      ...prevstate,
      outputOption: { ...prevstate.outputOption, [name]: val },
    }));
  };

  onContinueClick = () => {
    const { props } = this;
    const { step = 'scheduleType', scheduleid } = props.match.params;
    const {
      type,
      advanceType,
      reportKey,
      reportType,
      baseTable,
      scheduleRange,
      scheduleDelivery,
      outputOption,
    } = this.state;
    switch (step) {
      case 'scheduleType':
        if (scheduleid) {
          props
            .updateData(
              Actions.UPDATE_SCHEDULE_DATA,
              `/schedule/${scheduleid}`,
              {
                type,
                status: 'draft',
              },
            )
            .then((res) => {
              if (!res.error) {
                this.setState(() => this.onCheckStatus());
                props.history.push(
                  `/reports/${reportKey}/schedule/${scheduleid}/advanceScheduleType`,
                );
              }
            });
        } else {
          props
            .createData(Actions.CREATE_SCHEDULE_DATA, '/schedule', {
              type,
              reportKey,
              reportType,
              baseTable,
              status: 'draft',
            })
            .then((res) => {
              if (!res.error) {
                props.history.push(
                  `/reports/${reportKey}/schedule/${res.payload.data._data.id}/advanceScheduleType`,
                );
              }
            });
        }
        break;
      case 'advanceScheduleType':
        props
          .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
            advanceType,
            status: 'draft',
          })
          .then((res) => {
            if (!res.error) {
              if (['WTD', 'QTD', 'YTD', 'MTD'].includes(advanceType)) {
                props.history.push(
                  `/reports/${reportKey}/schedule/${scheduleid}/scheduleDelivery`,
                );
              } else {
                props.history.push(
                  `/reports/${reportKey}/schedule/${scheduleid}/scheduleRange`,
                );
              }
            }
          });
        break;
      case 'scheduleRange': {
        const data = extractScheduleData(type, advanceType, scheduleRange, {}, {});
        props
          .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
            scheduleRange: data,
            status: 'draft',
          })
          .then((res) => {
            if (!res.error) {
              props.history.push(
                `/reports/${reportKey}/schedule/${scheduleid}/scheduleDelivery`,
              );
            }
          });
        break;
      }
      case 'scheduleDelivery': {
        const data = extractScheduleData(type, advanceType, {}, scheduleDelivery, {});
        props
          .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
            scheduleDelivery: data,
            status: 'draft',
          })
          .then((res) => {
            if (!res.error) {
              props.history.push(
                `/reports/${reportKey}/schedule/${scheduleid}/outputOption`,
              );
              this.setState(() => this.onCheckStatus());
            }
          });
        break;
      }
      case 'outputOption': {
        const data = extractScheduleData(type, advanceType, {}, {}, outputOption);
        props
          .updateData(Actions.UPDATE_SCHEDULE_DATA, `/schedule/${scheduleid}`, {
            scheduleid,
            outputOption: data,
            status: 'active',
            execute: 'enable',
          })
          .then((res) => {
            if (!res.error) {
              props.history.push('/schedule/schedulelist');
            }
          });
        break;
      }
      default:
        break;
    }
  };

  onBackClick = () => {
    const { props } = this;
    const { advanceType, reportKey } = this.state;
    const { step = 'scheduleType', scheduleid } = props.match.params;
    switch (step) {
      case 'advanceScheduleType':
        props.history.push(
          `/reports/${reportKey}/schedule/${scheduleid}/scheduleType`,
        );
        break;
      case 'scheduleRange':
        props.history.push(
          `/reports/${reportKey}/schedule/${scheduleid}/advanceScheduleType`,
        );
        break;
      case 'scheduleDelivery':
        if (['WTD', 'QTD', 'YTD', 'MTD'].includes(advanceType)) {
          props.history.push(
            `/reports/${reportKey}/schedule/${scheduleid}/advanceScheduleType`,
          );
        } else {
          props.history.push(
            `/reports/${reportKey}/schedule/${scheduleid}/scheduleRange`,
          );
        }
        break;
      case 'outputOption':
        props.history.push(
          `/reports/${reportKey}/schedule/${scheduleid}/scheduleDelivery`,
        );
        break;
      default:
        break;
    }
  };

  onCheckStatus = () => {
    const { props } = this;
    const { step = 'scheduleType' } = props.match.params;
    if (step === 'outputOption') {
      this.setState((prevstate) => ({
        ...prevstate,
        finish: true,
      }));
    } else {
      this.setState((prevstate) => ({
        ...prevstate,
        finish: false,
      }));
    }
  };

  render() {
    const {
      type,
      advanceType,
      scheduleRange,
      scheduleDelivery,
      outputOption,
      finish,
    } = this.state;
    const { props } = this;
    const { step = 'scheduleType' } = props.match.params;
    return (
      <>
        <div className={Styles.breadcump}>
          <ul>
            <li>
              <Link to="/">Schedule report</Link>
            </li>
            <li>Sales by Product</li>
          </ul>
        </div>
        <div className={Styles.container}>
          <div className={Styles.step}>
            <Schedulestep step={step} stepsdata={stepData} />
          </div>
          <div className={Styles.optionblock}>
            {(() => {
              switch (step) {
                case 'advanceScheduleType':
                  return (
                    <>
                      <ScheduleType
                        name="advanceType"
                        title="What kind daily schedule you need?"
                        active={advanceType}
                        data={ST.filter((val) => ADV_ST[type].includes(val.key))}
                        onChange={this.handleSwitch}
                      />
                    </>
                  );
                case 'scheduleRange':
                  return (
                    <div>
                      <ScheduleRange
                        name="scheduleRange"
                        advanceType={advanceType}
                        scheduleRange={scheduleRange}
                        onChange={this.handleScheduleRange}
                      />
                    </div>
                  );
                case 'scheduleDelivery':
                  return (
                    <div>
                      <ScheduleDelivery
                        name="scheduleDelivery"
                        type={type}
                        scheduleDelivery={scheduleDelivery}
                        onChange={this.handleScheduleDelivery}
                        onWeekChange={this.handleWeekdataChange}
                      />
                    </div>
                  );
                case 'outputOption':
                  return (
                    <div>
                      <ScheduleOutput
                        name="outputOption"
                        outputOption={outputOption}
                        onChange={this.handleOptionChange}
                      />
                    </div>
                  );
                default:
                  return (
                    <>
                      <ScheduleType
                        name="type"
                        title="How often do you want to run the report?"
                        active={type}
                        data={types}
                        onChange={this.handleSwitch}
                      />
                    </>
                  );
              }
            })()}
          </div>
          <div className={Styles.buttonssect}>
            {step !== 'scheduleType' && (
              <div className={Styles.btnback}>
                <Button size="xl" color="secondary" className={Styles.back} onClick={this.onBackClick}>
                  <Leftarrow />
                  Back
                </Button>
              </div>
            )}

            {finish === false && (
              <div className={Styles.btncontinu}>
                <Button size="xl" onClick={this.onContinueClick}>
                  Save and Continue
                </Button>
              </div>
            )}

            {finish === true && (
              <div className={Styles.btnsubmit}>
                <Button size="xl" onClick={this.onContinueClick}>
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

/**
 * Map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  createdData: state.createScheduleReducer,
  getData: state.getScheduleDetailsReducer,
  updateData: state.updateScheduleReducer,
  ...state.authReducer,
});

/**
 * Proptypes
 */
AddSchedule.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      reportKey: PropTypes.string,
      reportType: PropTypes.string,
      baseTable: PropTypes.string,
      scheduleid: PropTypes.string,
      step: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  createData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};

/**
 * Export
 */
export default connect(mapStateToProps, { createData, getData, updateData })(
  AddSchedule,
);
