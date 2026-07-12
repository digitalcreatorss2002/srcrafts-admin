import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenu,
  getMenus,
  getMenu,
  editMenu,
  deleteMenu,
  getAllMenus,
} from "../../store/actions/menu_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllMenus = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.menu);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteMenu(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getMenus({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleMenu = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.menu);
  useEffect(() => {
    dispatch(getMenu(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateMenu = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.menu);
  const addData = async (data) => {
    await dispatch(addMenu(data));
  };
  return [data, addData];
};
export const useUpdateMenu = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.menu);
  const updateData = async (id, data) => {
    await dispatch(editMenu(id, data));
  };
  return [updateData];
};

export const useSelectAllMenu = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.menu);
  useEffect(() => {
    dispatch(getAllMenus({ term, value }));
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
