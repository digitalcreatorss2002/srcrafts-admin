import {
  GET_MENUS_STATED,
  GET_MENUS,
  GET_MENUS_ENDED,
  ADD_MENU_STATED,
  ADD_MENU,
  ADD_MENU_ENDED,
  EDIT_MENU_STATED,
  EDIT_MENU,
  EDIT_MENU_ENDED,
  GET_MENU_STATED,
  GET_MENU,
  GET_MENU_ENDED,
  GET_ALL_MENUS_STATED,
  GET_ALL_MENUS,
  GET_ALL_MENUS_ENDED
} from "../types/menu_type";

const initialState = {
  menus_loading: true,
  menus: null,
  page: null,
  pages: null,
  total_menus: 0,

  menu: null,
  menu_loading: null,

  loading: true,

  menu_message: null,
  all_menus: null,
  all_menus_loading: null,
  add_menu_loading: true,
  edit_menu_loading: true
};

export const menu_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MENUS_STATED:
      return {
        ...state,
        menus: null,
        pages: null,
        page: null,
        total_menus: 0,
        menus_loading: true
      };
    case GET_MENUS:
      console.log(payload);
      return {
        ...state,
        menus: payload.menus,
        pages: payload.pages,
        page: payload.page,
        total_menus: payload.count
      };
    case GET_MENUS_ENDED:
      return {
        ...state,
        menus_loading: false
      };
    case GET_ALL_MENUS_STATED:
      return {
        ...state,
        all_menus_loading: true,
        all_menus: null
      };
    case GET_ALL_MENUS:
      return {
        ...state,
        all_menus: payload
      };
    case GET_ALL_MENUS_ENDED:
      return {
        ...state,
        all_menus_loading: false
      };

    case ADD_MENU_STATED:
      return {
        ...state,
        menu_message: null,
        add_menu_loading: true
      };
    case ADD_MENU:
      return {
        ...state,
        menu_message: payload
      };
    case ADD_MENU_ENDED:
      return {
        ...state,
        add_menu_loading: false
      };
    case GET_MENU_STATED:
      return {
        ...state,
        menu: null,
        menu_loading: true
      };
    case GET_MENU:
      return {
        ...state,
        menu: payload
      };
    case GET_MENU_ENDED:
      return {
        ...state,
        menu_loading: false
      };
    case EDIT_MENU_STATED:
      return {
        ...state,
        menu_message: null,
        edit_menu_loading: true
      };
    case EDIT_MENU:
      return {
        ...state,
        menu_message: payload
      };
    case EDIT_MENU_ENDED:
      return {
        ...state,
        edit_menu_loading: false
      };

    default:
      return state;
  }
};
