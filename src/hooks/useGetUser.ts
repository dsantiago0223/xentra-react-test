import { useState, useEffect } from 'react';
import { getUser } from '../api/user/User';

interface UserState {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  access_token: string;
}

const useGetUser = () => {
  const [user, setUser] = useState<UserState>(
    { id: '', 
      first_name: '', 
      last_name: '', 
      phone_number: '', 
      access_token: '' 
    }
  );
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
          const { data, error } = await getUser();
            if (data) {
              setUser(data.user)
            } else if (error) {
                setResponseError(error);
            }
            setLoading(false);
        };
    
        getUserData();
      }, []);

      return { user, loading, responseError };
};

export default useGetUser;
