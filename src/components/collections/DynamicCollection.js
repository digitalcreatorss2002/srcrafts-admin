import React from "react";
import {
  DYNAMIC_COLLECTION_CONDITION,
  DYNAMIC_COLLECTION_FIELDS,
} from "../../domain/Enums";
import { CheckBox, SelectBox, TextInput } from "../Form/Form";

function DynamicCollection({ formik }) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <CheckBox
            label="Dynamic Collection"
            name="is_dynamic_collection"
            onChange={(e) => {
              if (e.target.checked) {
                formik.setFieldValue("is_dynamic_collection", true);
                formik.setFieldValue("dynamic_collection", {
                  field: "",
                  condition: "",
                  value: "",
                });
              } else {
                formik.setFieldValue("is_dynamic_collection", false);
                formik.setFieldValue("dynamic_collection", {
                  field: "",
                  condition: "",
                  value: "",
                });
              }
            }}
          />
        </div>
        {formik.values.is_dynamic_collection && (
          <>
            <div className="col-md-4">
              <SelectBox label="Field" name="dynamic_collection.field">
                <option value=""> --none-- </option>
                {DYNAMIC_COLLECTION_FIELDS &&
                  DYNAMIC_COLLECTION_FIELDS.map((item) => {
                    return <option value={item.value}> {item.label} </option>;
                  })}
              </SelectBox>
            </div>
            <div className="col-md-4">
              <SelectBox
                label="Dynamic Condition"
                name="dynamic_collection.condition"
              >
                <option value=""> --none-- </option>
                {DYNAMIC_COLLECTION_CONDITION &&
                  DYNAMIC_COLLECTION_CONDITION.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
              </SelectBox>
            </div>
            <div className="col-md-4">
              <TextInput
                label="Value"
                name="dynamic_collection.value"
                type="number"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DynamicCollection;
