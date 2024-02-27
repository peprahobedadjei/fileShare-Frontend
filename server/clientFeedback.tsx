import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const clientFeedback = async (
  userName: string,
  currentValue: number,
  performanceOption: string,
  selectedOption:string,
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        client_name:userName,
        currentValue:currentValue,
        performanceOption:performanceOption,
        scanOption:selectedOption
    }),
  };

  try {
    return await callApi(`${API_URLS.clientFeedback}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
