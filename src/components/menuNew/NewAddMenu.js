//NewAddMenu.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createMenuItem } from "./menuFactory";
import { useSelectAllCollection } from "../../shared/hooks/UseCollection";
import { useAllSubCategorys, useSelectAllProductcategory } from "../../shared/hooks/UseProductcategory";

function NewAddMenu({ parentRef=null, parentType=null ,onAdd, label = "Add Menu" }) {
  const [type, setType] = useState(parentType);
  console.log(parentRef, parentType);
  const [collectionData] = useSelectAllCollection();
  const [allCategories] = useSelectAllProductcategory();
  const [subCategories] = useAllSubCategorys(parentRef?.id);
  console.log(subCategories);
  const categoryData =
  parentType === "CATEGORY"
    ? subCategories?.subCategories
    : allCategories?.all_productcategorys;

  
  if (!type) {
    return (
      <button
        className="btn btn-outline-primary btn-sm mt-2"
        onClick={() => setType("SELECT")}
      >
        {label}
      </button>
    );
  }

  if (type === "SELECT") {
    return (
      <select
        className="form-control mt-2"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="STATIC">Static</option>
        <option value="COLLECTION">Collection</option>
        <option value="CATEGORY">Category</option>
        <option value="Product">Product</option>
      </select>
    );
  }

  if (type === "STATIC") {
    let title = "";
    let url = "";

    return (
      <div className="mt-2">
        <input
          className="form-control mb-1"
          placeholder="Label"
          onChange={(e) => (title = e.target.value)}
        />
        <input
          className="form-control mb-1"
          placeholder="URL"
          onChange={(e) => (url = e.target.value)}
        />
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            onAdd(createMenuItem({ type: "STATIC", label: title, url }));
            setType(null);
          }}
        >
          Add
        </button>
      </div>
    );
  }

  if (type === "COLLECTION") {
    if(collectionData?.all_collections?.length == 0 ) return  
      <small className="text-muted">
        No subcategories available
      </small>
    return (
      <Select
        options={collectionData?.all_collections?.map((c) => ({
          value: c,
          label: c.name,
        }))}
        onChange={(e) => {
          onAdd(
            createMenuItem({
              type: "COLLECTION",
              label: e.value.name,
              ref: { model: "Collection", id: e.value._id },
            })
          );
          setType(null);
        }}
      />
    );
  }

  if (type === "CATEGORY") {
    if(categoryData?.length == 0 ) return  (<small className="text-muted">
        No subcategories available
      </small>)
    return (
      <Select
        options={categoryData?.map((c) => ({
          value: c,
          label: c.name,
        }))}
        onChange={(e) => {
          onAdd(
            createMenuItem({
              type: "CATEGORY",
              label: e.value.name,
              ref: { model: "Category", id: e.value._id },
            })
          );
          setType(null);
        }}
      />
    );
  }

  return null;
}

export default NewAddMenu;
