import {
  GET_RETURNREQUESTS_STATED,
  GET_RETURNREQUESTS,
  GET_RETURNREQUESTS_ENDED,
  ADD_RETURNREQUEST_STATED,
  ADD_RETURNREQUEST,
  ADD_RETURNREQUEST_ENDED,
  EDIT_RETURNREQUEST_STATED,
  EDIT_RETURNREQUEST,
  EDIT_RETURNREQUEST_ENDED,
  GET_RETURNREQUEST_STATED,
  GET_RETURNREQUEST,
  GET_RETURNREQUEST_ENDED,
  GET_ALL_RETURNREQUESTS_STATED,
  GET_ALL_RETURNREQUESTS,
  GET_ALL_RETURNREQUESTS_ENDED
} from "../types/returnrequest_type";

const initialState = {
  returnrequests_loading: true,
  returnrequests: null,
  page: null,
  pages: null,
  total_returnrequests: 0,

  returnrequest: null,
  returnrequest_loading: null,

  loading: true,

  returnrequest_message: null,
  all_returnrequests: null,
  all_returnrequests_loading: null,
  add_returnrequest_loading: true,
  edit_returnrequest_loading: true
};

export const returnrequest_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RETURNREQUESTS_STATED:
      return {
        ...state,
        returnrequests: null,
        pages: null,
        page: null,
        total_returnrequests: 0,
        returnrequests_loading: true
      };
    case GET_RETURNREQUESTS:
      return {
        ...state,
        returnrequests: payload.returnrequests,
        pages: payload.pages,
        page: payload.page,
        total_returnrequests: payload.count
      };
    case GET_RETURNREQUESTS_ENDED:
      return {
        ...state,
        returnrequests_loading: false
      };
    case GET_ALL_RETURNREQUESTS_STATED:
      return {
        ...state,
        all_returnrequests_loading: true,
        all_returnrequests: null
      };
    case GET_ALL_RETURNREQUESTS:
      return {
        ...state,
        all_returnrequests: payload
      };
    case GET_ALL_RETURNREQUESTS_ENDED:
      return {
        ...state,
        all_returnrequests_loading: false
      };

    case ADD_RETURNREQUEST_STATED:
      return {
        ...state,
        returnrequest_message: null,
        add_returnrequest_loading: true
      };
    case ADD_RETURNREQUEST:
      return {
        ...state,
        returnrequest_message: payload
      };
    case ADD_RETURNREQUEST_ENDED:
      return {
        ...state,
        add_returnrequest_loading: false
      };
    case GET_RETURNREQUEST_STATED:
      return {
        ...state,
        returnrequest: null,
        returnrequest_loading: true
      };
    case GET_RETURNREQUEST:
      return {
        ...state,
        returnrequest: payload
      };
    case GET_RETURNREQUEST_ENDED:
      return {
        ...state,
        returnrequest_loading: false
      };
    case EDIT_RETURNREQUEST_STATED:
      return {
        ...state,
        returnrequest_message: null,
        edit_returnrequest_loading: true
      };
    case EDIT_RETURNREQUEST:
      return {
        ...state,
        returnrequest_message: payload
      };
    case EDIT_RETURNREQUEST_ENDED:
      return {
        ...state,
        edit_returnrequest_loading: false
      };

    default:
      return state;
  }
};
