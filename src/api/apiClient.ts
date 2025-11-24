import axios from "axios";
import { ApiError } from "./ApiError";
import { buildQueryString } from "../utils/queryString";
import { API_BASE_URL } from "../constants/constants"
//import AsyncStorage from '@react-native-async-storage/async-storage';

//Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-mock-match-request-body"': true,
  },
});

//Request Interceptor
api.interceptors.request.use(
  async (config) => {
    //const token = await AsyncStorage.getItem('userToken');
    //if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

//Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("API ERROR:", error.response.status, error.response.data);
    } else {
      console.log("NETWORK ERROR:", error.message);
    }
    return Promise.reject(error);
  }
);

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiOptions {
  params?: Record<string, any>;
  body?: any;
  headers?: Record<string, any>;
  signal?: AbortSignal; 
}

const request = async <T>(
  method: HttpMethod,
  url: string,
  options: ApiOptions = {}
): Promise<T> => {
  try {
    const query = options.params ? buildQueryString(options.params) : "";

    const response = await api.request<T>({
      method,
      url: `${url}${query}`,
      data: options.body,
      headers: options.headers,
      signal: options.signal,
    });

    return response.data;
  } catch (err: any) {
    if (err.response) {
      const apiError = err.response.data;
      if (apiError) {
        let errorMessage = apiError.error.message
        throw new ApiError(errorMessage, null);  
      } else {
        throw new ApiError(err.response.data?.message || "Server error", err.response.status);
      }
    }

    if (err.request) {
      throw new ApiError("Network connection lost", null);
    }

    throw new ApiError(err.message, null);
  }
};

export const apiClient = {
  request,
  get: <T>(url: string, options?: ApiOptions) =>
    request<T>("GET", url, options),
  post: <T>(url: string, body?: any, options?: ApiOptions) =>
    request<T>("POST", url, { ...options, body }),
  put: <T>(url: string, body?: any, options?: ApiOptions) =>
    request<T>("PUT", url, { ...options, body }),
  patch: <T>(url: string, body?: any, options?: ApiOptions) =>
    request<T>("PATCH", url, { ...options, body }),
  delete: <T>(url: string, options?: ApiOptions) =>
    request<T>("DELETE", url, options),
};
