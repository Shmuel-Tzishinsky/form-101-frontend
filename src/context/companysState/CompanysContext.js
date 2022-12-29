import { createContext, useContext, useEffect, useReducer } from 'react';
import { axiosInstance } from '../../components/config';
import companysReducer, { initialState } from './compantyReducer';

export const CpompanysContext = createContext(initialState);

export const CompanysProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companysReducer, initialState);

  const getAllCompanys = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const value = await axiosInstance.post('api/companys/get-company');

      dispatch({
        type: 'GET_ALL_COMAPNYS',
        payload: {
          companys: value?.data.data || []
        }
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const editCompany = async (company, nav) => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.patch('api/companys/edit-company', {
        ...company
      });

      dispatch({
        type: 'EDIT_COMPANY',
        payload: {
          uniqueCompany: value?.data.data || {}
        }
      });

      getAllCompanys();
      nav();
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const addNewCompany = async (company, nav) => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.post('api/companys/add-new-company', {
        company
      });

      dispatch({
        type: 'ADD_NEW_COMPANY',
        payload: {
          uniqueCompany: value?.data.data || []
        }
      });

      getAllCompanys();
      nav();
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const getUniqueCompany = async (id) => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.post('api/companys/get-edit-company', {
        data: id
      });

      dispatch({
        type: 'GET_UNIQUE_COMPANY',
        payload: {
          uniqueCompany: value?.data.data || []
        }
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const getAllFormsInCompanys = async (id) => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.post(
        'api/forms/get-all-forms-in-company',
        {
          data: id
        }
      );

      dispatch({
        type: 'GET_ALL_FORMS_IN_COMPANYS',
        payload: {
          forms: value?.data.data || []
        }
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const getAllForms = async () => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.post('api/forms/get-all-forms');

      dispatch({
        type: 'GET_ALL_FORMS',
        payload: {
          formsLength: value?.data?.data || []
        }
      });
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  const deleteCompany = async (id, nav) => {
    try {
      dispatch({ type: 'LOADING' });

      const value = await axiosInstance.delete(
        `api/companys/delete-company/${id}`
      );

      dispatch({ type: 'DELETE_COMPANY' });
      getAllCompanys();
      nav();
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: {
          error: true,
          errorMessage:
            error.response.data.error_msg || error.message || 'התרחשה שגיאה'
        }
      });
    }
  };

  useEffect(() => {
    getAllCompanys();
    getAllForms();
  }, []);

  const valueContext = {
    load: state.load,
    error: state.error && state.errorMessage,
    companys: state?.companys || [],
    uniqueCompany: state.uniqueCompany || {},
    forms: state.forms || [],
    formsLength: state.formsLength,
    getAllCompanys,
    getAllForms,
    editCompany,
    addNewCompany,
    getUniqueCompany,
    getAllFormsInCompanys,
    deleteCompany
  };

  return (
    <CpompanysContext.Provider value={valueContext}>
      {children}
    </CpompanysContext.Provider>
  );
};

const useCopmanys = () => {
  const context = useContext(CpompanysContext);

  if (context === undefined) {
    throw new Error('useCopmanys must be used within CpompanysContext');
  }

  return context;
};

export default useCopmanys;
