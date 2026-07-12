import api from "../../domain/api";
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
  GET_ALL_NEWSLETTERS_ENDED,
} from "../types/newsletter_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addNewsletter = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_NEWSLETTER_STATED,
    });
    const { data } = await api.post(`/newsletters`, formData);
    dispatch({
      type: ADD_NEWSLETTER,
      payload: data,
    });
    dispatch({
      type: ADD_NEWSLETTER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEWSLETTER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getNewsletters =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NEWSLETTERS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/newsletters?&${query}`);

      dispatch({
        type: GET_NEWSLETTERS,
        payload: data,
      });
      dispatch({
        type: GET_NEWSLETTERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_NEWSLETTERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getNewsletter = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NEWSLETTER_STATED,
    });
    const { data } = await api.get(`/newsletters/${id}`);

    dispatch({
      type: GET_NEWSLETTER,
      payload: data,
    });
    dispatch({
      type: GET_NEWSLETTER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_NEWSLETTER_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editNewsletter = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_NEWSLETTER_STATED,
    });
    const { data } = await api.put(`/newsletters/${id}`, formData);
    dispatch({
      type: EDIT_NEWSLETTER,
      payload: data,
    });
    dispatch({
      type: EDIT_NEWSLETTER_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_NEWSLETTER_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteNewsletter = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/newsletters/${id}`);
    dispatch(setAlert("Newsletter Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllNewsletters =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_NEWSLETTERS_STATED,
      });
      const { data } = await api.get(
        `/newsletters/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_NEWSLETTERS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_NEWSLETTERS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_NEWSLETTERS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
