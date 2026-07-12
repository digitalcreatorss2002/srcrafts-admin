import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductcategory,
  getProductcategorys,
  getProductcategory,
  editProductcategory,
  deleteProductcategory,
  getAllProductcategorys,
  getProductcategoryTree,
} from "../../store/actions/productcategory_action";
import _debounce from "lodash/debounce";
import { useSelectAllCollection } from "./UseCollection";
import { getSubCategory, getSubCategorys } from "../../store/actions/subcategory_action";

// Get All Data
export const useAllProductcategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteProductcategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getProductcategorys({
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

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleProductcategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  useEffect(() => {
    dispatch(getProductcategory(id));
  }, [id]);
  return [data];
};

// Add Data
export const useCreateProductcategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  const addData = async (data) => {
    await dispatch(addProductcategory(data));
  };
  return [data, addData];
};
export const useUpdateProductcategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.productcategory);
  const updateData = async (id, data) => {
    await dispatch(editProductcategory(id, data));
  };
  return [updateData];
};

export const useSelectAllProductcategory = () => {
  console.log("ewd");
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.productcategory);
  useEffect(() => {
    dispatch(getAllProductcategorys({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [collection] = useSelectAllCollection();
  const [categorys] = useSelectAllProductcategory();


  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (collection && collection.all_collections) {
      const newData = collection.all_collections.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, product_collection: newData });
    }
  }, [collection]);

  useEffect(() => {
    if (categorys && categorys.all_productcategorys) {
      const newData = categorys.all_productcategorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, parentId: newData });
    }
  }, [categorys]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};

export const useGetCategoryTree = ()=>{
  const dispatch = useDispatch();
  const [term, setTerm] = useState("")
  const [value, setValue] = useState("");
  const data = useSelector((state)=>state.productcategory)
  useEffect(()=>{
    dispatch(getProductcategoryTree({term,value}))
  },[term,value])
  return [data, setTerm, setValue];
}

// GetSubCategories
export const useAllSubCategorys = (parentId) => {
  const dispatch = useDispatch();
  const data = useSelector((state)=> state.subcategory);
  useEffect(()=>{
    dispatch(getSubCategorys({parentId}));
  }, [parentId]);
  return [data];
}
