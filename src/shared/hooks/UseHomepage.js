import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addHomepage,
  getHomepages,
  getHomepage,
  editHomepage,
  deleteHomepage,
  getAllHomepages,
} from "../../store/actions/homepage_action";
import _debounce from "lodash/debounce";
import { useSelectAllProductcategory } from "./UseProductcategory";
import { useSelectAllCollection } from "./UseCollection";
import { useSelectAllTemplate } from "./UseTemplate";

// Get All Data
export const useAllHomepages = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.homepage);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteHomepage(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getHomepages({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleHomepage = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getHomepage(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateHomepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.homepage);
  const addData = async (data) => {
    await dispatch(addHomepage(data));
  };
  return [data, addData];
};
export const useUpdateHomepage = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.homepage);
  const updateData = async (id, data) => {
    await dispatch(editHomepage(id, data));
  };
  return [updateData];
};

export const useSelectAllHomepage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getAllHomepages({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [collection, setCollectionSearchField, setCollectionSearchValue] =
    useSelectAllCollection();
  const [categorys] = useSelectAllProductcategory()
  console.log(categorys);

  const [template] = useSelectAllTemplate();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (collection && collection.all_collections) {
      const newData = collection.all_collections.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, collections: newData });
    }
  }, [collection]);
  useEffect(() => {
    if (categorys && categorys.all_productcategorys) {
      const newData = categorys.all_productcategorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, categorys: newData });
    }
  }, [categorys]);
  useEffect(() => {
    if (template && template.all_templates) {
      const newData = template.all_templates.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, template: newData });
    }
  }, [template]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
