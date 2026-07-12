import {
  GET_NEWSLETTERS_STATED,
  GET_NEWSLETTERS,
  GET_NEWSLETTERS_ENDED,
  ADD_NEWSLETTER_STATED,
  ADD_NEWSLETTER,
  ADD_NEWSLETTER_ENDED,
  EDIT_NEWSLETTER_STATED,
  EDIT_NEWSLETTER,
  EDIT_NEWSLETTER_ENDED,
  GET_NEWSLETTER_STATED,
  GET_NEWSLETTER,
  GET_NEWSLETTER_ENDED,
  GET_ALL_NEWSLETTERS_STATED,
  GET_ALL_NEWSLETTERS,
  GET_ALL_NEWSLETTERS_ENDED
} from "../types/newsletter_type";

const initialState = {
  newsletters_loading: true,
  newsletters: null,
  page: null,
  pages: null,
  total_newsletters: 0,

  newsletter: null,
  newsletter_loading: null,

  loading: true,

  newsletter_message: null,
  all_newsletters: null,
  all_newsletters_loading: null,
  add_newsletter_loading: true,
  edit_newsletter_loading: true
};

export const newsletter_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWSLETTERS_STATED:
      return {
        ...state,
        newsletters: null,
        pages: null,
        page: null,
        total_newsletters: 0,
        newsletters_loading: true
      };
    case GET_NEWSLETTERS:
      return {
        ...state,
        newsletters: payload.newsletters,
        pages: payload.pages,
        page: payload.page,
        total_newsletters: payload.count
      };
    case GET_NEWSLETTERS_ENDED:
      return {
        ...state,
        newsletters_loading: false
      };
    case GET_ALL_NEWSLETTERS_STATED:
      return {
        ...state,
        all_newsletters_loading: true,
        all_newsletters: null
      };
    case GET_ALL_NEWSLETTERS:
      return {
        ...state,
        all_newsletters: payload
      };
    case GET_ALL_NEWSLETTERS_ENDED:
      return {
        ...state,
        all_newsletters_loading: false
      };

    case ADD_NEWSLETTER_STATED:
      return {
        ...state,
        newsletter_message: null,
        add_newsletter_loading: true
      };
    case ADD_NEWSLETTER:
      return {
        ...state,
        newsletter_message: payload
      };
    case ADD_NEWSLETTER_ENDED:
      return {
        ...state,
        add_newsletter_loading: false
      };
    case GET_NEWSLETTER_STATED:
      return {
        ...state,
        newsletter: null,
        newsletter_loading: true
      };
    case GET_NEWSLETTER:
      return {
        ...state,
        newsletter: payload
      };
    case GET_NEWSLETTER_ENDED:
      return {
        ...state,
        newsletter_loading: false
      };
    case EDIT_NEWSLETTER_STATED:
      return {
        ...state,
        newsletter_message: null,
        edit_newsletter_loading: true
      };
    case EDIT_NEWSLETTER:
      return {
        ...state,
        newsletter_message: payload
      };
    case EDIT_NEWSLETTER_ENDED:
      return {
        ...state,
        edit_newsletter_loading: false
      };

    default:
      return state;
  }
};
