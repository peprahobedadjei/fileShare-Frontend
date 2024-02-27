import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const saveFile = async (
    fileId: string,
    phoneNumber:string
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    return await callApi(`${API_URLS.saveFile}?phoneNumber=${phoneNumber}&folder=saved&fileId=${fileId}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
