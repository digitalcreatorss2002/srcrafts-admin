import api from "../../domain/api";
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
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addPage = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_PAGE_STATED,
    });
    const { data } = await api.post(`/pages`, formData);
    dispatch({
      type: ADD_PAGE,
      payload: data,
    });
    dispatch({
      type: ADD_PAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_PAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getPages =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PAGES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/pages?&${query}`);

      dispatch({
        type: GET_PAGES,
        payload: data,
      });
      dispatch({
        type: GET_PAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_PAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getPage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PAGE_STATED,
    });
    const { data } = await api.get(`/pages/${id}`);

    dispatch({
      type: GET_PAGE,
      payload: data,
    });
    dispatch({
      type: GET_PAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_PAGE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editPage = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PAGE_STATED,
    });
    const { data } = await api.put(`/pages/${id}`, formData);
    dispatch({
      type: EDIT_PAGE,
      payload: data,
    });
    dispatch({
      type: EDIT_PAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deletePage = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/pages/${id}`);
    dispatch(setAlert("Page Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllPages =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PAGES_STATED,
      });
      const { data } = await api.get(`/pages/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_PAGES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_PAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
