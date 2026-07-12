import api from "../../domain/api";
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
  GET_ALL_MENUS_ENDED,
} from "../types/menu_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addMenu = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_MENU_STATED,
    });
    const { data } = await api.post(`/menus`, formData);
    dispatch({
      type: ADD_MENU,
      payload: data,
    });
    dispatch({
      type: ADD_MENU_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_MENU_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getMenus =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_MENUS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/menus?&${query}`);
      console.log(data);
      dispatch({
        type: GET_MENUS,
        payload: data,
      });
      dispatch({
        type: GET_MENUS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_MENUS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getMenu = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MENU_STATED,
    });
    const { data } = await api.get(`/menus/${id}`);

    dispatch({
      type: GET_MENU,
      payload: data,
    });
    dispatch({
      type: GET_MENU_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_MENU_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editMenu = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_MENU_STATED,
    });
    const { data } = await api.put(`/menus/${id}`, formData);
    dispatch({
      type: EDIT_MENU,
      payload: data,
    });
    dispatch({
      type: EDIT_MENU_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_MENU_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteMenu = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/menus/${id}`);
    dispatch(setAlert("Menu Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllMenus =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_MENUS_STATED,
      });
      const { data } = await api.get(`/menus/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_MENUS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_MENUS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_MENUS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
