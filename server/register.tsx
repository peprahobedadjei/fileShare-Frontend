import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const register = async (
  outletName: string,
  outletOwner: string,
  outletPhoneNumber: string,
  outletPassword: string,
  landMark: string,
  url: string
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      outletName: outletName,
      outletOwnerName: outletOwner,
      outletPhoneNumber: outletPhoneNumber,
      outletPassword: outletPassword,
      landMark: landMark,
      outletUrl: url,
    }),
  };

  try {
    return await callApi(`${API_URLS.register}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
