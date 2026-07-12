import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addReturnrequest,
  getReturnrequests,
  getReturnrequest,
  editReturnrequest,
  deleteReturnrequest,
  getAllReturnrequests,
} from "../../store/actions/returnrequest_action";
import _debounce from "lodash/debounce";
import { useSelectAllOrder } from "./UseOrder";

// Get All Data
export const useAllReturnrequests = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.returnrequest);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteReturnrequest(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getReturnrequests({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleReturnrequest = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.returnrequest);
  useEffect(() => {
    dispatch(getReturnrequest(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateReturnrequest = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.returnrequest);
  const addData = async (data) => {
    await dispatch(addReturnrequest(data));
  };
  return [data, addData];
};
export const useUpdateReturnrequest = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.returnrequest);
  const updateData = async (id, data) => {
    await dispatch(editReturnrequest(id, data));
  };
  return [updateData];
};

export const useSelectAllReturnrequest = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.returnrequest);
  useEffect(() => {
    dispatch(getAllReturnrequests({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [order, setOrderSearchField, setOrderSearchValue] = useSelectAllOrder();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (order && order.all_orders) {
      const newData = order.all_orders.map((item) => {
        return { label: `#${item.order_id}`, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, order: newData });
    }
  }, [order]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
