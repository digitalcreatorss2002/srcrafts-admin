import api from "../../domain/api";
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
  GET_ALL_RETURNREQUESTS_ENDED,
} from "../types/returnrequest_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addReturnrequest = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_RETURNREQUEST_STATED,
    });
    const { data } = await api.post(`/returnrequests`, formData);
    dispatch({
      type: ADD_RETURNREQUEST,
      payload: data,
    });
    dispatch({
      type: ADD_RETURNREQUEST_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_RETURNREQUEST_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getReturnrequests =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_RETURNREQUESTS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/returnrequests?&${query}`);

      dispatch({
        type: GET_RETURNREQUESTS,
        payload: data,
      });
      dispatch({
        type: GET_RETURNREQUESTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_RETURNREQUESTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getReturnrequest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RETURNREQUEST_STATED,
    });
    const { data } = await api.get(`/returnrequests/${id}`);

    dispatch({
      type: GET_RETURNREQUEST,
      payload: data,
    });
    dispatch({
      type: GET_RETURNREQUEST_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_RETURNREQUEST_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editReturnrequest = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_RETURNREQUEST_STATED,
    });
    const { data } = await api.put(`/returnrequests/${id}`, formData);
    dispatch({
      type: EDIT_RETURNREQUEST,
      payload: data,
    });
    dispatch({
      type: EDIT_RETURNREQUEST_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_RETURNREQUEST_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteReturnrequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/returnrequests/${id}`);
    dispatch(setAlert("Returnrequest Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllReturnrequests =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_RETURNREQUESTS_STATED,
      });
      const { data } = await api.get(
        `/returnrequests/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_RETURNREQUESTS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_RETURNREQUESTS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_RETURNREQUESTS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
