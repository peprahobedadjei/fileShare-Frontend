import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const downloadFile = async (
    file_id: string,
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    return await callApi(`${API_URLS.downloadfile}?file_id=${file_id}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
