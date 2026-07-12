import React from "react";
import Select from "react-select";
export default  function CategoryComponentForm({
  formik,
  item,
  dropdown_options,
  edit,
  value,
}) {
  console.log("VALUES INSIDE CATEGORY COMPONENT", value, dropdown_options?.categorys);
  let optionsArray = [];
  if (
    value &&
    value.product_category &&
    dropdown_options &&
    dropdown_options.categorys
  ) {
    value.product_category.map((option) => {
      const filterData = dropdown_options.categorys.filter(
        (option_sub) => option_sub.value == option._id
      );
      if (filterData.length > 0) {
        optionsArray.push({
          label: filterData[0].label,
          value: filterData[0].value,
        });
      }
    });
  }
  console.log(optionsArray);
  return (
    <div className="row">
      <div className="p-2 mt-2 mb-2 bg-light">
        <p className="font-weight-bold">Category</p>
      </div>
      <div className="col-md-6">
        <label>Product Category </label>
        {dropdown_options && dropdown_options.categorys ? (
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            // loadOptions={(inputValue, callback) =>
            //   loadOptions(inputValue, callback, item)
            // }
            name={item}
            isMulti={true}
            defaultValue={edit && optionsArray ? optionsArray : []}
            // value={formik.values[item]}
            // getOptionLabel={(x) => x["name"]}
            // getOptionValue={(x) => x["_id"]}
            options={dropdown_options.categorys}
            // onChange={formik.handleChange}
            onChange={(e) => {
              const newArray = e.map((item) => {
                return item.value;
              });
              formik.setFieldValue(item, newArray);
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

