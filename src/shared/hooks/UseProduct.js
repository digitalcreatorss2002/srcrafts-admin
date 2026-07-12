import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
  deleteBulkProduct,
} from '../../store/actions/product_action';
import _debounce from 'lodash/debounce';
import { useSelectAllCollection } from './UseCollection';

import { useGetCategoryTree, useSelectAllProductcategory } from './UseProductcategory';
import { useSelectAllVendor } from './UseVendor';
import * as XLSX from 'xlsx';

export const UseExcelExport = () => {
  const exportXLSXData = (data, sheet_name, export_name) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, sheet_name);
    XLSX.writeFile(wb, `${export_name}.xlsx`);
  };
  return [exportXLSXData];
};

// Get All Data
export const useAllProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteProduct(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getProducts({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);
  return [data];
};
// Get Single Data
export const useBulkDeleteProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const handleDeleteBulkProducts = (products) => {
    dispatch(deleteBulkProduct(products));
  };
  return [handleDeleteBulkProducts];
};
// Add Data
export const useCreateProduct = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  const addData = async (data) => {
    await dispatch(addProduct(data));
  };
  return [data, addData];
};
export const useUpdateProduct = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.product);
  const updateData = async (id, data) => {
    await dispatch(editProduct(id, data));
  };
  return [updateData];
};

export const useSelectAllProduct = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

const normalizeCategoryTree = (nodes = []) => {
  return nodes.map((node) => ({
    label: node.name,
    value: node._id,
    product_category: node,
    commission: node.commission,
    children: normalizeCategoryTree(node.children || []),
  }));
};

export const useGetDropdownOptions = () => {
  const [collection, setCollectionSearchField, setCollectionSearchValue] =
    useSelectAllCollection();
  const [productcategory] = useGetCategoryTree();
  const [vendor] = useSelectAllVendor();

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
    if (productcategory?.productcategoryTree) {
      const newData = normalizeCategoryTree(
        productcategory.productcategoryTree
      );
  
      setDropdownOptions((prev) => ({
        ...prev,
        product_category: newData,
      }));
    }
  }, [productcategory]);
  
  useEffect(() => {
    if (vendor && vendor.all_vendors) {
      const newData = vendor.all_vendors.map((item) => {
        return { label: item.name, value: item._id, vendor: item };
      });
      setDropdownOptions({ ...dropdownOptions, vendor: newData });
    }
  }, [vendor]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};



export const useInfiniteCategorySelect = (options = []) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (options.length) {
      setLevels([{ options, value: "" }]);
    }
  }, [options]);

  const onChange = (levelIndex, value) => {
    setLevels(prev => {
      const updated = prev.slice(0, levelIndex + 1);
      updated[levelIndex] = {
        ...updated[levelIndex],
        value,
      };

      const selected = updated[levelIndex].options.find(
        o => o.value === value
      );

      if (selected?.children?.length) {
        updated.push({
          options: selected.children,
          value: "",
        });
      }

      return updated;
    });
  };

  const selectedPath = levels
    .map(l => l.value)
    .filter(Boolean);

  return { levels, onChange, selectedPath };
};

