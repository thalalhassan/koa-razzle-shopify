import Axios from 'axios';
import { toast } from 'react-toastify';

/**
 * get Data
 * @param {*} type
 * @param {*} url
 * @param {*} params
 */
export function getData(type, url, params) {
  return {
    type,
    payload: {
      request: {
        url,
        params,
      },
    },
  };
}

/**
 * create Data
 * @param {*} type
 * @param {*} url
 * @param {*} data
 * @param {*} params
 */
export function createData(type, url, data, params = {}) {
  return {
    type,
    payload: {
      request: {
        method: 'post',
        data,
        url,
        params,
      },
    },
  };
}

/**
 * delete Data
 * @param {*} type
 * @param {*} url
 * @param {*} params
 */
export function deleteData(type, url, params) {
  return {
    type,
    payload: {
      request: {
        url,
        method: 'delete',
        params,
      },
    },
  };
}

/**
 * update Data
 * @param {*} type
 * @param {*} url
 * @param {*} params
 */
export function updateData(type, url, data, params = {}) {
  return {
    type,
    payload: {
      request: {
        method: 'put',
        data,
        url,
        params,
      },
    },
  };
}

/**
 * get Report
 * @param {*} url
 * @param {*} params
 * @param {*} exportType
 */
export function exportData(url, params, exportType, toasterId) {
  let toastId = toasterId;

  Axios({
    url,
    params,
    method: 'GET',
    responseType: 'blob',
    onDownloadProgress: (p) => {
      const { loaded, total } = p;
      const progress = loaded / total;
      if (progress === 1) return toast.dismiss(toastId);
      if (toastId) return toast.update(toastId, { progress });
      toastId = toast('Downloading....', { progress });
      return true;
    },
  })
    .then((response) => {
      toast.dismiss(toastId);
      const downloadurl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadurl;
      const fileName = `${+new Date()}.${exportType}`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      toast.dismiss(toastId);
      if (err.response?.status === 500) {
        toast.error('Something went wrong');
      } else {
        toast.warning('No data to export');
      }
    });
}
