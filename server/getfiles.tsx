import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const getFiles = async (
  phoneNumber: string,
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    return await callApi(`${API_URLS.getFiles}?phoneNumber=${phoneNumber}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
