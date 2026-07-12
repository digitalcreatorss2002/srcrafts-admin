import {
  GET_HOMEPAGES_STATED,
  GET_HOMEPAGES,
  GET_HOMEPAGES_ENDED,
  ADD_HOMEPAGE_STATED,
  ADD_HOMEPAGE,
  ADD_HOMEPAGE_ENDED,
  EDIT_HOMEPAGE_STATED,
  EDIT_HOMEPAGE,
  EDIT_HOMEPAGE_ENDED,
  GET_HOMEPAGE_STATED,
  GET_HOMEPAGE,
  GET_HOMEPAGE_ENDED,
  GET_ALL_HOMEPAGES_STATED,
  GET_ALL_HOMEPAGES,
  GET_ALL_HOMEPAGES_ENDED
} from "../types/homepage_type";

const initialState = {
  homepages_loading: true,
  homepages: null,
  page: null,
  pages: null,
  total_homepages: 0,

  homepage: null,
  homepage_loading: null,

  loading: true,

  homepage_message: null,
  all_homepages: null,
  all_homepages_loading: null,
  add_homepage_loading: true,
  edit_homepage_loading: true
};

export const homepage_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_HOMEPAGES_STATED:
      return {
        ...state,
        homepages: null,
        pages: null,
        page: null,
        total_homepages: 0,
        homepages_loading: true
      };
    case GET_HOMEPAGES:
      return {
        ...state,
        homepages: payload.homepages,
        pages: payload.pages,
        page: payload.page,
        total_homepages: payload.count
      };
    case GET_HOMEPAGES_ENDED:
      return {
        ...state,
        homepages_loading: false
      };
    case GET_ALL_HOMEPAGES_STATED:
      return {
        ...state,
        all_homepages_loading: true,
        all_homepages: null
      };
    case GET_ALL_HOMEPAGES:
      return {
        ...state,
        all_homepages: payload
      };
    case GET_ALL_HOMEPAGES_ENDED:
      return {
        ...state,
        all_homepages_loading: false
      };

    case ADD_HOMEPAGE_STATED:
      return {
        ...state,
        homepage_message: null,
        add_homepage_loading: true
      };
    case ADD_HOMEPAGE:
      return {
        ...state,
        homepage_message: payload
      };
    case ADD_HOMEPAGE_ENDED:
      return {
        ...state,
        add_homepage_loading: false
      };
    case GET_HOMEPAGE_STATED:
      return {
        ...state,
        homepage: null,
        homepage_loading: true
      };
    case GET_HOMEPAGE:
      return {
        ...state,
        homepage: payload
      };
    case GET_HOMEPAGE_ENDED:
      return {
        ...state,
        homepage_loading: false
      };
    case EDIT_HOMEPAGE_STATED:
      return {
        ...state,
        homepage_message: null,
        edit_homepage_loading: true
      };
    case EDIT_HOMEPAGE:
      return {
        ...state,
        homepage_message: payload
      };
    case EDIT_HOMEPAGE_ENDED:
      return {
        ...state,
        edit_homepage_loading: false
      };

    default:
      return state;
  }
};
