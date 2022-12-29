import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';

import userReducer from './userReducer';
import * as types from './userActionTypes';
import { axiosInstance } from '../../components/config';

const initialUserState = {
  loading: false,
  error: false,
  users: null,
  user: null,
  me: null,
  usersByMonth: null,
  errResponse: '',
  message: null
};

export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  //   const BASE_AUTH_URL = process.env.API_BASE_URL + "api/"
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const UserReset = () => {
    dispatch({
      type: types.USER_RESET
    });
  };

  const fetchUsers = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axiosInstance.get('/api/user/');
      dispatch({
        type: types.USER_SUCCESS,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const fetchLoggedInUser = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axiosInstance.get('/api/user/me');
      dispatch({
        type: types.GET_LOGGED_IN_USER,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const addUser = useCallback(async (data, nav) => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axiosInstance.post('/api/auth/register', data);
      dispatch({
        type: types.USER_ADD,
        payload: res.data.data
      });

      nav();
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const fetchUsersByMonth = useCallback(async () => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axiosInstance.get('/api/user/group/group-by-month');
      dispatch({
        type: types.GET_USERS_BY_MONTH,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const fetchSingleUser = useCallback(async (id) => {
    dispatch({
      type: types.USER_START
    });

    try {
      const res = await axiosInstance.get(`/api/user/single/${id}`);
      dispatch({
        type: types.GET_USER,
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const editUser = useCallback(async (data, nav) => {
    dispatch({
      type: types.USER_START
    });
    try {
      const res = await axiosInstance.patch('/api/user/edit-user', data);
      dispatch({
        type: types.USER_EDIT,
        payload: res.data.data
      });

      nav();
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const deleteUserAction = useCallback(async (id, nav) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await axiosInstance.post(`/api/user/delete/${id}`);
      dispatch({
        type: types.USER_DELETE,
        payload: id
      });

      nav();
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
  }, []);

  const changeUserPasswordAction = useCallback(async (data) => {
    dispatch({
      type: types.USER_START
    });
    try {
      await axiosInstance.post('/api/auth/change-password', data);
      dispatch({
        type: types.USER_PASSWORD_CHANGE
      });
    } catch (error) {
      dispatch({
        type: types.USER_FAILURE,
        payload:
          error.response.data.error_msg || error.message || 'התרחשה שגיאה'
      });
    }
    fetchSingleUser(data._id);
  }, []);

  useEffect(() => {
    //   fetchLoggedInUser();
    fetchUsers();
    fetchUsersByMonth();
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        fetchUsers,
        fetchSingleUser,
        fetchUsersByMonth,
        editUser,
        changeUserPasswordAction,
        addUser,
        deleteUserAction,
        UserReset
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
