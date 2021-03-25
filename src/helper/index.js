import moment from 'moment';
import Cookies from 'js-cookie';

/**
 * getLocalStorageData
 */
export const getShopOriginFromUrl = () => {
  const urlSplitArray = window.location.href
    .split(/[=/&]/)
    .filter((s) => /myshopify.com/.test(s));
  let [shopOrigin] = urlSplitArray;
  const cookieShopOrigin = Cookies.get('shopOrigin');
  if (!shopOrigin) shopOrigin = cookieShopOrigin;
  if (shopOrigin) window.sessionStorage.setItem('shopOrigin', shopOrigin);
  console.log({ shopOrigin, cookieShopOrigin, ss: window.sessionStorage.getItem('shopOrigin') });
  return shopOrigin;
};

/**
 *
 * @param {*} data
 * @return {*}
 */
export const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    // console.log('=====================parseJson error=====================', e);
    return data;
  }
};

/**
 * operatorFunctions
 */
export const OPERATOR_FUNCTIONS = {
  '+': function (a, b) {
    return a + b;
  },
  '<': function (a, b) {
    return a < b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '*': function (a, b) {
    return a * b;
  },
  '/': function (a, b = 1) {
    return a / b;
  },
};

/**
 * getLocalStorageData
 */
export const getLocalStorageData = () => {
  const shopOrigin = getShopOriginFromUrl();
  const shopStorage = window.sessionStorage.getItem(shopOrigin) || {};
  // const shopStorage = localStorage.getItem(shopOrigin) || '{}';
  // const shopStorage = Cookies.get(shopOrigin) || {};
  return parseJson(shopStorage);
};

/**
 * setLocalStorageData
 * @param {Object} keyValue
 */
export const setLocalStorageData = (keyValue = {}) => {
  const shopOrigin = getShopOriginFromUrl();
  const shopStorage = getLocalStorageData();
  const setData = JSON.stringify({
    ...shopStorage,
    ...keyValue,
  });
  window.sessionStorage.setItem(shopOrigin, setData);
  // localStorage.setItem(shopOrigin, setData);
  // Cookies.set(shopOrigin, setData);
};

/**
 * setLocalStorageData
 * @param {Object} keyValue
 */
export const deleteLocalStorageData = (keys = []) => {
  const shopOrigin = getShopOriginFromUrl();
  const shopStorage = getLocalStorageData();
  keys.map((key) => delete shopStorage[key]);
  const setData = JSON.stringify(shopStorage);
  window.sessionStorage.setItem(shopOrigin, setData);
  // localStorage.setItem(shopOrigin, setData);
  // Cookies.set(shopOrigin, setData);
};

/**
 * Get nested prop value of object
 * @param {*} obj
 * @param {*} prop
 * @return {*}
 */
export const getObjectProp = (obj, prop) => {
  if (!obj) return null;

  if (typeof obj === 'string') {
    return obj;
  }
  if (typeof obj === 'undefined') {
    return false;
  }
  const _index = prop.indexOf('.');
  if (_index > -1) {
    return getObjectProp(
      obj[prop.substring(0, _index)],
      prop.substr(_index + 1),
    );
  }
  return obj[prop];
};

/**
 * checks if the field is empty
 * @param {*} value
 */
export const isEmpty = (value) => value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);

/**
 *
 * @param {*} passedItems
 */
export const getHeaderFields = (passedItems) => {
  if (passedItems && passedItems.length) {
    const headerFields = {};
    passedItems.forEach((item) => {
      if (!headerFields[item.parentTable]) headerFields[item.parentTable] = [];
      headerFields[item.parentTable].push(item.name);
    });
    return headerFields;
  }
  return {};
};

/**
 * Join css class names
 * @param {*} classes
 */
export function ClassNames(classes) {
  return classes.join(' ');
}

/**
 *
 */
export function stringCamelizer(str) {
  if (str && typeof str === 'string') {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    // return str
    //   .replace(/(?:^\w|[A-Z]|\b\w)/g,
    //       (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    //   .replace(/\s+/g, '');
  }
  return str;
}

/**
 * compareObjects
 * @param {*} obj1
 * @param {*} obj2
 */
export function compareObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 *
 * @param {*} scheduleType
 * @param {*} advanceScheduleType
 * @param {*} scheduleRange
 * @param {*} scheduleDelivery
 */
export function extractScheduleData(
  scheduleType,
  advanceScheduleType,
  scheduleRange,
  scheduleDelivery,
  outputOption,
) {
  if (isEmpty(scheduleRange) === false) {
    let range = {};
    if (advanceScheduleType === 'NND') {
      const { dayCount } = scheduleRange;
      range = { dayCount };
    }
    if (advanceScheduleType === 'SSD') {
      const { scheduleDate } = scheduleRange;
      range = { scheduleDate };
    }
    if (advanceScheduleType === 'CDR') {
      const { fromDate, toDate, fromTime, toTime } = scheduleRange;
      range = { fromDate, toDate, fromTime, toTime };
    }
    if (advanceScheduleType === 'CTR') {
      const { from, to } = scheduleRange;
      range = { from, to };
    }
    return range;
  }
  if (isEmpty(scheduleDelivery) === false) {
    let delivery = {};
    if (scheduleType === 'H') {
      const { scheduleHour } = scheduleDelivery;
      delivery = { scheduleHour };
    }
    if (scheduleType === 'D') {
      const { dailyTime } = scheduleDelivery;
      delivery = { dailyTime };
    }
    if (scheduleType === 'W') {
      const { weektime, weekday } = scheduleDelivery;
      delivery = { weektime, weekday };
    }
    if (scheduleType === 'M') {
      const { dayCount, time, weekdatas, week } = scheduleDelivery;
      delivery = { dayCount, time, weekdatas, week };
    }
    return delivery;
  }
  if (isEmpty(outputOption) === false) {
    let output = {};
    if (outputOption.value === 'email') {
      const {
        value,
        filetype,
        attachment,
        email,
        ccemail,
        bccemail,
        emailcontent,
      } = outputOption;
      output = {
        value,
        filetype,
        attachment,
        email,
        ccemail,
        bccemail,
        emailcontent,
      };
    }
    if (outputOption.value === 'Googledrive') {
      const { value, filetype, attachment, email } = outputOption;
      output = { value, filetype, attachment, email };
    }
    return output;
  }
  return null;
}

/*
 * getParamsFrom Location Search
 * @param {*} search
 * @param {*} fields
 */
export const getParamsFromSearch = (search, fields = []) => {
  const paramsObject = {};
  const params = new URLSearchParams(search);
  fields.forEach((field) => {
    paramsObject[field] = params.get(field)?.replace(/"/g, '');
  });
  return paramsObject;
};

/**
 *
 * @param {*} array
 * @param {*} test
 * @return {*}
 */
export const checkRegexMatch = (array = [], test) => {
  const regexList = array.map((e) => new RegExp(e));
  const isMatch = regexList.some((rx) => rx.test(test));
  return isMatch;
};

/**
 * Get period label
 * @param {*} val
 */
export const getPeriodLabel = (val) => {
  let periodLabel = '';
  switch (val) {
    case 365:
      periodLabel = 'Last 365 days';
      break;
    case 30:
      periodLabel = 'Last 30 days';
      break;
    case 7:
      periodLabel = 'Last 7 days';
      break;
    default:
      break;
  }
  return periodLabel;
};

/**
 * Get period
 * @param {*} val
 */
export const getPeriods = (val) => {
  const periods = [];
  switch (val) {
    case 365:
      for (let i = 0; i < 12; i += 1) {
        const date = moment().subtract(i, 'months').toDate();
        periods.push(moment(date).format('MMM'));
      }
      break;
    case 30:
      for (let i = 0; i < 4; i += 1) {
        const date = moment().subtract(i, 'weeks').week();
        periods.push(date);
      }
      break;
    case 7:
      for (let i = 0; i < 7; i += 1) {
        const date = moment().subtract(i, 'days').toDate();
        periods.push(moment(date).format('ddd'));
      }
      break;
    default:
      break;
  }
  return periods;
};

export const ordinalSuffixOf = (i) => {
  if (i === 1) {
    return `${i}st`;
  }
  if (i === 2) {
    return `${i}nd`;
  }
  if (i === 3) {
    return `${i}rd`;
  }
  return `${i}th`;
};

/**
 * Get period and data
 * @param {*} name
 * @param {*} data
 */
export const getPeriodData = (name, periods, currentPeriod, data) => {
  let originalPeriod = [];
  let originalData = [];
  switch (name) {
    case 'previousSalesOverview':
      if (currentPeriod === 30) {
        periods.map((period, index) => {
          const sum = data[period - 4] || 0;
          originalPeriod.push(`${ordinalSuffixOf(index + 1)} Week`);
          originalData.push(sum);
          return true;
        });
      } else {
        periods.map((period) => {
          const sum = data[period] || 0;
          originalPeriod.push(period);
          originalData.push(sum);
          return true;
        });
      }
      break;
    default:
      periods.map((period, index) => {
        const sum = data[period] || 0;
        if (currentPeriod === 30) {
          originalPeriod.push(`${ordinalSuffixOf(index + 1)} Week`);
        } else {
          originalPeriod.push(period);
        }
        originalData.push(sum);
        return true;
      });
      break;
  }
  if (currentPeriod !== 30) {
    originalPeriod = originalPeriod.reverse();
  }
  originalData = originalData.reverse();
  switch (name) {
    case 'taxData':
    case 'refundData':
      if (data) {
        originalPeriod = originalPeriod.slice(-5);
        originalData = originalData.slice(-5);
      }
      break;
    default:
      break;
  }
  return { originalPeriod, originalData };
};

/**
 * Get Percentage Change
 * @param {*} data1
 * @param {*} data2
 */
export const getPercentageChange = (currentData = 0, previousData = 0) => {
  const diff = currentData - previousData;
  let percentage = (diff * 100) / (previousData || 1);
  if (percentage < 0) {
    percentage *= -1;
  }
  return percentage.toFixed(1);
};

/**
 * parseISOString to date
 * @param {*} s
 */
export const parseISOString = (s) => {
  if (!s || typeof s !== 'string') return s;
  const b = s.split(/\D+/);
  b[1] -= 1;
  return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5], b[6]));
};

const dateRegex = '^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$';
/**
 * Format date
 * @param {*} date
 * @param {*} time
 */
export const formatDate = (date, time = true) => {
  if (!date || typeof date === 'undefined') {
    return '';
  }
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (monthNames.includes(date)) return date;
  const newDate = new RegExp(dateRegex).test(date)
    ? parseISOString(date)
    : new Date(date);

  const day = newDate.getDate();
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();
  if (!time) return `${monthNames[monthIndex]} ${day} , ${+year}`;

  const hrs = newDate.getHours();
  const minutes = newDate.getMinutes();
  return `${monthNames[monthIndex]} ${day} , ${+year}  at  ${hrs % 12}:${
    minutes < 10 ? `0${minutes}` : minutes
  }${hrs / 12 >= 1 ? 'PM' : 'AM'}`;
};

export function createMarkup(text) {
  return {
    __html: text,
  };
}
