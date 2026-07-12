import api from '../../domain/api';
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
import * as qs from 'qs';
import { handleError } from '../../shared/handleError';
import { setAlert } from './alert';

export const addColor = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_COLOR_STATED,
    });
    const { data } = await api.post(`/colors`, formData);
    dispatch({
      type: ADD_COLOR,
      payload: data,
    });
    dispatch({
      type: ADD_COLOR_ENDED,
    });
  } catch (error) {
    dispatch({
      type: ADD_COLOR_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getColors =
  ({ pageNumber = '' }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_COLORS_STATED,
      });
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true, // prettify url
      });

      const { data } = await api.get(`/colors?${query}`);

      dispatch({
        type: GET_COLORS,
        payload: data,
      });
      dispatch({
        type: GET_COLORS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_COLORS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };
export const getColor = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_COLOR_STATED,
    });
    const { data } = await api.get(`/colors/${id}`);

    dispatch({
      type: GET_COLOR,
      payload: data,
    });
    dispatch({
      type: GET_COLOR_ENDED,
    });
  } catch (error) {
    dispatch({
      type: GET_COLOR_STATED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const editColor = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_COLOR_STATED,
    });
    const { data } = await api.put(`/colors/${id}`, formData);
    dispatch({
      type: EDIT_COLOR,
      payload: data,
    });
    dispatch({
      type: EDIT_COLOR_ENDED,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COLOR_ENDED,
    });
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const deleteColor = (id) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/colors/${id}`);
    dispatch(setAlert('Color Deleted Successfully', 'success'));
  } catch (error) {
    dispatch(handleErrorLocal(error));
    dispatch(handleError(error));
  }
};
export const getAllColors =
  ({ term, value }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_COLORS_STATED,
      });
      const { data } = await api.get(`/colors/all?term=${term}&value=${value}`);

      dispatch({
        type: GET_ALL_COLORS,
        payload: data,
      });
      dispatch({
        type: GET_ALL_COLORS_ENDED,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_COLORS_ENDED,
      });
      dispatch(handleErrorLocal(error));
      dispatch(handleError(error));
    }
  };

export const handleErrorLocal = () => async (dispatch) => {};
