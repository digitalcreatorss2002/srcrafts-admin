import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCollection,
  getCollections,
  getCollection,
  editCollection,
  deleteCollection,
  getAllCollections,
} from "../../store/actions/collection_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllCollections = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.collection);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteCollection(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getCollections({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleCollection = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.collection);
  useEffect(() => {
    dispatch(getCollection(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateCollection = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.collection);
  const addData = async (data) => {
    await dispatch(addCollection(data));
  };
  return [data, addData];
};
export const useUpdateCollection = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.collection);
  const updateData = async (id, data) => {
    await dispatch(editCollection(id, data));
  };
  return [updateData];
};

export const useSelectAllCollection = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.collection);
  useEffect(() => {
    dispatch(getAllCollections({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [collection, setCollectionSearchField, setCollectionSearchValue] =
    useSelectAllCollection();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (collection && collection.all_collections) {
      const newData = collection.all_collections.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, parent_collection: newData });
    }
  }, [collection]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
