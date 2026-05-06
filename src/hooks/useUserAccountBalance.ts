import { useState, useCallback, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountBalance } from '../api/user/User';
import { AuthContext } from '../context/AuthContext';
import { ApiError } from '../api/apiError_';

const useUserAccountBalance = () => {
  const [accountBalance, setAccountBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState<ApiError | null>(null);
  const { logoutUser } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      const getUserBalance = async () => {
        const { data, error } = await getAccountBalance();
        if (data) {
          setAccountBalance(data.balance);
        } else if (error) {
          if (error.message === 'Invalid session.') {
            logoutUser();
          } else {
            setResponseError(error);
          }
        }
        setLoading(false);
      };

      getUserBalance();
      //return () => {};
    }, [logoutUser]),
  );

  return { accountBalance, loading, responseError };
};

export default useUserAccountBalance;
