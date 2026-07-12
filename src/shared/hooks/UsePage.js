import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPage,
  getPages,
  getPage,
  editPage,
  deletePage,
  getAllPages,
} from "../../store/actions/page_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllPages = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.page);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deletePage(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getPages({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSinglePage = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(getPage(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreatePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.page);
  const addData = async (data) => {
    await dispatch(addPage(data));
  };
  return [data, addData];
};
export const useUpdatePage = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.page);
  const updateData = async (id, data) => {
    await dispatch(editPage(id, data));
  };
  return [updateData];
};

export const useSelectAllPage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.page);
  useEffect(() => {
    dispatch(getAllPages({ term, value }));
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
