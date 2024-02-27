// apiTypes.ts

export type ApiRequestOptions = {
  method: string;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string | null;
};

export type ApiResponse<T = any> = {
  success: boolean;
  body?: T;
  errors?: string;
  status: number;
};
