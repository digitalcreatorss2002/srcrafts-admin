import React from "react";
import Select from "react-select";
export default function CategoryProductComponent
({
  formik,
  item,
  dropdown_options,
  edit,
  value,
}) {
  let optionsArray = [];
  console.log("FORMIK Catagery COMPONENT", value, item, formik.values);

  return (
    <div className="row">
      <div className="p-2 mt-2 mb-2 bg-light">
        <p className="font-weight-bold">Categorys Product</p>
      </div>
      <div className="col-md-6">
        <label> Categorys Product </label>
        {dropdown_options && dropdown_options.categorys ? (
          <Select
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            name={item}
            defaultValue={
              edit && {
                value: value ? value.product_category : "",
                label:
                  value &&
                  value.product_category &&
                  dropdown_options.categorys &&
                  dropdown_options.categorys.filter(
                    (option) => option.value == value.product_category
                  ) &&
                  dropdown_options.categorys.filter(
                    (option) => option.value == value.product_category
                  )[0] &&
                  dropdown_options.categorys.filter(
                    (option) => option.value == value.product_category
                  )[0].label,
              }
            }
            options={dropdown_options.categorys}
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

