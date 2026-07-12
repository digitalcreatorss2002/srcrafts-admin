import React from "react";
import Select from "react-select";
function CollectionComponentForm({
  formik,
  item,
  dropdown_options,
  edit,
  value,
}) {
  console.log("VALUES INSIDE", value, dropdown_options.collections);
  let optionsArray = [];
  if (
    value &&
    value.product_collections &&
    dropdown_options &&
    dropdown_options.collections
  ) {
    value.product_collections.map((option) => {
      const filterData = dropdown_options.collections.filter(
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
        <p className="font-weight-bold">Collections</p>
      </div>
      <div className="col-md-6">
        <label> Collections </label>
        {dropdown_options && dropdown_options.collections ? (
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
            options={dropdown_options.collections}
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

export default CollectionComponentForm;
