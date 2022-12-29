import { MdFormatListNumberedRtl } from 'react-icons/md';

export const initialState = {
  error: false,
  load: false,
  errorMessage: '',
  companys: [],
  load: false,
  uniqueCompany: {},
  forms: [],
  formsLength: 0
};

const companysReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOADING':
      return {
        ...state,
        load: true
      };
    case 'GET_ALL_COMAPNYS':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        companys: payload.companys
      };
    case 'EDIT_COMPANY':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        uniqueCompany: payload.uniqueCompany
      };
    case 'ADD_NEW_COMPANY':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        companys: payload.companys
      };
    case 'GET_UNIQUE_COMPANY':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        uniqueCompany: payload.uniqueCompany
      };
    case 'GET_ALL_FORMS_IN_COMPANYS':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        forms: payload.forms
      };
    case 'GET_ALL_FORMS':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: '',
        formsLength: payload.formsLength
      };
    case 'DELETE_COMPANY':
      return {
        ...state,
        error: false,
        load: false,
        errorMessage: ''
      };
    case 'ERROR':
      return {
        ...state,
        error: payload.error,
        errorMessage: payload.errorMessage,
        load: false
      };
    default:
      throw new Error(`No case for type ${type} found in companysReducer.`);
  }
};

export default companysReducer;
