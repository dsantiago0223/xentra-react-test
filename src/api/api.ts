import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://dd438db4-d024-4e90-a7c0-5168d4cbe765.mock.pstmn.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-mock-match-request-body"': true,
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

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

export default api;
