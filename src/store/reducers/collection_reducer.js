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
  GET_ALL_COLLECTIONS_ENDED
} from "../types/collection_type";

const initialState = {
  collections_loading: true,
  collections: null,
  page: null,
  pages: null,
  total_collections: 0,

  collection: null,
  collection_loading: null,

  loading: true,

  collection_message: null,
  all_collections: null,
  all_collections_loading: null,
  add_collection_loading: true,
  edit_collection_loading: true
};

export const collection_reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COLLECTIONS_STATED:
      return {
        ...state,
        collections: null,
        pages: null,
        page: null,
        total_collections: 0,
        collections_loading: true
      };
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: payload.collections,
        pages: payload.pages,
        page: payload.page,
        total_collections: payload.count
      };
    case GET_COLLECTIONS_ENDED:
      return {
        ...state,
        collections_loading: false
      };
    case GET_ALL_COLLECTIONS_STATED:
      return {
        ...state,
        all_collections_loading: true,
        all_collections: null
      };
    case GET_ALL_COLLECTIONS:
      return {
        ...state,
        all_collections: payload
      };
    case GET_ALL_COLLECTIONS_ENDED:
      return {
        ...state,
        all_collections_loading: false
      };

    case ADD_COLLECTION_STATED:
      return {
        ...state,
        collection_message: null,
        add_collection_loading: true
      };
    case ADD_COLLECTION:
      return {
        ...state,
        collection_message: payload
      };
    case ADD_COLLECTION_ENDED:
      return {
        ...state,
        add_collection_loading: false
      };
    case GET_COLLECTION_STATED:
      return {
        ...state,
        collection: null,
        collection_loading: true
      };
    case GET_COLLECTION:
      return {
        ...state,
        collection: payload
      };
    case GET_COLLECTION_ENDED:
      return {
        ...state,
        collection_loading: false
      };
    case EDIT_COLLECTION_STATED:
      return {
        ...state,
        collection_message: null,
        edit_collection_loading: true
      };
    case EDIT_COLLECTION:
      return {
        ...state,
        collection_message: payload
      };
    case EDIT_COLLECTION_ENDED:
      return {
        ...state,
        edit_collection_loading: false
      };

    default:
      return state;
  }
};
