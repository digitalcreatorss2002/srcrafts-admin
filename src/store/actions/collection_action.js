import api from "../../domain/api";
import {
  GET_COLLECTIONS_STATED,
  GET_COLLECTIONS,
  GET_COLLECTIONS_ENDED,
  ADD_COLLECTION_STATED,
  ADD_COLLECTION,
  ADD_COLLECTION_ENDED,
  EDIT_COLLECTION_STATED,
  EDIT_COLLECTION,
  EDIT_COLLECTION_ENDED,
  GET_COLLECTION_STATED,
  GET_COLLECTION,
  GET_COLLECTION_ENDED,
  GET_ALL_COLLECTIONS_STATED,
  GET_ALL_COLLECTIONS,
  GET_ALL_COLLECTIONS_ENDED,
} from "../types/collection_type";
import * as qs from "qs";
import { handleError } from "../../shared/handleError";
import { setAlert } from "./alert";

export const addCollection = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COLLECTION_STATED,
    });
    const { data } = await api.post(`/collections`, formData);
    dispatch({
      type: ADD_COLLECTION,
      payload: data,
    });
    dispatch({
      type: ADD_COLLECTION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_COLLECTION_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getCollections =
  ({ pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_COLLECTIONS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace("?", ""));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/collections?&${query}`);

      dispatch({
        type: GET_COLLECTIONS,
        payload: data,
      });
      dispatch({
        type: GET_COLLECTIONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_COLLECTIONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getCollection = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COLLECTION_STATED,
    });
    const { data } = await api.get(`/collections/${id}`);

    dispatch({
      type: GET_COLLECTION,
      payload: data,
    });
    dispatch({
      type: GET_COLLECTION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_COLLECTION_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editCollection = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_COLLECTION_STATED,
    });
    const { data } = await api.put(`/collections/${id}`, formData);
    dispatch({
      type: EDIT_COLLECTION,
      payload: data,
    });
    dispatch({
      type: EDIT_COLLECTION_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COLLECTION_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteCollection = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/collections/${id}`);
    dispatch(setAlert("Collection Deleted Successfully", "success"));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllCollections =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_COLLECTIONS_STATED,
      });
      const { data } = await api.get(
        `/collections/all?term=${term}&value=${value}`
      );

      dispatch({
        type: GET_ALL_COLLECTIONS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_COLLECTIONS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_COLLECTIONS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
