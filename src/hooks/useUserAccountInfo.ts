import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getAccountInfo } from '../api/user/User';
import { Account } from '../api/user/UserData';

const useUserAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const getUserAccountInfo = async () => {
        const { data, error } = await getAccountInfo();
        if (data) {
          setAccountInfo(data.account);
        } else if (error) {
          setResponseError(error);
        }
        setLoading(false);
      };

      getUserAccountInfo();
      //return () => {};
    }, []),
  );

  return { accountInfo, loading, responseError };
};

export default useUserAccountInfo;
