import React, { Component } from 'react';
import { Actions } from 'actions/types';
import { connect } from 'react-redux';
import { getData, createData } from 'actions';
import PropTypes from 'prop-types';
import Button from 'components/button';
import {
  getPeriods,
  getPeriodData,
  getPeriodLabel,
  getPercentageChange,
  getLocalStorageData,
  setLocalStorageData,
} from 'helper';
import moment from 'moment';
import Masonry from 'react-masonry-css';
import Selectbox from 'components/select';
import Ministatscard from 'components/ministatsCard';
import Analyticschartone from 'components/analyticschartone';
import Analyticscharttwo from 'components/analyticscharttwo';
import Analyticschartthree from 'components/analyticschartthree';
import Analyticschartfive from 'components/analyticschartfive';
import GridSkelton from 'components/SkeltonLoad/GridSkelton';
import Grid8Skelton from 'components/SkeltonLoad/Grid8Skelton';
import Grid4Skelton from 'components/SkeltonLoad/Grid4Skelton';
import Styles from './analytics.module.scss';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPeriod: 365,
      previousPeriod: 730,
      periodLabel: 'Last 365 days',
      periods: getPeriods(365),
    };
  }

  componentDidMount() {
    const { props } = this;
    const { analyticsPeriod = 365 } = getLocalStorageData();

    this.setState({
      currentPeriod: analyticsPeriod,
      previousPeriod: analyticsPeriod * 2,
      periodLabel: getPeriodLabel(analyticsPeriod),
      periods: getPeriods(analyticsPeriod),
    });

    this.analyticsData(props, analyticsPeriod, analyticsPeriod * 2);
  }

  handleSelectChange = (name, val) => {
    const { props } = this;
    this.setState(
      (prevstate) => ({
        ...prevstate,
        [name]: val,
        previousPeriod: 2 * val,
        periodLabel: getPeriodLabel(val),
        periods: getPeriods(val),
      }),
      () => {
        const { currentPeriod, previousPeriod } = this.state;
        this.analyticsData(props, currentPeriod, previousPeriod);
      },
    );
    setLocalStorageData({ analyticsPeriod: val });
  };

  onContinueClick = () => {
    const { props } = this;
    const { currentPeriod, previousPeriod } = this.state;
    props
      .createData(Actions.UPDATE_SCHEDULE_DATA, '/analytics/syncNow', {})
      .then(() => {
        this.analyticsData(props, currentPeriod, previousPeriod);
      });
  };

  analyticsData = (props, currentPeriod, previousPeriod) => {
    props.getData(Actions.GET_ANALYTICS_LAST_DATE, '/analytics/analyticDate');
    props.getData(Actions.GET_ALL_CURRENT_ANALYTICS, '/analytics', {
      currentPeriod,
    });
    props.getData(Actions.GET_ALL_PREVIOUS_ANALYTICS, '/analytics', {
      currentPeriod,
      previousPeriod,
    });
    props.getData(
      Actions.GET_CURRENT_SALES_OVERVIEW,
      '/analytics/salesOverview',
      {
        currentPeriod,
      },
    );
    props.getData(
      Actions.GET_PREVIOUS_SALES_OVERVIEW,
      '/analytics/salesOverview',
      {
        currentPeriod,
        previousPeriod,
      },
    );
    props.getData(Actions.GET_SALES_BREAKDOWN, '/analytics/salesBreakDown', {
      currentPeriod,
    });
    props.getData(
      Actions.GET_REVENUE_BY_CHANNEL,
      '/analytics/revenueByChannel',
      {
        currentPeriod,
      },
    );
    props.getData(
      Actions.GET_CUSTOMERS_BY_COUNTRY,
      '/analytics/customersByCountry',
      {
        currentPeriod,
      },
    );
    props.getData(
      Actions.GET_CURRENT_CUSTOMERS_BY_MONTH,
      '/analytics/customersByMonth',
      {
        currentPeriod,
      },
    );
    props.getData(
      Actions.GET_PREVIOUS_CUSTOMERS_BY_MONTH,
      '/analytics/customersByMonth',
      {
        currentPeriod,
        previousPeriod,
      },
    );
    props.getData(Actions.GET_ALL_TAX, '/analytics/tax', {
      currentPeriod,
    });
    props.getData(Actions.GET_ALL_REFUND, '/analytics/refund', {
      currentPeriod,
    });
  };

  render() {
    const { currentPeriod, periodLabel, periods } = this.state;
    const { props } = this;
    const {
      currentData,
      previousData,
      currentSalesOverview,
      previousSalesOverview,
      salesBreakdownData,
      revenueByChannelData,
      taxData,
      refundData,
      customerData,
      currentCustomerByMonthData,
      previousCustomerByMonthData,
      analyticDate,
    } = props;

    return (
      <div className={Styles.main}>
        <div className={Styles.sectiontitle}>
          <h2>Analytics</h2>
          <div>
            <div className={Styles.sectiontitlerit}>
              <Selectbox
                name="currentPeriod"
                onselectOption={this.handleSelectChange}
                value={currentPeriod}
                data={[
                  { value: 7, label: 'Last 7 days' },
                  { value: 30, label: 'Last 30 days' },
                  { value: 365, label: 'Last 365 days' },
                ]}
              />
              <Button
                color="primary"
                size="xs"
                onClick={this.onContinueClick}
                loading={
                  previousData?.loading
                  || currentData?.loading
                  || previousSalesOverview?.loading
                  || salesBreakdownData?.loading
                  || revenueByChannelData?.loading
                  || currentSalesOverview?.loading
                  || taxData?.loading
                  || refundData?.loading
                  || customerData?.loading
                  || currentCustomerByMonthData?.loading
                  || previousCustomerByMonthData?.loading
                }>
                Sync Now
              </Button>
            </div>
            <div className={Styles.updatedInfoDiv}>
              <p className={Styles.updatedInfo}>
                {`last updated at ${moment(
                  analyticDate?.data?.[0]?.updatedAt,
                ).fromNow()}`}
              </p>
            </div>
          </div>
        </div>
        <div className={Styles.sectionone}>
          {previousData?.loading ? (
            <GridSkelton />
          ) : (
            <Masonry
              breakpointCols={{
                default: 4,
                992: 2,
                768: 2,
                680: 1,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              <div>
                <Ministatscard
                  data={{
                    title: 'Sales',
                    count: currentData?.data?.sales
                      ? currentData?.data?.sales
                      : '0',
                    percentage: getPercentageChange(
                      currentData?.data?.sales,
                      previousData?.data?.sales,
                    ),
                    description: `than ${periodLabel}`,
                    direction:
                      currentData?.data?.sales >= previousData?.data?.sales
                        ? 'up'
                        : 'down',
                    grapcolor1: '#C15CFF',
                    grapcolor2: '#5063FF',
                  }}
                />
              </div>
              <div>
                <Ministatscard
                  data={{
                    title: 'Revenue',
                    count: currentData?.data?.revenue
                      ? currentData?.data?.revenue
                      : '0',
                    percentage: getPercentageChange(
                      currentData?.data?.revenue,
                      previousData?.data?.revenue,
                    ),
                    description: `than ${periodLabel}`,
                    direction:
                      currentData?.data?.revenue >= previousData?.data?.revenue
                        ? 'up'
                        : 'down',
                    grapcolor1: '#2AF594',
                    grapcolor2: '#45D18E',
                  }}
                />
              </div>
              <div>
                <Ministatscard
                  data={{
                    title: 'Profit',
                    count: currentData?.data?.profit
                      ? currentData?.data?.profit
                      : '0',
                    percentage: getPercentageChange(
                      currentData?.data?.profit,
                      previousData?.data?.profit,
                    ),
                    description: `than ${periodLabel}`,
                    direction:
                      currentData?.data?.profit >= previousData?.data?.profit
                        ? 'up'
                        : 'down',
                    grapcolor1: '#82D2FF',
                    grapcolor2: '#2EACF3',
                  }}
                />
              </div>
              <div>
                <Ministatscard
                  data={{
                    title: 'Cost',
                    count: currentData?.data?.cost
                      ? currentData?.data?.cost
                      : '0',
                    percentage: getPercentageChange(
                      currentData?.data?.cost,
                      previousData?.data?.cost,
                    ),
                    description: `than ${periodLabel}`,
                    direction:
                      currentData?.data?.cost >= previousData?.data?.cost
                        ? 'up'
                        : 'down',
                    grapcolor1: '#FF8787',
                    grapcolor2: '#FD2A2A',
                  }}
                />
              </div>
            </Masonry>
          )}
        </div>
        <div className={Styles.sectiontwo}>
          <div className={Styles.colone}>
            {previousSalesOverview?.loading ? (
              <Grid8Skelton />
            ) : (
              <Analyticschartone
                data={[
                  {
                    name: 'Current',
                    data:
                      currentSalesOverview?.data?.finalResult
                      && getPeriodData(
                        'currentSalesOverview',
                        periods,
                        currentPeriod,
                        currentSalesOverview?.data?.finalResult,
                      ).originalData,
                    total: currentSalesOverview?.data?.total,
                  },
                  {
                    name: 'Previous',
                    data:
                      previousSalesOverview?.data?.finalResult
                      && getPeriodData(
                        'previousSalesOverview',
                        periods,
                        currentPeriod,
                        previousSalesOverview?.data?.finalResult,
                      ).originalData,
                    total: previousSalesOverview?.data?.total,
                  },
                ]}
                title="Sales Overview"
                subtitle="Total Amount"
                colors={['#5063FF', '#FDAC34']}
                xaxis={
                  currentSalesOverview?.data
                  && getPeriodData(
                    'currentSalesOverview',
                    periods,
                    currentPeriod,
                    currentSalesOverview?.data,
                  ).originalPeriod
                }
                yaxisPrefix="$"
                yaxiPostfix="k"
                detaillink="/reports/builtin/lineItems/salesOverview"
              />
            )}
          </div>
          <div className={Styles.coltwo}>
            {salesBreakdownData?.loading ? (
              <Grid4Skelton />
            ) : (
              <Analyticscharttwo
                data={[
                  salesBreakdownData?.data?.netPayment
                    - salesBreakdownData?.data?.cost,
                  salesBreakdownData?.data?.shipping,
                  salesBreakdownData?.data?.tax,
                  salesBreakdownData?.data?.cost,
                  salesBreakdownData?.data?.serviceFee,
                ]}
                labels={[
                  'Net Profit',
                  'Shipping',
                  'Tax',
                  'Cost',
                  'Service Fee',
                ]}
                colors={['#FDAC34', '#4BCBD1', '#293644', '#4D7DEB', '#FF4E4E']}
                detaillink="/reports/builtin/orders/salesBreakdown"
              />
            )}
          </div>

          <div className={Styles.coloneb}>
            {revenueByChannelData?.loading ? (
              <Grid4Skelton />
            ) : (
              <Analyticschartfive
                heading="Revenue by Channel"
                detaillink="/reports/builtin/orders/revenueByChannel"
                data={
                  revenueByChannelData?.data?.finalResult
                  && revenueByChannelData?.data?.finalResult
                }
                total={revenueByChannelData?.data?.total}
                colors={[
                  '#4D7DEB',
                  '#09C0D7',
                  '#FDAC34',
                  '#11E164',
                  '#F3521F',
                  '#8161FF',
                  '#67C6FC',
                ]}
                xaxis={['asd']}
              />
            )}
          </div>
          <div className={Styles.colone}>
            {previousCustomerByMonthData?.loading ? (
              <Grid8Skelton />
            ) : (
              <Analyticschartone
                data={[
                  {
                    name: 'Current',
                    data:
                      currentCustomerByMonthData?.data?.finalResult
                      && getPeriodData(
                        'currentCustomerByMonthData',
                        periods,
                        currentPeriod,
                        currentCustomerByMonthData?.data?.finalResult,
                      ).originalData,
                    total: currentCustomerByMonthData?.data?.total,
                  },
                  {
                    name: 'Previous',
                    data:
                      previousCustomerByMonthData?.data?.finalResult
                      && getPeriodData(
                        'previousCustomerByMonthData',
                        periods,
                        currentPeriod,
                        previousCustomerByMonthData?.data?.finalResult,
                      ).originalData,
                    total: previousCustomerByMonthData?.data?.total,
                  },
                ]}
                title="Customer Overview"
                subtitle="Total Count"
                colors={['#5063FF', '#FDAC34']}
                xaxis={
                  currentSalesOverview?.data
                  && getPeriodData(
                    'currentSalesOverview',
                    periods,
                    currentPeriod,
                    currentSalesOverview?.data,
                  ).originalPeriod
                }
                yaxisPrefix=""
                yaxiPostfix=""
                detaillink="/reports/builtin/customers/customerByMonth"
              />
            )}
          </div>
          <div className={Styles.colc}>
            {taxData?.loading ? (
              <Grid4Skelton />
            ) : (
              <Analyticschartthree
                heading="Tax"
                detaillink="/reports/builtin/orders/taxReport"
                data={[
                  {
                    name: 'Tax',
                    data:
                      taxData?.data?.finalResult
                      && getPeriodData(
                        'taxData',
                        periods,
                        currentPeriod,
                        taxData?.data?.finalResult,
                      ).originalData,
                  },
                ]}
                total={taxData?.data?.total}
                colors={['#5063FF']}
                xaxis={
                  taxData?.data?.finalResult
                  && getPeriodData(
                    'taxData',
                    periods,
                    currentPeriod,
                    taxData?.data?.finalResult,
                  ).originalPeriod
                }
              />
            )}
          </div>
          <div className={Styles.colc}>
            {refundData?.loading ? (
              <Grid4Skelton />
            ) : (
              <Analyticschartthree
                heading="REFUND"
                detaillink="/reports/builtin/orders/refundReport"
                data={[
                  {
                    name: 'REFUND',
                    data:
                      refundData?.data?.finalResult
                      && getPeriodData(
                        'taxData',
                        periods,
                        currentPeriod,
                        refundData?.data?.finalResult,
                      ).originalData,
                  },
                ]}
                total={refundData?.data?.total}
                colors={['#50B83C']}
                xaxis={
                  refundData?.data?.finalResult
                  && getPeriodData(
                    'taxData',
                    periods,
                    currentPeriod,
                    refundData?.data?.finalResult,
                  ).originalPeriod
                }
              />
            )}
          </div>
          <div className={Styles.colc}>
            {customerData?.loading ? (
              <Grid4Skelton />
            ) : (
              <Analyticschartfive
                heading="Customer by Country"
                detaillink="/reports/builtin/customers/customerByCountry"
                total={customerData?.data?.total}
                data={
                  customerData?.data?.finalResult
                  && customerData?.data?.finalResult
                }
                colors={[
                  '#67C6FC',
                  '#8161FF',
                  '#F3521F',
                  '#11E164',
                  '#FDAC34',
                  '#09C0D7',
                  '#4D7DEB',
                ]}
                xaxis={['asd']}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Map State To Props
 * @param {*} state
 */
const mapStateToProps = (state) => ({
  currentData: state.getCurrentAnalyticsReducer,
  previousData: state.getPreviousAnalyticsReducer,
  currentSalesOverview: state.getCurrentSalesOverviewReducer,
  previousSalesOverview: state.getPreviousSalesOverviewReducer,
  salesBreakdownData: state.getSalesBreakdownReducer,
  revenueByChannelData: state.getRevenueByChannelReducer,
  customerData: state.getCustomersByCountryReducer,
  currentCustomerByMonthData: state.getCurrentCustomersByMonthReducer,
  previousCustomerByMonthData: state.getPreviousCustomersByMonthReducer,
  taxData: state.getAllTaxReducer,
  refundData: state.getAllRefundReducer,
  analyticDate: state.getAnalyticsDateReducer,
});

/**
 * Proptypes
 */
Analytics.propTypes = {
  // getData: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  currentData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  previousData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  currentSalesOverview: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  previousSalesOverview: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  salesBreakdownData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  revenueByChannelData: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
  }),
  taxData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  refundData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  customerData: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
  }),
  currentCustomerByMonthData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  previousCustomerByMonthData: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }),
  analyticDate: PropTypes.shape({
    data: PropTypes.array,
  }),
};

/**
 * defaultProps
 */
Analytics.defaultProps = {
  currentData: {},
  previousData: {},
  currentSalesOverview: {},
  previousSalesOverview: {},
  salesBreakdownData: {},
  revenueByChannelData: {},
  customerData: {},
  currentCustomerByMonthData: {},
  previousCustomerByMonthData: {},
  taxData: {},
  refundData: {},
  analyticDate: {},
};

/**
 * Export
 */
export default connect(mapStateToProps, { getData, createData })(Analytics);
