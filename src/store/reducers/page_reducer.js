import {
  GET_PAGES_STATED,
  GET_PAGES,
  GET_PAGES_ENDED,
  ADD_PAGE_STATED,
  ADD_PAGE,
  ADD_PAGE_ENDED,
  EDIT_PAGE_STATED,
  EDIT_PAGE,
  EDIT_PAGE_ENDED,
  GET_PAGE_STATED,
  GET_PAGE,
  GET_PAGE_ENDED,
  GET_ALL_PAGES_STATED,
  GET_ALL_PAGES,
  GET_ALL_PAGES_ENDED,
} from "../types/page_type";

const initialState = {
  pages_loading: true,
  pages: null,
  page: null,
  pages_count: null,
  total_pages: 0,

  page: null,
  page_loading: null,

  loading: true,

  page_message: null,
  all_pages: null,
  all_pages_loading: null,
  add_page_loading: true,
  edit_page_loading: true,
};

export const page_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGES_STATED:
      return {
        ...state,
        pages: null,
        pages_count: null,
        page: null,
        total_pages: 0,
        pages_loading: true,
      };
    case GET_PAGES:
      return {
        ...state,
        pages: payload.pages,
        pages_count: payload.pages_count,
        page: payload.page,
        total_pages: payload.count,
      };
    case GET_PAGES_ENDED:
      return {
        ...state,
        pages_loading: false,
      };
    case GET_ALL_PAGES_STATED:
      return {
        ...state,
        all_pages_loading: true,
        all_pages: null,
      };
    case GET_ALL_PAGES:
      return {
        ...state,
        all_pages: payload,
      };
    case GET_ALL_PAGES_ENDED:
      return {
        ...state,
        all_pages_loading: false,
      };

    case ADD_PAGE_STATED:
      return {
        ...state,
        page_message: null,
        add_page_loading: true,
      };
    case ADD_PAGE:
      return {
        ...state,
        page_message: payload,
      };
    case ADD_PAGE_ENDED:
      return {
        ...state,
        add_page_loading: false,
      };
    case GET_PAGE_STATED:
      return {
        ...state,
        page: null,
        page_loading: true,
      };
    case GET_PAGE:
      return {
        ...state,
        page: payload,
      };
    case GET_PAGE_ENDED:
      return {
        ...state,
        page_loading: false,
      };
    case EDIT_PAGE_STATED:
      return {
        ...state,
        page_message: null,
        edit_page_loading: true,
      };
    case EDIT_PAGE:
      return {
        ...state,
        page_message: payload,
      };
    case EDIT_PAGE_ENDED:
      return {
        ...state,
        edit_page_loading: false,
      };

    default:
      return state;
  }
};
