// import { toast } from 'react-toastify';
// const configMethod = action.payload?.config?.method || 'get';
// if (configMethod !== 'get') toast.success(payloadData?._message);
// if (errorsData?._message) toast.error(errorsData?._message);

import { toast } from 'react-toastify';

const initialState = {
  data: null,
  loading: true,
  error: null,
  metaData: {},
};

/**
 * Get Data Reducer
 * @param {*} state
 * @param {*} action
 */
export default function testCommon(TYPE) {
  return (state = initialState, action) => {
    const SUCCESS = `${TYPE}_SUCCESS`;
    const FAIL = `${TYPE}_FAIL`;
    const errorsData = action.error?.response?.data;
    const payloadData = action.payload?.data;

    switch (action.type) {
      case TYPE:
        return { ...state, loading: true };
      case SUCCESS:
        return {
          ...state,
          loading: false,
          data: payloadData?._data,
          metaData: payloadData?._metaData,
        };
      case FAIL:
        if (errorsData?._code === 500) toast.error('Something went wrong');
        return {
          ...state,
          loading: false,
          error: errorsData?._errors,
        };
      default:
        return state;
    }
  };
}
