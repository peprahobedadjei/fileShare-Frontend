import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const outletFeedback = async (
  outlet_name: string,
  currentValue: number,
  fileManagementOption: string,
  performanceOption: string,
  taskEasierOption: string,
  comment: string
): Promise<ApiResponse> => {
  const requestOptions: ApiRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        outlet_name: outlet_name,
        currentValue:currentValue,
        fileManagementOption:fileManagementOption,
        performanceOption:performanceOption,
        taskEasierOption:taskEasierOption,
        comment:comment
    }),
  };

  try {
    return await callApi(`${API_URLS.outletFeedback}`, requestOptions);
  } catch (error) {
    throw error;
  }
};
