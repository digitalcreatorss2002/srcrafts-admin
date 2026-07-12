import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addColor,
  getColors,
  getColor,
  editColor,
  deleteColor,
  getAllColors,
} from "../../store/actions/color_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllColors = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.color);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteColor(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getColors({
          pageNumber,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    setPageNumber(1);
  }, [window.location.search]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [
    data, setPageNumber, deleteBtnClicked
  ];
};

// Get Single Data
export const useSingleColor = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.color);
  useEffect(() => {
    dispatch(getColor(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateColor = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.color);
  const addData = async (data) => {
    await dispatch(addColor(data));
  };
  return [data, addData];
};
export const useUpdateColor = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.color);
  const updateData = async (id, data) => {
    await dispatch(editColor(id, data));
  };
  return [updateData];
};

export const useSelectAllColor = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.color);
  useEffect(() => {
    dispatch(getAllColors({ term, value }));
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

 
  return [dropdownOptions,loadOptions  ];
};