import React, { createContext, useReducer, useCallback } from 'react';
import userReducer from './AuthReducer';
import { axiosInstance } from '../../components/config';
import * as types from './authActionTypes';
import checkAdminAuth from '../../components/AdminAuth';

const initialAuthState = {
  loading: false,
  error: false,
  token: null,
  errResponse: null,
  userName: '',
  id: ''
};

export const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthState);

  const AuthReset = () => {
    dispatch({
      type: types.AUTH_RESET
    });
  };

  const LoginAction = useCallback(async (data, nav) => {
    AuthReset();
    dispatch({
      type: types.AUTH_START
    });

    try {
      const res = await axiosInstance.post('/api/auth/login', data);

      localStorage.setItem('mern_admin_dashboard', res.data.access_token);
      localStorage.setItem('mern_admin_name', res.data.name);

      dispatch({
        type: types.AUTH_SUCCESS,
        payload: res.data
      });

      if (checkAdminAuth(initialAuthState.token)) nav();
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload:
          error.response?.data?.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        AuthReset,
        LoginAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
