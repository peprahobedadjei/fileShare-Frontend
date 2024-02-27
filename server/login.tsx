import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const login = async (
  outletPhoneNumber: string,
  outletPassword: string
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      outletPhoneNumber: outletPhoneNumber,
      outletPassword: outletPassword,
    }),
  };

  try {
    return await callApi(`${API_URLS.login}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
