import {
  GET_COLORS_STATED,
  GET_COLORS,
  GET_COLORS_ENDED,
  ADD_COLOR_STATED,
  ADD_COLOR,
  ADD_COLOR_ENDED,
  EDIT_COLOR_STATED,
  EDIT_COLOR,
  EDIT_COLOR_ENDED,
  GET_COLOR_STATED,
  GET_COLOR,
  GET_COLOR_ENDED,
  GET_ALL_COLORS_STATED,
  GET_ALL_COLORS,
  GET_ALL_COLORS_ENDED,
} from '../types/color_type';

const initialState = {
  colors_loading: true,
  colors: null,
  page: null,
  pages: null,
  total_colors: 0,

  color: null,
  color_loading: null,

  loading: true,

  color_message: null,
  all_colors: null,
  all_colors_loading: null,
  add_color_loading: true,
  edit_color_loading: true,
};

export const color_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COLORS_STATED:
      return {
        ...state,
        colors: null,
        pages: null,
        page: null,
        total_colors: 0,
        colors_loading: true,
      };
    case GET_COLORS:
      return {
        ...state,
        colors: payload.colors,
        pages: payload.pages,
        page: payload.page,
        total_colors: payload.count,
      };
    case GET_COLORS_ENDED:
      return {
        ...state,
        colors_loading: false,
      };
    case GET_ALL_COLORS_STATED:
      return {
        ...state,
        all_colors_loading: true,
        all_colors: null,
      };
    case GET_ALL_COLORS:
      return {
        ...state,
        all_colors: payload,
      };
    case GET_ALL_COLORS_ENDED:
      return {
        ...state,
        all_colors_loading: false,
      };

    case ADD_COLOR_STATED:
      return {
        ...state,
        color_message: null,
        add_color_loading: true,
      };
    case ADD_COLOR:
      return {
        ...state,
        color_message: payload,
      };
    case ADD_COLOR_ENDED:
      return {
        ...state,
        add_color_loading: false,
      };
    case GET_COLOR_STATED:
      return {
        ...state,
        color: null,
        color_loading: true,
      };
    case GET_COLOR:
      return {
        ...state,
        color: payload,
      };
    case GET_COLOR_ENDED:
      return {
        ...state,
        color_loading: false,
      };
    case EDIT_COLOR_STATED:
      return {
        ...state,
        color_message: null,
        edit_color_loading: true,
      };
    case EDIT_COLOR:
      return {
        ...state,
        color_message: payload,
      };
    case EDIT_COLOR_ENDED:
      return {
        ...state,
        edit_color_loading: false,
      };

    default:
      return state;
  }
};
