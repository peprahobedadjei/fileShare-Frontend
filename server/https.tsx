import API_URLS from '../utils/baseUrls';
import { ApiRequestOptions, ApiResponse } from './apiTypes';

export const callApi = async <T extends {}>(
  url: string,
  options: ApiRequestOptions
) => {
  try {
    const requestOptions: RequestInit = {
      method: options.method,
      headers: {
        ...options.headers,
      },
    };

    if (options.body) {
      requestOptions.body = options.body;
    }
    const response = await fetch(`${API_URLS.base}${url}`, requestOptions);

    const data: ApiResponse<T> = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
