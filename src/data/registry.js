import { apiData as webApiData } from './index';
import { mobileApiData } from './mobile';
import { erpApiData } from './erp';

export const API_MODES = {
  web: 'web',
  mobile: 'mobile',
  erp: 'erp',
};

export const API_MODE_STORAGE_KEY = 'gis-api-docs-mode';

export function getApiData(mode = API_MODES.web) {
  if (mode === API_MODES.mobile) return mobileApiData;
  if (mode === API_MODES.erp) return erpApiData;
  return webApiData;
}

export function loadApiMode() {
  try {
    const stored = localStorage.getItem(API_MODE_STORAGE_KEY);
    if (stored === API_MODES.mobile) return API_MODES.mobile;
    if (stored === API_MODES.erp) return API_MODES.erp;
    return API_MODES.web;
  } catch {
    return API_MODES.web;
  }
}

export function saveApiMode(mode) {
  try {
    localStorage.setItem(API_MODE_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

export { webApiData, mobileApiData, erpApiData };
