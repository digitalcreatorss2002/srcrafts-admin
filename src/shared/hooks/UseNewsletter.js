import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewsletter,
  getNewsletters,
  getNewsletter,
  editNewsletter,
  deleteNewsletter,
  getAllNewsletters,
} from "../../store/actions/newsletter_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllNewsletters = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.newsletter);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteNewsletter(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getNewsletters({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleNewsletter = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.newsletter);
  useEffect(() => {
    dispatch(getNewsletter(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateNewsletter = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.newsletter);
  const addData = async (data) => {
    await dispatch(addNewsletter(data));
  };
  return [data, addData];
};
export const useUpdateNewsletter = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.newsletter);
  const updateData = async (id, data) => {
    await dispatch(editNewsletter(id, data));
  };
  return [updateData];
};

export const useSelectAllNewsletter = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.newsletter);
  useEffect(() => {
    dispatch(getAllNewsletters({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  //  const [client, setClientSearchField, setClientSearchValue] =
  // useSelectAllClient();

  const [dropdownOptions, setDropdownOptions] = useState({});
  // useEffect(() => {
  //   if (industry && industry.all_industrys) {
  //     const newData = industry.all_industrys.map((item) => {
  //       return { label: item.name, value: item.name };
  //     });
  //     setDropdownOptions({ ...dropdownOptions, industry: newData });
  //   }
  // }, [industry]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
