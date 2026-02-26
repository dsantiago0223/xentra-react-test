import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountBalance } from '../api/user/User';

const useUserAccountBalance = () => {
  const [accountBalance, setAccountBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getUserBalance = async () => {
        const { data, error } = await getAccountBalance();
        if (data) {
          setAccountBalance(data.balance);
        } else if (error) {
          setResponseError(error);
        }
        setLoading(false);
      };

      getUserBalance();
      //return () => {};
    }, []),
  );

  return { accountBalance, loading, responseError };
};

export default useUserAccountBalance;
