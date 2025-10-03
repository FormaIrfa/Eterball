import { useEffect } from 'react';
import { login } from '../store/auth/authSlice';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(
        login({
          token: token,
          user: {
            id: user.id,
            name: user.username,
            avatar: '/assets/Coupe_Casquette.png',
            eter: user.eter ?? 0,
          },
        })
      );
    }
  }, []);
};

export default useAuth;
