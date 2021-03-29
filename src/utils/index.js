import Hourlyicon from 'assets/icons/hourlyicon';
import Dailyicon from 'assets/icons/dailyicon';
import Weeklyicon from 'assets/icons/weeklyicon';
import Monthlyicon from 'assets/icons/monthlyicon';
import moment from 'moment';

export const myreport = {
  title: 'My Reports',
  icon: '/public/images/myreport.svg',
  description: 'List of saved report formats and edited pre-created reports',
  data: [
    { text: 'Inventory on Hand', linkurl: '/inventorydetail' },
    { text: 'Inventory Sales Value Report', linkurl: '/inventorydetail' },
    { text: 'Inventory Cost Report', linkurl: '/inventorydetail' },
    { text: 'Out of Stock Product', linkurl: '/inventorydetail' },
  ],
};

export const parentTables = [
  {
    label: 'Order',
    value: 'order',
  },
];

export const sales = {
  title: 'Sales & Order Reports',
  icon: '/public/images/salesreport.svg',
  description: '',
  data: [
    { text: 'Last 24 hours orders', linkurl: '/reportdetail' },
    { text: 'Last 30 days Sales Summary', linkurl: '/reportdetail' },
    { text: 'Finance Summary Report', linkurl: '/reportdetail' },
    { text: 'Sales by Product', linkurl: '/reportdetail' },
    { text: 'Sales by Product Variant SKU  ', linkurl: '/reportdetail' },
    { text: 'Sales by Product Vendor', linkurl: '/reportdetail' },
    { text: 'Sales by POS  ', linkurl: '/reportdetail' },
    { text: 'Sales by Staff  ', linkurl: '/reportdetail' },
    { text: 'Sales by Discount  ', linkurl: '/reportdetail' },
    { text: 'Sales by Channel  ', linkurl: '/reportdetail' },
    { text: 'Sales by Customer Name', linkurl: '/reportdetail' },
    { text: 'Refund Report', linkurl: '/reportdetail' },
    { text: 'Refunded Products', linkurl: '/reportdetail' },
    { text: 'Commission Report', linkurl: '/reportdetail' },
    { text: 'Completed Draft Order', linkurl: '/reportdetail' },
    { text: 'Pending Draft Order', linkurl: '/reportdetail' },
    {
      text: 'Order Tags & Line Item properties',
      linkurl: '/reportdetail',
    },
    { text: 'Sales by Collection', linkurl: '/reportdetail' },
    { text: 'Sales Cost Margin Report', linkurl: '/reportdetail' },
  ],
};

export const products = {
  title: 'Product & Variant Reports',
  icon: '/public/images/productreport.svg',
  description: '',
  data: [
    { text: 'Best Selling Products', linkurl: '/reportdetail' },
    { text: 'Most Profitable Products', linkurl: '/reportdetail' },
    { text: '(High Margin Products)', linkurl: '/reportdetail' },
    { text: 'COGS Report', linkurl: '/reportdetail' },
    { text: 'Total Products Sold', linkurl: '/reportdetail' },
    { text: 'Never sold products (last 90 days)', linkurl: '/reportdetail' },
    { text: 'Best Collection', linkurl: '/reportdetail' },
    { text: 'All Product', linkurl: '/reportdetail' },
    { text: 'Product by collection', linkurl: '/reportdetail' },
    { text: 'Products by Vendor & Product tags', linkurl: '/reportdetail' },
    { text: 'Products by Product type', linkurl: '/reportdetail' },
    { text: 'Sales by Product', linkurl: '/reportdetail' },
    { text: 'Sales by Product Variant ', linkurl: '/reportdetail' },
  ],
};

export const inventory = {
  title: 'Inventory Reports',
  icon: '/public/images/inventoryreport.svg',
  description: '',
  data: [
    { text: 'Inventory on Hand', linkurl: '/reportdetail' },
    { text: 'Inventory Sales Value Report', linkurl: '/reportdetail' },
    { text: 'Inventory Cost Report', linkurl: '/reportdetail' },
    { text: 'Out of Stock Product', linkurl: '/reportdetail' },
    { text: 'Inventory level Indicator', linkurl: '/reportdetail' },
    { text: 'Inventory by Location', linkurl: '/reportdetail' },
    { text: 'Inventory by Product Type', linkurl: '/reportdetail' },
    { text: 'Low Stock Product', linkurl: '/reportdetail' },
  ],
};

export const payment = {
  title: 'Shopify Payment Payout Reports',
  icon: '/public/images/paymentpayout.svg',
  description: '',
  data: [
    { text: 'Inventory on Hand', linkurl: '/reportdetail' },
    { text: 'Inventory Sales Value Report', linkurl: '/reportdetail' },
    { text: 'Inventory Cost Report', linkurl: '/reportdetail' },
    { text: 'Out of Stock Product', linkurl: '/reportdetail' },
    { text: 'Inventory level Indicator', linkurl: '/reportdetail' },
    { text: 'Inventory by Location', linkurl: '/reportdetail' },
    { text: 'Inventory by Product Type', linkurl: '/reportdetail' },
    { text: 'Low Stock Product', linkurl: '/reportdetail' },
  ],
};

export const salesmini = {
  title: 'Sales',
  count: '116',
  percentage: '2.2',
  description: 'then Last week',
  direction: 'up',
  grapcolor1: '#C15CFF',
  grapcolor2: '#5063FF',
};

export const revenue = {
  title: 'Revenue',
  count: '$ 152,002',
  percentage: '8.0',
  description: 'then Last week',
  direction: 'up',
  grapcolor1: '#2AF594',
  grapcolor2: '#45D18E',
};

export const profit = {
  title: 'Profit',
  count: '$ 38,254',
  percentage: '6.0',
  description: 'then Last week',
  direction: 'down',
  grapcolor1: '#82D2FF',
  grapcolor2: '#2EACF3',
};

export const costs = {
  title: 'Cost',
  count: '$ 110,35',
  percentage: '3.0',
  description: 'then Last week',
  direction: 'down',
  grapcolor1: '#FF8787',
  grapcolor2: '#FD2A2A',
};

export const weekdata = [
  { value: 'sunday', label: 'S' },
  { value: 'monday', label: 'M' },
  { value: 'tuesday', label: 'T' },
  { value: 'wednesday', label: 'W' },
  { value: 'thursday', label: 'T' },
  { value: 'friday', label: 'F' },
  { value: 'saturday', label: 'S' },
];

export const weeks = [
  { value: 'firstWeek', label: '1st Week' },
  { value: 'secondWeek', label: '2nd Week' },
  { value: 'thirdWeek', label: '3rd Week' },
  { value: 'fourthWeek', label: '4th Week' },
];

export const outputOptions = [
  {
    name: 'sendto',
    value: 'email',
    html: 'email',
    id: 'email',
    label: 'Email',
  },
  {
    name: 'sendto',
    value: 'Googledrive',
    html: 'GoogleDrive',
    id: 'Googledrive',
    label: 'Google Drive',
  },
];

export const ADV_ST = {
  H: ['NND', 'WTD', 'SSD', 'CDR'],
  D: ['NND', 'WTD', 'MTD', 'QTD', 'YTD', 'SSD', 'CDR', 'CTR'],
  W: ['NND', 'MTD', 'QTD', 'YTD', 'SSD', 'CDR'],
  M: ['NND', 'QTD', 'YTD', 'SSD', 'CDR'],
};

export const types = [
  {
    title: 'Hourly',
    key: 'H',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Hourlyicon,
  },
  {
    title: 'Daily',
    key: 'D',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Dailyicon,
  },
  {
    title: 'Weekly',
    key: 'W',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Weeklyicon,
  },
  {
    title: 'Monthly',
    key: 'M',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Monthlyicon,
  },
];

export const ST = [
  {
    title: 'Last n number of days',
    key: 'NND',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Hourlyicon,
  },
  {
    title: 'WTD',
    key: 'WTD',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Dailyicon,
  },
  {
    title: 'MTD',
    key: 'MTD',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Dailyicon,
  },
  {
    title: 'QTD',
    key: 'QTD',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Weeklyicon,
  },
  {
    title: 'YTD',
    key: 'YTD',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Monthlyicon,
  },
  {
    title: 'Static start date',
    key: 'SSD',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Monthlyicon,
  },
  {
    title: 'Custome date range',
    key: 'CDR',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Monthlyicon,
  },
  {
    title: 'Custome dailyTime range',
    key: 'CTR',
    description:
      'Report delivered at hourly intervals. Example:Every 1-hour, 2-hour and more.',
    icon: Monthlyicon,
  },
];

export const stepData = {
  scheduleType: { label: 'Schedule Type', index: 1 },
  advanceScheduleType: { label: 'Advance Schedule Type', index: 2 },
  scheduleRange: { label: 'Schedule Range', index: 3 },
  scheduleDelivery: { label: 'Schedule Delivery', index: 4 },
  outputOption: { label: 'outout Option', index: 5 },
};

export const DATE_RANGE = {
  anyTime: {
    startDateRange: moment(),
    endDateRange: moment(),
  },
  today: {
    startDateRange: moment().startOf('day'),
    endDateRange: moment().endOf('day'),
  },
  thisWeek: {
    startDateRange: moment().startOf('week'),
    endDateRange: moment().endOf('week'),
  },
  lastWeek: {
    startDateRange: moment().subtract(1, 'weeks').startOf('week'),
    endDateRange: moment().subtract(1, 'weeks').endOf('week'),
  },
  thisMonth: {
    startDateRange: moment().startOf('month'),
    endDateRange: moment().endOf('month'),
  },
  lastMonth: {
    startDateRange: moment().subtract(1, 'months').startOf('month'),
    endDateRange: moment().subtract(1, 'months').endOf('month'),
  },
  lastYear: {
    startDateRange: moment().subtract(1, 'y').startOf('year'),
    endDateRange: moment().subtract(1, 'y').endOf('year'),
  },
  thisYear: {
    startDateRange: moment().startOf('year'),
    endDateRange: moment().endOf('year'),
  },
  quarter1: {
    startDateRange: moment().quarter(1).startOf('quarter'),
    endDateRange: moment().quarter(1).endOf('quarter'),
  },
  quarter2: {
    startDateRange: moment().quarter(2).startOf('quarter'),
    endDateRange: moment().quarter(2).endOf('quarter'),
  },
  quarter3: {
    startDateRange: moment().quarter(3).startOf('quarter'),
    endDateRange: moment().quarter(3).endOf('quarter'),
  },
  quarter4: {
    startDateRange: moment().quarter(4).startOf('quarter'),
    endDateRange: moment().quarter(4).endOf('quarter'),
  },
};

export const DATE_RANGE_OPTIONS = [
  { value: 'anyTime', label: 'Any Time' },
  { value: 'today', label: 'Today' },
  { value: 'thisWeek', label: 'This week' },
  { value: 'thisMonth', label: 'This month' },
  { value: 'quarter1', label: 'Quarter 1' },
  { value: 'quarter2', label: 'Quarter 2' },
  { value: 'quarter3', label: 'Quarter 3' },
  { value: 'quarter4', label: 'Quarter 4' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'lastWeek', label: 'Last week' },
  { value: 'lastMonth', label: 'Last month' },
  { value: 'lastYear', label: 'Last year' },
  { value: 'custom', label: 'Custom' },
];
