import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReview,
  getReviews,
  getReview,
  editReview,
  deleteReview,
  getAllReviews,
} from "../../store/actions/review_action";
import _debounce from "lodash/debounce";
import { useSelectAllProduct } from "./UseProduct";

// Get All Data
export const useAllReviews = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteReview(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getReviews({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleReview = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getReview(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateReview = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  const addData = async (data) => {
    await dispatch(addReview(data));
  };
  return [data, addData];
};
export const useUpdateReview = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.review);
  const updateData = async (id, data) => {
    await dispatch(editReview(id, data));
  };
  return [updateData];
};

export const useSelectAllReview = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getAllReviews({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [product, setProductSearchField, setProductSearchValue] =
    useSelectAllProduct();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (product && product.all_products) {
      const newData = product.all_products.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, product: newData });
    }
  }, [product]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
