import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiRequest = axios.create({
  baseURL: 'https://dd438db4-d024-4e90-a7c0-5168d4cbe765.mock.pstmn.io',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-mock-match-request-body"': true,
  },
});

ApiRequest.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


ApiRequest.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error?.response || error.message);
    return Promise.reject(error);
  }
);

export default ApiRequest;
