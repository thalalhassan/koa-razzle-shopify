import { combineReducers } from 'redux';
import { Actions } from '../actions/types';
import authReducer from './authReducer';
import commonReducer from './commonReducer';

export default combineReducers({
  authReducer,
  selectReducer: commonReducer(Actions.GET_SELECT_DATA),
  subSelectReducer: commonReducer(Actions.GET_SUBSELECT_DATA),

  getProductsReducer: commonReducer(Actions.GET_PRODUCT_DATA),
  getProductDetailsReducer: commonReducer(Actions.GET_PRODUCT_DETAILS),
  updateProductReducer: commonReducer(Actions.UPDATE_PRODUCT_DATA),
  deleteProductReducer: commonReducer(Actions.DELETE_PRODUCT_DATA),
  createProductReducer: commonReducer(Actions.CREATE_PRODUCT_DATA),

  getAnalyticsReducer: commonReducer(Actions.GET_ANALYTICS_DATA),
  getfilterOptionsReducer: commonReducer(Actions.GET_FILTEROPTION_DATA),
  getReportFieldsReducer: commonReducer(Actions.GET_REPORTFIELD_DATA),

  getReportsReducer: commonReducer(Actions.GET_REPORT_DATA),
  getReportDetailsReducer: commonReducer(Actions.GET_REPORT_DETAILS),
  updateReportReducer: commonReducer(Actions.UPDATE_REPORT_DATA),
  deleteReportReducer: commonReducer(Actions.DELETE_REPORT_DATA),
  createReportReducer: commonReducer(Actions.CREATE_REPORT_DATA),

  getSubscriptionsReducer: commonReducer(Actions.GET_SUBSCRIPTION_DATA),
  getSubscriptionDetailsReducer: commonReducer(Actions.GET_SUBSCRIPTION_DETAILS),
  updateSubscriptionReducer: commonReducer(Actions.UPDATE_SUBSCRIPTION_DATA),
  deleteSubscriptionReducer: commonReducer(Actions.DELETE_SUBSCRIPTION_DATA),
  createSubscriptionReducer: commonReducer(Actions.CREATE_SUBSCRIPTION_DATA),

  getPlanReducer: commonReducer(Actions.GET_PLAN_DATA),
  getCategoryReducer: commonReducer(Actions.GET_CATEGORY_DATA),

  getShopReducer: commonReducer(Actions.GET_SHOP_DATA),
  updateShopReducer: commonReducer(Actions.UPDATE_SHOP_DATA),

  getNotificationReducer: commonReducer(Actions.GET_NOTIFICATION_DATA),
  updateNotificationReducer: commonReducer(Actions.UPDATE_NOTIFICATION_DATA),

  createScheduleReducer: commonReducer(Actions.CREATE_SCHEDULE_DATA),
  getScheduleReducer: commonReducer(Actions.GET_SCHEDULE_DATA),
  getScheduleDetailsReducer: commonReducer(Actions.GET_SCHEDULE_DETAILS),
  updateScheduleReducer: commonReducer(Actions.UPDATE_SCHEDULE_DATA),
  deleteScheduleReducer: commonReducer(Actions.DELETE_SCHEDULE_DATA),
  getScheduleNow: commonReducer(Actions.GET_SCHEDULE_NOW),

  getScheduleJobReducer: commonReducer(Actions.GET_SCHEDULE_JOB_DATA),
  getShopDetailsReducer: commonReducer(Actions.GET_SHOP_DETAIL),

  getCurrentAnalyticsReducer: commonReducer(Actions.GET_ALL_CURRENT_ANALYTICS),
  getPreviousAnalyticsReducer: commonReducer(Actions.GET_ALL_PREVIOUS_ANALYTICS),
  getCurrentSalesOverviewReducer: commonReducer(Actions.GET_CURRENT_SALES_OVERVIEW),
  getPreviousSalesOverviewReducer: commonReducer(Actions.GET_PREVIOUS_SALES_OVERVIEW),
  getSalesBreakdownReducer: commonReducer(Actions.GET_SALES_BREAKDOWN),
  getRevenueByChannelReducer: commonReducer(Actions.GET_REVENUE_BY_CHANNEL),
  getCustomersByCountryReducer: commonReducer(Actions.GET_CUSTOMERS_BY_COUNTRY),
  getCurrentCustomersByMonthReducer: commonReducer(Actions.GET_CURRENT_CUSTOMERS_BY_MONTH),
  getPreviousCustomersByMonthReducer: commonReducer(Actions.GET_PREVIOUS_CUSTOMERS_BY_MONTH),
  getAllTaxReducer: commonReducer(Actions.GET_ALL_TAX),
  getAllRefundReducer: commonReducer(Actions.GET_ALL_REFUND),
  syncNowReducer: commonReducer(Actions.ANALYTICS_SYNC_NOW),
  getAnalyticsDateReducer: commonReducer(Actions.GET_ANALYTICS_LAST_DATE),

  exportReport: commonReducer(Actions.EXPORT_REPORT),
});
