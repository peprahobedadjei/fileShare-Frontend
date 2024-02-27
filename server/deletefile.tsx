import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const deleteFile = async (
    file_id: string,
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    return await callApi(`${API_URLS.deleteFile}?file_id=${file_id}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
