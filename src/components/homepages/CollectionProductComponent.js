import React from "react";
import Select from "react-select";
function CollectionProductComponent({
  formik,
  item,
  dropdown_options,
  edit,
  value,
}) {
  let optionsArray = [];
  console.log("FORMIK COLLECTION COMPONENT", value, item, formik.values);

  return (
    <div className="row">
      <div className="p-2 mt-2 mb-2 bg-light">
        <p className="font-weight-bold">Collection Product</p>
      </div>
      <div className="col-md-6">
        <label> Collection Product </label>
        {dropdown_options && dropdown_options.collections ? (
          <Select
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            name={item}
            defaultValue={
              edit && {
                value: value ? value.product_collection : "",
                label:
                  value &&
                  value.product_collection &&
                  dropdown_options.collections &&
                  dropdown_options.collections.filter(
                    (option) => option.value == value.product_collection
                  ) &&
                  dropdown_options.collections.filter(
                    (option) => option.value == value.product_collection
                  )[0] &&
                  dropdown_options.collections.filter(
                    (option) => option.value == value.product_collection
                  )[0].label,
              }
            }
            options={dropdown_options.collections}
            onChange={(e) => {
              if (e) {
                formik.setFieldValue(item, e.value);
              }
            }}
          />
        ) : (
          <div>Loading...</div>
        )}

        {formik.errors && formik.errors[item] && (
          <p className="text-danger"> Required </p>
        )}
      </div>
    </div>
  );
}

export default CollectionProductComponent;
