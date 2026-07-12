import api from "../../domain/api";
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
  GET_ALL_HOMEPAGES_ENDED,
} from "../types/homepage_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addHomepage = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_HOMEPAGE_STATED,
    });
    const { data } = await api.post(`/homepages`, formData);
    dispatch({
      type: ADD_HOMEPAGE,
      payload: data,
    });
    dispatch({
      type: ADD_HOMEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_HOMEPAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getHomepages =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_HOMEPAGES_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/homepages?&${query}`);

      dispatch({
        type: GET_HOMEPAGES,
        payload: data,
      });
      dispatch({
        type: GET_HOMEPAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_HOMEPAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getHomepage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_HOMEPAGE_STATED,
    });
    const { data } = await api.get(`/homepages/${id}`);

    dispatch({
      type: GET_HOMEPAGE,
      payload: data,
    });
    dispatch({
      type: GET_HOMEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_HOMEPAGE_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editHomepage = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_HOMEPAGE_STATED,
    });
    const { data } = await api.put(`/homepages/${id}`, formData);
    dispatch({
      type: EDIT_HOMEPAGE,
      payload: data,
    });
    dispatch({
      type: EDIT_HOMEPAGE_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_HOMEPAGE_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteHomepage = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/homepages/${id}`);
    dispatch(setAlert("Homepage Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllHomepages =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_HOMEPAGES_STATED,
      });
      const { data } = await api.get(
        `/homepages/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_HOMEPAGES,
        payload: data,
      });
      dispatch({
        type: GET_ALL_HOMEPAGES_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_HOMEPAGES_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
