import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';
import { callApi } from './https';

export const upload = async (
    formData: FormData, phoneNumber:string
  ): Promise<ApiResponse> => {
    const requestOptions: { method: string; body: FormData } = {
      method: 'POST',
      body: formData,
    };

  try {
    return await callApi(`${API_URLS.upload}?phoneNumber=${phoneNumber}`, requestOptions as unknown as ApiRequestOptions);
  } catch (error) {
    throw error;
  }
};
